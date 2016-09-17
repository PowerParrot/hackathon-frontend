import { Component, ViewChild, NgZone, HostListener } from '@angular/core';
import { Http } from '@angular/http';
import { PresentationService } from './presentation.service';
import { SocketService } from './../shared/socket.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from './../shared/config.service';
import { Observable } from 'rxjs/Rx';

@Component({
    template: require('./presenter.component.html'),
    styles: [require('./presenter.component.scss')],
})

export class PresenterComponent {

    text: {final: string, interim: string}  = {final: '', interim: ''};
    page: number = 1;
    presentationId: string;
    documentPath: string;

    previous() {
        if (this.page <= 1) this.page = 1;
        else this.page--;
    }

    next() {
        this.page++;
    }

    @ViewChild('pdfViewer') pdfViewer: any;

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(kbdEvent: KeyboardEvent) {
        if(kbdEvent.keyCode == 37) {
            this.previous()
        } else if (kbdEvent.keyCode == 39) {
            this.next()
        }
    }

    constructor(private _config: ConfigService, private _http: Http, private _route: ActivatedRoute, private _presentationService: PresentationService, private _socketService: SocketService, private _ngZone: NgZone) {

    }

    ngOnInit() {
      this._route.params.subscribe(params => {
          console.log(params['id']);
          this.presentationId = params['id'];
          this.getDocumentURL(this.presentationId).subscribe(result => this.documentPath = result.url);
      });
    }

    getDocumentURL(id: string): Observable<any> {
      return this._http.get(this._config.API_URL + '/getDocumentPath?presentation_id=' + id).map(res => <this[]> res.json());
    }

    record() {
      if (!('webkitSpeechRecognition' in window)) {
        console.log('not supported');
      } else {

        var recognition = new webkitSpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;

        this._socketService.listen(this.presentationId, (msg) => {
          this._ngZone.run(() => {
            console.log(msg);
            this.text.final = this.linebreak(msg.speech);
            this.page = msg.current_page;
          });
        });

        recognition.onstart = () => {
          console.log('start');
        };

        recognition.onresult = (event) => {
          console.log('result');

          let final_transcript = '';
          let interim_transcript = '';

          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
              this._socketService.write('note', { current_page: this.page, speech: final_transcript, presentation_id: this.presentationId });
            } else {
              interim_transcript += event.results[i][0].transcript;
            }
          }

          // this will move to socket.listen above
          this._ngZone.run(() => {
            this.text.interim = this.linebreak(interim_transcript);
          });

        };

        recognition.onerror = (event) => {
          console.log(event);
        };

        recognition.onend = () => {
          console.log('stream over');
        };

        recognition.lang = 'en-US';
        recognition.start();
      }
    }

    linebreak(s: string) {
      return s.replace(/\n\n/g, '<p></p>').replace(/\n/g, '<br>');
    }

    capitalize(s: string) {
      return s.replace(/\S/, function(m) { return m.toUpperCase(); });
    }


}

import { Component, ViewChild, NgZone } from '@angular/core';
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

    currentText: {text: string}  = {text: "Hi. This is a test and this project is pretty awesome"};
    page: number = 1;
    presentationId: string;
    documentPath: string;

    @ViewChild('pdfViewer') pdfViewer: any;

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
        recognition.interimResults = false;

        recognition.onstart = () => {
          console.log('start');

          this._socketService.listen(this.presentationId, (msg) => {
            this._ngZone.run(() => {
              this.currentText.text = msg.speech;
              this.page = msg.current_page;
            });
          });

        };

        recognition.onresult = (event) => {
          console.log('result');

          let final_transcript = '';

          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
            }
          }

          // this will move to socket.listen above
          this._ngZone.run(() => {
            this.currentText.text = final_transcript;
          });

          this._socketService.write('note', { current_page: this.page, speech: final_transcript, presentation_id: this.presentationId });

        };

        recognition.onerror = (event) => {
          console.log(event);
        };

        recognition.onend = () => {
          console.log('stream over');
        };

        recognition.lang = 'en-GB';
        recognition.start();
      }
    }


}

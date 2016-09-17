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
    exportedPDF: string;

    activeLanguage: string = 'en';

    isRecording: boolean = false;
    recognition: any;

    previous() {
        if (this.page <= 1) this.page = 1;
        else this.page--;
        this._socketService.write('pagechange', { current_page: this.page, presentation_id: this.presentationId });
    }

    next() {
        this.page++;
        this._socketService.write('pagechange', { current_page: this.page, presentation_id: this.presentationId });
    }

    @ViewChild('pdfViewer') pdfViewer: any;

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(kbdEvent: KeyboardEvent) {
        if(kbdEvent.keyCode == 37) {
            this.previous();
        } else if (kbdEvent.keyCode == 39) {
            this.next();
        }
    }

    constructor(private _config: ConfigService, private _http: Http, private _route: ActivatedRoute, private _presentationService: PresentationService, private _socketService: SocketService, private _ngZone: NgZone) {

    }

    ngOnInit() {
      this._route.params.subscribe(params => {
          this.presentationId = params['id'];
          this.getDocumentURL(this.presentationId).subscribe(result => this.documentPath = result.url);
      });
    }

    getDocumentURL(id: string): Observable<any> {
      return this._http.get(this._config.API_URL + '/getDocumentPath?presentation_id=' + id).map(res => <this[]> res.json());
    }

    generatePDF(id: string, language: string): Observable<any> {
      return this._http.get(this._config.API_URL + '/export/' + id + '?language=' + language).map(res => <this[]> res.json());
    }

    downloadFile(data: any){
      var blob = new Blob([data], { type: 'application/pdf' });
      var url = window.URL.createObjectURL(blob);
      window.open(url);
    }

    record() {

      if (this.isRecording) {
        this.isRecording = false;
        this.generatePDF(this.presentationId, this.activeLanguage).subscribe(result => this.downloadFile(result.url));
        return this.recognition.stop();
      }

      if (!('webkitSpeechRecognition' in window)) {
        console.log('not supported');
      } else {

        this.recognition = new webkitSpeechRecognition();

        this.isRecording = true;

        this.recognition.continuous = true;
        this.recognition.interimResults = true;

        this._socketService.listen(this.presentationId, (msg) => {
          this._ngZone.run(() => {

            if (this.activeLanguage !== 'en') {
              this.text.final = this.linebreak(msg.translations[this.activeLanguage].translations[0].translatedText)
            } else {
              this.text.final = this.linebreak(msg.speech);
            }

            this.page = msg.current_page;
          });
        });

        this.recognition.onstart = () => {
          console.log('start');
        };

        this.recognition.onresult = (event) => {
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

        this.recognition.onerror = (event) => {
          console.log(event);
        };

        this.recognition.onend = () => {
          this.isRecording = false;
          console.log('stream over');
        };

        this.recognition.lang = 'en-US';
        this.recognition.start();
      }
    }

    linebreak(s: string) {
      return s.replace(/\n\n/g, '<p></p>').replace(/\n/g, '<br>');
    }

    capitalize(s: string) {
      return s.replace(/\S/, function(m) { return m.toUpperCase(); });
    }

    public selectLanguage(language):void {
      this.activeLanguage = language;
    }
}

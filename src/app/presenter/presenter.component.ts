import { Component, ViewChild, NgZone } from '@angular/core';
import { PresentationService } from './presentation.service';

@Component({
    template: require('./presenter.component.html'),
    styles: [require('./presenter.component.scss')],
})

export class PresenterComponent {

    currentText: {text: string}  = {text: "Hi. This is a test and this project is pretty awesome"};
    page: number = 1;

    @ViewChild('pdfViewer') pdfViewer: any;

    constructor(private _presentationService: PresentationService, private _ngZone: NgZone) {

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
        };

        recognition.onresult = (event) => {
          console.log('result');

          let final_transcript = '';

          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
            }
          }

          this._ngZone.run(() => {
            this.currentText.text = final_transcript;
          });

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

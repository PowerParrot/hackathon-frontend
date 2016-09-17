import { Component } from '@angular/core';
import { StreamingService } from './../streaming.service';
import { SocketService } from './../../shared/socket.service';

let Microphone = require('./Microphone.js');

@Component({
    template: require('./microphone.component.html'),
})

export class MicrophoneInputComponent {

    private _microphone: any;
    private text: string;

    constructor(private _streamingService: StreamingService, private _socket: SocketService) {

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
          let final_transcript = '';

          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
            }
          }

          this.text = final_transcript;
        };

        recognition.onerror = (event) => {

        };

        recognition.onend = () => {

        };

        recognition.lang = 'en-GB';
        recognition.start();
      }
      
      /*
      let micOptions = {
        bufferSize: 8192
      };

      this._socket.write('init', {});

      this._microphone = new Microphone(micOptions);
      this._microphone.record();
      this._microphone.onAudio = (blob) => {
        this._streamingService.send(blob);
      };

      this._socket.listen('message', (msg) => {
        this.text = msg.data;
      })
      */

    }

    stop() {
      // this._microphone.stop();
    }

}

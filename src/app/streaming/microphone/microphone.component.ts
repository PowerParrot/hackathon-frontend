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
      let micOptions = {
        bufferSize: 2048
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

    }

    stop() {
      this._microphone.stop();
    }

}

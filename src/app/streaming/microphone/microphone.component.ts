import { Component } from '@angular/core';
import { StreamingService } from './../streaming.service';
let Microphone = require('./Microphone.js');

@Component({
    template: require('./microphone.component.html'),
})

export class MicrophoneInputComponent {

    private _microphone: any;

    constructor(private _streamingService: StreamingService) {

    }

    record() {
      let micOptions = {
        bufferSize: 16384
      };

      this._microphone = new Microphone(micOptions);
      this._microphone.record();
      this._microphone.onAudio = (blob) => {
        this._streamingService.send(blob);
      };

    }

    stop() {
      this._microphone.stop();
    }

}

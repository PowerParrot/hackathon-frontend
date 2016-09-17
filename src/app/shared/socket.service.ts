import {Injectable, ApplicationRef} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigService} from './config.service';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

    private socket;

    constructor(private _config: ConfigService) {
        this.socket = io(this._config.API_URL);
        this.socket.on('connect', () => {
          console.log('connect')
        });
    }

    write(event: string, blob: Blob) {
      this.socket.emit(event, blob);
    }

    listen(event: string, handler: Function) {
      this.socket.on(event, (msg) => {
        handler(msg);
      });
    }

}

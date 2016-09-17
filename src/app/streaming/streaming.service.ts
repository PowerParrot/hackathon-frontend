import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SocketService } from '../shared/socket.service';

@Injectable()
export class StreamingService {

    constructor(private http: Http, private _socket: SocketService) {

    }

    send(blob: Blob) {
      this._socket.write('audio', blob);
    }



}

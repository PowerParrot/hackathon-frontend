import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Presentation } from './presentation.dto';
import { ConfigService } from '../shared/config.service';

@Injectable()
export class PresentationService {

    constructor(private http: Http, private configs: ConfigService) {
      console.log(this.configs.API_URL);
    }



}

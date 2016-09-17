import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  public API_URL = config.API_URL || 'http://localhost:5000';
}

import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ConfigService } from '../shared/config.service';

@Component({
    template: require('./upload.component.html'),
    styles: [require('./upload.component.scss')],
})

export class UploadComponent {

    public uploader: FileUploader;

    constructor(private _configService: ConfigService) {
      this.uploader = new FileUploader({url: this._configService.API_URL + '/upload', removeAfterUpload: true});
    }

}

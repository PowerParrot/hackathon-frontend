import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ConfigService } from '../shared/config.service';
import { Router } from '@angular/router';

@Component({
    template: require('./upload.component.html'),
    styles: [require('./upload.component.scss')],
})

export class UploadComponent {

    public uploader: any;

    constructor(private _configService: ConfigService, private _router: Router) {
      this.uploader = new FileUploader({url: this._configService.API_URL + '/upload', removeAfterUpload: true});
    }

    upload() {
      this.uploader.queue[0].upload();
      this.uploader.queue[0].onComplete = (response:string, status:number, headers:any) => {
        let document = JSON.parse(response);
        this._router.navigateByUrl('/presenter/' + document._id.$oid);
      }
    }

}

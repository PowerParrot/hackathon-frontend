import { Component } from '@angular/core';

@Component({
    template: require('./upload.component.html'),
    styles: [require('./upload.component.scss')],
})

export class UploadComponent {

    private options: any = {
      url: 'http://localhost:5000/upload',
      filterExtensions: true,
      allowedExtensions: ['application/pdf'],
      calculateSpeed: true
    }

    private progress: number = 0;
    private response: any = {};

    constructor() {

    }

    handleUpload(data: any): void {
      this.response = data;
      this.progress = Math.floor(data.progress.percent / 100);
    }

}

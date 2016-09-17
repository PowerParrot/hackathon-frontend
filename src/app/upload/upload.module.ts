import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { UploadComponent } from './upload.component';
import { routing } from './upload.routes';
import { FILE_UPLOAD_DIRECTIVES, FileUploader } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [ UploadComponent, FILE_UPLOAD_DIRECTIVES ]
})

export class UploadModule { }

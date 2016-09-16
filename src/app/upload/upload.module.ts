import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { UploadComponent } from './upload.component';
import { routing } from './upload.routes';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [ UploadComponent, UPLOAD_DIRECTIVES ]
})

export class UploadModule { }

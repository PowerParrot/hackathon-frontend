import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { ExampleModule } from './example/example.module';
import { StreamingModule } from './streaming/streaming.module';
import { UploadModule } from './upload/upload.module';

import '../style/app.scss';

@NgModule({
 imports: [
   BrowserModule,
   ExampleModule,
   StreamingModule,
   UploadModule,
   routing
 ],
 declarations: [
   AppComponent
 ],
 bootstrap: [
   AppComponent
 ]
})

export class AppModule { }

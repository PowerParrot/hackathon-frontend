import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { routing } from './app.routing';

import { ExampleModule } from './example/example.module';
import { StreamingModule } from './streaming/streaming.module';

import '../style/app.scss';

@NgModule({
 imports: [
   BrowserModule,
   ExampleModule,
   StreamingModule,
   routing
 ],
 declarations: [
   AppComponent,
   UploadComponent
 ],
 bootstrap: [
   AppComponent
 ]
})

export class AppModule { }

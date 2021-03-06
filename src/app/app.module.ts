import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { ExampleModule } from './example/example.module';
import { StreamingModule } from './streaming/streaming.module';
import { UploadModule } from './upload/upload.module';
import { PresenterModule } from './presenter/presenter.module';
import { SharedModule } from './shared/shared.module';

import '../style/app.scss';

@NgModule({
 imports: [
   BrowserModule,
   ExampleModule,
   StreamingModule,
   UploadModule,
   PresenterModule,
   SharedModule,
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

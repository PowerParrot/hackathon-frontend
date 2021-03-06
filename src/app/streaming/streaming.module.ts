import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MicrophoneInputComponent } from './microphone/microphone.component';
import { StreamingService } from './streaming.service';
import { routing } from './streaming.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [
    StreamingService
  ],
  declarations: [ MicrophoneInputComponent ]
})

export class StreamingModule { }

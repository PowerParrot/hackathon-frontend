import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ConfigService } from './config.service';
import { SocketService } from './socket.service';

@NgModule({
  providers: [
    ConfigService,
    SocketService
  ]
})

export class SharedModule { }

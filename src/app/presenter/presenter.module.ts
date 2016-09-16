import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { PresenterComponent } from './presenter.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { routing } from './presenter.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HotkeyModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [ PresenterComponent, PdfViewerComponent ]
})

export class PresenterModule { }

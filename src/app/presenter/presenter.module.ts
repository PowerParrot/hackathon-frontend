import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { PresenterComponent } from './presenter.component';
import { PresentationService } from './presentation.service';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { routing } from './presenter.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    routing
  ],
  providers: [
    PresentationService
  ],
  declarations: [ PresenterComponent, PdfViewerComponent ]
})

export class PresenterModule { }

import { Component, ViewChild } from '@angular/core';
import { PresentationService } from './presentation.service';

@Component({
    template: require('./presenter.component.html'),
    styles: [require('./presenter.component.scss')],
})

export class PresenterComponent {

    private currentText: string = "Hi. This is a test and this project is pretty awesome";
    private page: number = 1;

    @ViewChild('pdfViewer') pdfViewer: any;

    constructor(private _presentationService: PresentationService) {

    }



}

import { Component, ViewChild } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';

@Component({
    template: require('./presenter.component.html'),
    styles: [require('./presenter.component.scss')],
})

export class PresenterComponent {

    private currentText: string = "Hi. This is a test and this project is pretty awesome";
    private page: number = 1;

    @ViewChild('pdfViewer') pdfViewer: any;

    constructor(private _hotkeysService: HotkeysService) {
      this._hotkeysService.add(new Hotkey(['left'], (event: KeyboardEvent): boolean => {
          this.page--;
          return false;
      }));

      this._hotkeysService.add(new Hotkey(['right'], (event: KeyboardEvent): boolean => {
          this.page++;
          return false;
      }));
    }

}

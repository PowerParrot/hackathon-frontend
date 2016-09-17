import { Component, Input, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'pdf-viewer',
  template: `
      <div (window:resize)="onResize($event)" class="ng2-pdf-viewer-container"></div>
  `,
  styles: [require('./pdf-viewer.component.scss')],
})

export class PdfViewerComponent {

  private _showAll: boolean = false;
  private _originalSize: boolean = false;
  private _src: string;
  private _pdf: any;
  private _page: number = 1;
  private _numPages: number = 1;
  private _canvas: HTMLCanvasElement;

  constructor(private element: ElementRef) {

  }

  @Input()
  set src(_src) {
    this._src = _src;
    this.fn();
  }

  @Input()
  set page(_page) {
    _page = parseInt(_page, 10);
    if (this._pdf && this.isValidPageNumber(_page)) {
      this._page = _page;
      this.renderPage(_page);
    }
  }

  @Input('original-size')
  set originalSize(originalSize: boolean) {
    this._originalSize = originalSize;
    if (this._pdf) {
      this.fn();
    }
  }

  @Input('show-all')
  set showAll(value: boolean) {
    this._showAll = value;
    if (this._pdf) {
      this.fn();
    }
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    this.renderPage(this._page);
  }

  public previous() {
    if (this.isValidPageNumber(this._page - 1)) {
      this._page = this._page - 1;
      this.renderPage(this._page);
    }
  }

  public next() {
    if (this.isValidPageNumber(this._page + 1)) {
      this._page = this._page + 1;
      this.renderPage(this._page);
    }
  }

  private fn() {
    PDFJS.getDocument(this._src).then((pdf: any) => {
      this._pdf = pdf;
      this._numPages = pdf.numPages;
      if (!this.isValidPageNumber(this._page)) {
        this._page = 1;
      }
      if (!this._showAll) {
        return this.renderPage(this._page);
      }
      return this.renderMultiplePages();
    });
  }

  private renderMultiplePages() {
    let container = this.element.nativeElement.querySelector('div.ng2-pdf-viewer-container');
    let page = 1;
    const renderPageFn = (page: number) => () => this.renderPage(page);
    this.removeAllChildNodes(container);
    let d = this.renderPage(page++);
    for (page; page <= this._pdf.numPages; page++) {
      d = d.then(renderPageFn(page));
    }
  }

  private isValidPageNumber(page: number) {
    return this._numPages >= page && page >= 1;
  }

  private renderPage(page: number) {
    return this._pdf.getPage(page).then((page: any) => {

      let viewport = page.getViewport(1);
      let container = this.element.nativeElement.querySelector('div.ng2-pdf-viewer-container');
      this._canvas = document.createElement('canvas');

      if (!this._originalSize) {
        viewport = page.getViewport(this.element.nativeElement.offsetWidth / viewport.width);
      }

      if (!this._showAll) {
        this.removeAllChildNodes(container);
      }

      container.appendChild(this._canvas);

      console.log(window.innerHeight);

      let width = (window.innerWidth / window.innerHeight);
      console.log(width);

      this._canvas.height = window.innerHeight;
      this._canvas.width = (window.innerHeight * (16/9));

      page.render({
        canvasContext: this._canvas.getContext('2d'),
        viewport: viewport
      });

    });
  }

  private removeAllChildNodes(element: HTMLElement) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}

import { Component, ViewEncapsulation,
         Input, EventEmitter, Output, OnChanges, SimpleChange } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomModalComponent implements OnChanges {

  @Input('show-modal') showModal: boolean;
  @Output() closedModal:EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (changes['showModal'] != undefined && changes['showModal']['currentValue']) {
      this.show();
    }
  }

  public show(){
    $("#exampleModal").modal();
  }
  public hide(){
    $("#exampleModal").modal('hide');
    this.closedModal.emit(true);
  }

}

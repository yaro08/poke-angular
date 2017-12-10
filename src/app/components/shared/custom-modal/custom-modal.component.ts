import { Component, OnInit, ViewEncapsulation,
         Input, EventEmitter, Output, OnChanges, SimpleChange } from '@angular/core';
import { ModalService } from '../../../services/modal.service';

declare var $:any;

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomModalComponent implements OnInit {

  @Input('show-modal') showModal: boolean;
  @Output() closedModal:EventEmitter<boolean> = new EventEmitter();

  constructor(private _modalService:ModalService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.
  
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
    this._modalService.show(false);
  }

}

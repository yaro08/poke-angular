import { Component, OnInit } from '@angular/core';

import { ModalService } from './services/modal.service';

import { CustomModalComponent } from './components/shared/custom-modal/custom-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  showModal: boolean;

  constructor(private _modalService: ModalService){}

  ngOnInit(){
    this._modalService.status.subscribe((val:boolean)=>{
      this.showModal = val;
    });
  }
  onCloseModal($event:MouseEvent){
    console.log("esto es innecesario...");
  }
}


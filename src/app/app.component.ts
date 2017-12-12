import { Component, OnInit, AfterContentInit, ChangeDetectorRef } from '@angular/core';

import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterContentInit {
  title = 'app';
  showLoader: boolean;

  constructor(private _spinnerService: SpinnerService,
              private cdr: ChangeDetectorRef
  ){}

  ngAfterContentInit(){
    this._spinnerService.status.subscribe((val:boolean)=>{
      this.showLoader = val;
      this.cdr.detectChanges();
    });
  }
}


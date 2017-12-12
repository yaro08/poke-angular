import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  searchPokemon(text:string){
    //Check if 'text' is not empty
    if (text =='') {
      this.router.navigate(['/pokemon/list'])
    } else {
      this.router.navigate(['/search',text])
    }
  }

}

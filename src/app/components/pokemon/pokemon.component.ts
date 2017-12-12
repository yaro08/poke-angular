import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonComponent implements OnInit {

  //EN REALIDAD ESTE COMPONENTE ES INNECESARIO...
  //DEBERIA IR CIERTA LOGICA RELACIONADA CON EL COMPONENTE

  ngOnInit() {
    console.log("pokemon component");
  }

}

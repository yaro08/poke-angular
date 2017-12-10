import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// import { PokemonsService, Pokemon } from '../../services/pokemons.service';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonComponent implements OnInit {

  //public myPokemons:Pokemon[];

  // constructor(private _pokemonsService:PokemonsService ) {}

  ngOnInit() {
    // console.log(this._pokemonsService.pokemonsList);
    // this.myPokemons = this._pokemonsService.pokemonsList;
  }

}

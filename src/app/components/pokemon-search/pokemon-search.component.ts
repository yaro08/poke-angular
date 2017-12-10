import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PokemonsService, Pokemon } from '../../services/pokemons.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonSearchComponent implements OnInit {
  public pokemons:Pokemon[] = [];
  public searchText:string;

  constructor(private activatedRoute: ActivatedRoute,
              private _pokemonsService: PokemonsService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params =>{
      console.log('text to find: '+params.pokemon);
      this.searchText = params.pokemon;
      this.pokemons = this._pokemonsService.findPokemon(params.pokemon);
    });
  }

}

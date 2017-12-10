import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { PokemonsService, Pokemon } from '../../services/pokemons.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PokemonListComponent implements OnInit {

  public pokemons:Pokemon[];
  public myPokemons:Pokemon[];
  public favPokemons:Pokemon[];
  public showAlert: boolean;
  public alertMsg: string;
  
    constructor(private _pokemonsService:PokemonsService ) {}
  
    ngOnInit() {
     // console.log(this._pokemonsService.pokemonsList);
      //this.myPokemons = this._pokemonsService.pokemonsList;

      this._pokemonsService.getPokemons().subscribe(
        result =>{
          if (result['message'] == 'OK') {
            this.pokemons = this.myPokemons = result['result'];
          } else {
            console.log("an error has ocurred");
          }
          //console.log("pokemons from service");
          //console.log(result['result']);
        },
        error =>{

        }
      );
    }
    public hideAlert(){
      this.showAlert = false;
    }
    public getFavs(){
      return this.pokemons.filter(pokemon => 
        pokemon.fav == true
      );	
    }

    public toggleFav(myPokemon:Pokemon){
      this._pokemonsService.toggleFavPokemon(myPokemon._id, myPokemon).subscribe(
        result =>{ 
          if (result['message']== 'OK') {
            myPokemon.fav = result['result']['fav'];
          } 
          else if(result['message']== 'ERROR') {
            this.showAlert = true;
            this.alertMsg = result['result'];
          }
        }, error =>{ }
      );
    }

    public handleChange(event:MouseEvent,val:string){
      let target = event.target;
      
      if (target['checked'] && val == 'favs') {
        //SELECTED FAVS
        this.pokemons = this.getFavs();
      } else {
        ///UNSELECTED FAVS
        this.pokemons = this.myPokemons;
      }
    }

}

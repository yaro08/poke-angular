import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokemonsService, Pokemon } from '../../services/pokemons.service';



@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonDetailsComponent implements OnInit {
  public alertMsg: string;
  public showAlert: boolean;
  public pokemonId:string;
  public pokemon:Pokemon = {
    name:'',
    type:[''],
    becomes:'',
    description:''
  }

  constructor(private activatedRoute: ActivatedRoute,
              private _pokemonService: PokemonsService,
              private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params =>{
      this.pokemonId = params.id;

      this.getInfoPokemon(this.pokemonId);
    });
  }
  public getInfoPokemon(pokemonId:string){
    this._pokemonService.getPokemon(this.pokemonId).subscribe(
      result =>{
        if (result['message'] == 'OK') {
          this.pokemon = result['result'];
        } else {
          alert('Pokemon not found');
        }
        
      },
      error =>{
        alert('An error has ocurred...');
      }
    );
  }
  public deletePokemon(){
    this._pokemonService.deletePokemon(this.pokemonId).subscribe(
      result =>{
        this.router.navigate(['/pokemon/list']);
      },
      error =>{
        alert('An error has ocurred...');
      }
    );
  }
  public toggleFav(myPokemon:Pokemon){
    this._pokemonService.toggleFavPokemon(myPokemon._id, myPokemon).subscribe(
      result =>{ 
        if (result['message']== 'OK') {
          myPokemon.fav = result['result']['fav'];
        } else if(result['message']== 'ERROR') {
          console.log(result['result']);
          this.showAlert = true;
          this.alertMsg = result['result'];
        }
      }, error =>{

      }
    );
  }
  public hideAlert(){
    this.showAlert = false;
  }
}

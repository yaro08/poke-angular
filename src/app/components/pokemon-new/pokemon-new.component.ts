import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { PokemonsService, Pokemon } from '../../services/pokemons.service';

@Component({
  selector: 'app-pokemon-new',
  templateUrl: './pokemon-new.component.html',
  styleUrls: ['./pokemon-new.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonNewComponent {
  public showModal:boolean = false;
  public message:string = 'default';
  public pokemon:Pokemon = {
    name:'',
    type:[''],
    becomes:'',
    description:''
  }
 
  constructor(private _pokemonService:PokemonsService,
              private router:Router           
  ) { }

  public newPokemon(event:MouseEvent){
    this._pokemonService.addPokemon(event).subscribe(
      result =>{
        this.message = result['message'];
        this.modalVisible();
      },
      error => {
       alert('Error...');
      }
    );
  }
  public modalHidden(event:MouseEvent){
    this.showModal = false;
    setTimeout(()=>{
      this.router.navigate(['/pokemon/list']);
    },20) 
	}
  public modalVisible(){
		this.showModal = true;
  }
}

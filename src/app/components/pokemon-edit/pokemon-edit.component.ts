import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokemonsService, Pokemon } from '../../services/pokemons.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-pokemon-edit',
  templateUrl: './pokemon-edit.component.html',
  styleUrls: ['./pokemon-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PokemonEditComponent implements OnInit {
  public showModal:boolean = false;
  public message:string = 'default';
  public pokemonId:string;

  public pokemon:Pokemon = {
    name:'',
    type:[''],
    becomes:'',
    description:''
  }

  constructor(private activatedRouter: ActivatedRoute,
              private _pokemonsService: PokemonsService,
              private _spinnerService:SpinnerService,
              private router: Router
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params =>{
      this.pokemonId = params.id;
      this.getInfoPokemon(this.pokemonId);
    });
  }

  public getInfoPokemon(pokemonId:string){
    this._pokemonsService.getPokemon(this.pokemonId).subscribe(
      result =>{
        if (result['status'] == 'OK') {
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
  public editPokemon(event:MouseEvent){
    this._pokemonsService.editPokemon(this.pokemonId,event).subscribe(
      result =>{
        this.message = result['message'];
        this.modalVisible();
      },error =>{
        console.log('An error has ocurred');
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

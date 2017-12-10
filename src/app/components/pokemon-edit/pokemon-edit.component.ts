import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokemonsService, Pokemon } from '../../services/pokemons.service';
import { ModalService } from '../../services/modal.service';



@Component({
  selector: 'app-pokemon-edit',
  templateUrl: './pokemon-edit.component.html',
  styleUrls: ['./pokemon-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonEditComponent implements OnInit {

  public pokemonId:string;

  public pokemon:Pokemon = {
    name:'',
    type:[''],
    becomes:'',
    description:''
  }

  constructor(private activatedRouter: ActivatedRoute,
              private _pokemonsService: PokemonsService,
              private _modalService:ModalService,
              private router: Router
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params =>{
      this.pokemonId = params.id;
      console.log("get: "+this.pokemonId);
      this.getInfoPokemon(this.pokemonId);
      //this.pokemon = this._pokemonsService.getPokemon(this.pokemonId);
    });
  }

  public getInfoPokemon(pokemonId:string){
    this._pokemonsService.getPokemon(this.pokemonId).subscribe(
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
  public editPokemon(event:MouseEvent){
    this._pokemonsService.editPokemon(this.pokemonId,event).subscribe(
      result =>{
        console.log('pokemon has been updated');
        this._modalService.show(true);
        //this.router.navigate(['/pokemon/list']);
      },error =>{
        console.log('An error has ocurred');
      }
    );
    this._modalService.status.subscribe((val:boolean)=>{
      if (val === false) {
        console.log("modal closed... redirect to list pokemons");
        this.router.navigate(['/pokemon/list']);  
      } 
    });
  }

}

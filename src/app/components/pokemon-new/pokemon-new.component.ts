import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { PokemonsService, Pokemon } from '../../services/pokemons.service';
import { ModalService } from "../../services/modal.service";
// import { CustomModalComponent } from '../../modules/custom-modal/custom-modal.component';


@Component({
  selector: 'app-pokemon-new',
  templateUrl: './pokemon-new.component.html',
  styleUrls: ['./pokemon-new.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonNewComponent implements OnInit {
  public showModal:boolean = false;

  public pokemon:Pokemon = {
    name:'',
    type:[''],
    becomes:'',
    description:''
  }
 
  constructor(private _pokemonService:PokemonsService,
              private _modalService:ModalService,
              private router:Router           
  ) { }

  ngOnInit() {
  }


  public newPokemon(event:MouseEvent){
    this._pokemonService.addPokemon(event).subscribe(
      result =>{
        //console.log(result);
        this._modalService.show(true);
      },
      error => {
       alert('Error...');
      }
    );

    this._modalService.status.subscribe((val:boolean)=>{
      if (val === false) {
        console.log("modal closed... redirect to list pokemons");
        this.router.navigate(['/pokemon/list']);  
      } 
    });
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

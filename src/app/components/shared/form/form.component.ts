import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { PokemonsService, Pokemon } from '../../../services/pokemons.service';

@Component({
  selector: 'pokemon-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit {

  public fg:FormGroup;
  public listTypes:string[];
  public nTypes:number = 1;

  @Input('formData') pokemon: Pokemon;
  @Output() outputData:EventEmitter<Pokemon> = new EventEmitter();

  constructor(private _pokemonService:PokemonsService,) {
    this.listTypes = this._pokemonService.tiposList;
  }
  
  ngOnInit() {
    this.initFormGroup();
    this.setValuesFG(this.pokemon,this.listTypes);
    this.valuesChangedFGSubs();
  }

  public initFormGroup(){
    this.fg = new FormGroup({
      name: new FormControl('', [
                                  Validators.pattern("^[a-zA-ZñÑ]*$"),
                                  Validators.required,
                                  Validators.minLength(4),
                                  Validators.maxLength(24),                                  
                                ]),
      type: new FormArray([
            new FormControl('',Validators.required)    
      ]),
      becomes: new FormControl('',  Validators.nullValidator),
      description: new FormControl('',  [
                                          Validators.required,
                                          Validators.pattern(`^[A-zÀ-úüñÑ0-9_.,:;'"]+( [A-zÀ-úüñÑ0-9_.,:;'"]+)*$`),
                                          Validators.minLength(30) 
                                        ])
    });
  }
  public setValuesFG(pokemon:Pokemon,listTypes:string[]){

    if (pokemon.type.length == 0 || pokemon.type[0] == '')
      pokemon.type[0] = this.listTypes[0];

    this.fg.patchValue(pokemon);

    if(pokemon.type.length == 2){
      this.addType(pokemon.type[1]);
      //UPDATE MANUALLY NUM OF SELECTS
      this.nTypes = 2;
    }
  }
  public valuesChangedFGSubs(){
    this.fg.controls['type'].valueChanges.subscribe(
      form =>{
        this.nTypes = form.length;

        if (this.nTypes > 1) {
          setTimeout(() => { 
            (<FormArray>this.fg.controls['type'])
            .at(1)
            .setValidators([
              Validators.required,
              this.notEqual.bind(this.fg)
            ]);            
          }, 1);

        }
      }
    );
  }
  public resetFormValues(){
    this.fg.reset({
      name: '',
      type: [''],
      becomes: '',
      description:''
    });
  }
  public addType(tipo?:string){
    let type:string;
    type = (tipo ? tipo : this.listTypes[2]);

    (<FormArray>this.fg.controls['type'])
    .push(
      new FormControl(type, Validators.required)
    );
  }
  public removeType(){
    (<FormArray>this.fg.controls['type']).removeAt(1);
  }

  public notEqual(control:FormControl): {[s:string]:boolean}{
    let fg:any = this;
    let val:any = (<FormArray>fg.controls['type']).at(0).value;

    if (control.value !== val) return null;   
    return {equals: true}
  }

  public submit(){
    this.outputData.emit(this.fg.value);
  }

}

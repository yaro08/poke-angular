import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

//import { map } from "rxjs/operator/map";
import "rxjs/add/operator/map";
import { Observer } from 'rxjs/Observer';

@Injectable()
export class PokemonsService {

    private pokemons:Pokemon[];
    private tipos:string[];
    private url:string

    constructor(public http: HttpClient//,
                //public headers: HttpHeaders
    ){
        console.log('Pokemons service runs...');

        this.url = 'http://localhost:3800/api/';
        //this.url = 'http://207.154.247.1:3800/api/';

        this.tipos =[
            'Bicho',
            'Dragón',
            'Hada',
            'Fuego',
            'Fantasma',
            'Tierra',
            'Normal',
            'Psíquico',
            'Acero',
            'Siniestro',
            'Eléctrico',
            'Lucha',
            'Volador',
            'Planta',
            'Hielo',
            'Veneno',
            'Roca',
            'Agua'
        ]
    }

    public get pokemonsList():Array<Pokemon> {
        return this.pokemons;
    }
    public get tiposList():Array<string> {
        return this.tipos;
    }  
    public findPokemon(text:string):Pokemon[] {
        let results:Pokemon[] = [];
        text = text.toLowerCase();

        this.getPokemons().subscribe(
            result =>{
                this.pokemons = result['result'];

                for (let pokemon of this.pokemons) {
                    let name = pokemon.name.toLowerCase();
                    if (name.indexOf(text) >= 0) 
                        results.push(pokemon);   
                }

            }, error =>{
                alert("Error en el servidor...");
            }
        );
        
        return results;
    }
    public getPokemons(){
        return this.http.get(this.url+'pokemons');       
    }
    public addPokemon(pokemon:object){
        //let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this.http.post(this.url+'new-pokemon', pokemon);
    }
    public deletePokemon(id:string){
        return this.http.delete(this.url+'pokemon/'+id);
    }
    public editPokemon(id:string, pokemon:object) {
        return this.http.put(this.url+'pokemon/'+id, pokemon);
    }
    public getPokemon(id:string) {
        return this.http.get(this.url+'pokemon/'+id);
    }
    public toggleFavPokemon(id:string, toFav:Pokemon):Observable<Object>{
        return this.http.put(this.url+'pokemon/fav/'+id, toFav);
        //console.log(id);
        //console.log(PokemonsList);
        //return {"val": null}
    }


    
}

export interface Pokemon {
    name: string,
    description:string,
    type:Array<string>,
    fav?:boolean,
    becomes?:string,
    _id?:string    
}
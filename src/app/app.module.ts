import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from "@angular/common/http";

import { APP_ROUTES } from './app.routes';

//SERVICES
import { PokemonsService } from './services/pokemons.service';
import { ModalService } from './services/modal.service';

//COMPONENTS
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonEditComponent } from './components/pokemon-edit/pokemon-edit.component';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';
import { PokemonNewComponent } from './components/pokemon-new/pokemon-new.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { CustomModalComponent } from './components/shared/custom-modal/custom-modal.component';
import { FormComponent } from './components/shared/form/form.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PokemonComponent,
    PokemonDetailsComponent,
    PokemonEditComponent,
    PokemonSearchComponent,
    PokemonNewComponent,
    PokemonListComponent,
    CustomModalComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    PokemonsService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

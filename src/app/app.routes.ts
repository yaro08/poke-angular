
import { RouterModule, Routes } from '@angular/router';

import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';
import { PokemonEditComponent } from './components/pokemon-edit/pokemon-edit.component';
import { PokemonNewComponent } from './components/pokemon-new/pokemon-new.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

const ROUTES: Routes = [
    //{ path: 'home', component: AppHomeComponent },
    { 
        path: 'pokemon', 
        component: PokemonComponent,
        children:[
            { path: 'list', component: PokemonListComponent },
            { path: 'new', component: PokemonNewComponent },
            { path: 'edit/:id', component: PokemonEditComponent },
            { path: 'details/:id', component: PokemonDetailsComponent },
            { path: '**', pathMatch:'full', redirectTo:'list' }
        ] 
    },
    { path: 'search/:pokemon', component: PokemonSearchComponent },
    { path: '**', pathMatch:'full', redirectTo:'pokemon' }
];


export const APP_ROUTES = RouterModule.forRoot(ROUTES);

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { PokemonTablesComponent } from './components/pokemon-tables/pokemon-tables.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'pokemon-tables',
        component: PokemonTablesComponent
    }
]

export const ROUTING = RouterModule.forRoot(
    appRoutes,
    { useHash: true, preloadingStrategy: PreloadAllModules }
)
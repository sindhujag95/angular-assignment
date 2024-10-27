import { Component } from '@angular/core';
import { PokemonService } from 'app/common/services/pokemon.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent {
    data: any = [];

    constructor(private pokemonService: PokemonService) {
        this.fetchData();
    }

    private fetchData(): void {
        this.pokemonService.getPosts().subscribe(response=> {
            this.data = response;
        });
    }
}
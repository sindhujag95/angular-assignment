import { Component } from "@angular/core";
import { Observable, forkJoin } from 'rxjs';
import * as Papa from 'papaparse';
import { PokemonService } from "app/common/services/pokemon.service";

@Component({
    selector: 'app-pokemon-tables',
    templateUrl: './pokemon-tables.component.html',
    styleUrls: ['./pokemon-tables.component.css']
})

export class PokemonTablesComponent {
    pokemonData: any[] = [];
    isLoading: boolean = false;
    selectedPokemonIndex: number | null = null;

    constructor(private pokemonService: PokemonService) {
        this.fetchData();
    }

    fetchData(): void {
        this.isLoading = true;
        const requests: Observable<any>[] = Array.from({ length: 200 }, () => {
            const randomNum = Math.floor(Math.random() * 500) + 1;
            return this.pokemonService.getPokemonById(randomNum);
        });
        // Use forkJoin to wait for all requests to complete
        forkJoin(requests).subscribe({
            next: (responses) => {
                this.pokemonData = responses.map(({ name, height, weight, id, moves, abilities }: any) => ({
                    name,
                    height,
                    weight,
                    rank: id,
                    moves: moves.map((move: any) => move?.move?.name).sort(),
                    abilities: abilities.map((ability: any) => ability?.ability?.name).sort()
                }));
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    toggleDetails(index: number): void {
        this.selectedPokemonIndex = this.selectedPokemonIndex === index ? null : index;
    }

    download(): void {
        const filteredData = this.pokemonData.map(({ name, height, weight, rank }) => ({
            name,
            height,
            weight,
            rank
        }));
        const csv = Papa.unparse(filteredData);
        const blob: Blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link: HTMLAnchorElement = document.createElement('a');
        const url: string = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'pokemons.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
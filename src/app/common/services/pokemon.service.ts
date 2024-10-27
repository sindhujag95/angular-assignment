import { Injectable } from "@angular/core";
import { RestService } from "./rest.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PokemonService {
    private baseUrl: string = "https://jsonplaceholder.typicode.com/";
    private pokemonBaseUrl: string = "https://pokeapi.co/api/v2/pokemon";
    constructor(private rest: RestService) {}

    getPosts(): Observable<any> {
        const url = this.baseUrl + "posts";
        return this.rest.exec(url, "GET");
    }

    getPokemonById(id: number): Observable<any> {
        const url = this.pokemonBaseUrl + "/" + id;
        return this.rest.exec(url, "GET");
    }
}
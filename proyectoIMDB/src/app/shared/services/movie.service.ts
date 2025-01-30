import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pelicula } from '../interfaces/imdb.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = environment.baseUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  getActores(): Observable<Pelicula[]>{
    return this.httpClient.get<Pelicula[]>(`${this.url}/Movies`)
  }

  // api.get('/Movies/:id', MovieController.getMovieById);
  // api.put('/Movies/:id', MovieController.editMovieById);
  // api.get('/MoviesFiltered', MovieController.getMovieByFilters);
  // api.post('/saveMovie', MovieController.createMovie);

  // getHeroesById(id: string):Observable<Hero | undefined>{
  //   return this.httpClient.get<Hero>(`${this.url}/heroes/${id}`)
  //   .pipe(
  //     catchError(err => of(undefined))
  //   )
  //   ;
  // }

  // updateHeroe(heroe:Hero): Observable<Hero>{
  //   if(!heroe.id){
  //     throw new Error('El id es necesario');
  //   }
  //   return this.httpClient.patch<Hero>(`${this.url}/heroes/${heroe.id}`,heroe);
  // }

  // deleteHeroById(id: string): Observable<boolean>{
  //   return this.httpClient.delete<boolean>(`${this.url}/heroes/${id}`)
  //   .pipe(
  //     map(resp => true),
  //     catchError(err => of(false))
  //   );
  // }

  // addHeroe(heroe:Hero):Observable<Hero>{
  //   if(!heroe.id){
  //     heroe.id = heroe.publisher.split(' ')[0].toLowerCase() + '-' + heroe.superhero;
  //   }
  //   return this.httpClient.post<Hero>(`${this.url}/heroes`,heroe);
  // }

  // getSuggestions(term: string):Observable<Hero[]>{
  //   return this.httpClient.get<Hero[]>(`${this.url}/heroes`)
  //   .pipe(
  //     map(heroes=>heroes.filter(heroe=>heroe.superhero.toLowerCase().includes(term.toLowerCase())))
  //   );
  // }
}

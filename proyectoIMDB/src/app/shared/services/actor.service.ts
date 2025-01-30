import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { Actor } from '../interfaces/imdb.interface';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private url = environment.baseUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  getActores(): Observable<Actor[]>{
    return this.httpClient.get<Actor[]>(`${this.url}/Actors`)
  }

  getActorsById(id: string):Observable<Actor | undefined>{
    return this.httpClient.get<Actor>(`${this.url}/Actors/${id}`)
    .pipe(
      catchError(err => of(undefined))
    );
  }

  // api.put('/Actors/:id', ActorController.editActorById);
  updateHeroe(actor:Actor): Observable<Actor>{
    return this.httpClient.put<Actor>(`${this.url}/Actors/${actor._id.$oid}`,actor);
  }

  // TODO Asegurarse de que funciona ese .delete
  deleteActorById(id: string): Observable<boolean>{
    return this.httpClient.delete<boolean>(`${this.url}/Actors/${id}`)
    .pipe(
      map(resp => true),
      catchError(err => of(false))
    );
  }

  // api.post('/saveActor', ActorController.createActor);
  addActor(actor:Actor):Observable<Actor>{
    return this.httpClient.post<Actor>(`${this.url}/saveActor`,actor);
  }

  // api.get('/ActorsFiltered', ActorController.getActorByFilters);
  // getSuggestions(term: string):Observable<Hero[]>{
  //   return this.httpClient.get<Hero[]>(`${this.url}/heroes`)
  //   .pipe(
  //     map(heroes=>heroes.filter(heroe=>heroe.superhero.toLowerCase().includes(term.toLowerCase())))
  //   );
  // }

  
}

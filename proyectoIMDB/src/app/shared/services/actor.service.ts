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
    return this.httpClient.get<{actores: Actor[]}>(`${this.url}/Actors`)
    .pipe(
      map(response => response.actores)
    )
  }
  // getActores(): Observable<Actor[]> {
  //   return this.httpClient.get<{ actores: Actor[] }>(${this.url}/Actors).pipe(
  //     map(response => response.actores) // Extrae solo la lista de actores
  //   );
  // }

  getActorsById(id: string):Observable<Actor | undefined>{
    return this.httpClient.get<{actores:Actor}>(`${this.url}/Actors/${id}`)
    .pipe(
      map(response => response.actores),
      catchError(err => of(undefined))
    );
  }

  // api.put('/Actors/:id', ActorController.editActorById);
  updateActor(actor:Actor): Observable<Actor>{
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
  getActorsByFilter(term: string):Observable<Actor[]>{
    return this.httpClient.get<{actores: Actor[]}>(`${this.url}/Actors`)
    .pipe(
      map(response=>response.actores.filter(actor=>actor.nombre.toLowerCase().includes(term.toLowerCase())))
    );
  }
  // api.get('/getReparto', ActorController.getReparto);
  getReparto(id:string):Observable<Actor[]>{
    return this.httpClient.get<{actores: Actor[]}>(`${this.url}/getReparto/${id}`)
    .pipe(
      map(response => response.actores)
    )
  } 

  
}

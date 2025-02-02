import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pelicula } from '../interfaces/imdb.interface';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = environment.baseUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  getMovies(): Observable<Pelicula[]> {
    return this.httpClient.get<{ movies: Pelicula[] }>(`${this.url}/Movies`).pipe(
      map(response => response.movies),
      catchError(err => of([]))

    )
  }

  getGeneros(): Observable<string[]> {
    return this.httpClient.get<{ movieGenders: any[] }>(`${this.url}/getGenders`).pipe(
      map(response => {
        return response.movieGenders.map(genero => genero.genero);
      }),
      catchError(err => of([]))

    )
  }

  // api.get('/Movies/:id', MovieController.getMovieById);
  getMovieById(id: string): Observable<Pelicula | undefined> {
    return this.httpClient.get<{ movies: Pelicula }>(`${this.url}/Movies/${id}`)
      .pipe(
        map(res => res.movies),
        catchError(err => of(undefined))
      );
  }

  // api.put('/Movies/:id', MovieController.editMovieById);
  updateMovie(pelicula: Pelicula): Observable<Pelicula> {
    return this.httpClient.put<Pelicula>(`${this.url}/Movies/${pelicula._id}`, pelicula);
  }

  // TODO Asegurarse de que funciona ese .delete
  deleteMovieById(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/deleteMovie/${id}`)
      .pipe(
        map(resp => true),
        catchError(err => of(false))
      );
  }

  // api.post('/saveMovie', MovieController.createMovie);
  addMovie(pelicula: Pelicula): Observable<string> {
    return this.httpClient.post<{id:string}>(`${this.url}/saveMovie`, pelicula)
      .pipe(
        map(response => response.id)
      );
  }


  // api.get('/MoviesFiltered', MovieController.getMovieByFilters);
  getFilteredMovies(genres: string, keywords: string, year: string, rating: string, sortBy: string, order: string): Observable<Pelicula[]> {
    return this.httpClient.get<{ movies: Pelicula[] }>(`${this.url}/MoviesFiltered?genre=${genres}&keywords=${keywords}&year=${year}&rating=${rating}&sortBy=${sortBy}&order=${order}`).pipe(
      map(response => response.movies),
      catchError(err => of([]))

    )
  }
  //api.get('/getTrabajos',MovieController.getTrabajos);
  getTrabajos(id: string): Observable<Pelicula[]> {
    return this.httpClient.get<{ peliculas: Pelicula[] }>(`${this.url}/getTrabajos/${id}`)
      .pipe(
        map(response => response.peliculas),
        catchError(err => of([]))
      )
  }


  addReparto(id:string,reparto:any[]):Observable<boolean>{
     
    return this.httpClient.put<boolean>(`${this.url}/addActorsMovie`, {idPelicula:id, listaActor:reparto})
    .pipe(
      map(resp => true),
      catchError(err => of(false))
    )
  }
  
  deleteReparto(id:string,reparto:any[]):Observable<boolean>{
    
    return this.httpClient.post<boolean>(`${this.url}/deleteActorsMovie`, { idPelicula: id, listaActor: reparto } )
    .pipe(
      map(resp => true),
      catchError(err => of(false))
    );
  }
  

}

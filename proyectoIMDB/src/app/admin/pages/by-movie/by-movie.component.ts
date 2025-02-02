import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import { MoviesTableComponent } from '../../components/movies-table/movies-table.component';
import { MovieService } from '../../../shared/services/movie.service';
import { Pelicula } from '../../../shared/interfaces/imdb.interface';


@Component({
  selector: 'app-by-movie',
  imports: [MatButtonModule, MoviesTableComponent],
  templateUrl: './by-movie.component.html',
  styleUrl: './by-movie.component.scss'
})
export class ByMovieComponent {
  public MovieData!:Pelicula[];
  constructor(
      private movieService:MovieService
  
    ){}

  ngOnInit(){
      this.movieService.getMovies()
      .subscribe(response=>{
        this.MovieData = response
        console.log(this.MovieData);
      });
  }

}

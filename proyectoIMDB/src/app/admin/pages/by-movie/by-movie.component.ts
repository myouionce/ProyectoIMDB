import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import { MoviesTableComponent } from '../../components/movies-table/movies-table.component';
import { MovieService } from '../../../shared/services/movie.service';
import { Pelicula } from '../../../shared/interfaces/imdb.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-by-movie',
  imports: [MatButtonModule, MoviesTableComponent, MatIconModule, MatInputModule,
      MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './by-movie.component.html',
  styleUrl: './by-movie.component.scss'
})
export class ByMovieComponent {
  public MovieData!:Pelicula[];

  public searchInput = new FormControl();

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

  searchPelicula(): void{
    const value: string = this.searchInput.value || '';

    this.movieService.getFilteredMovies('', value, '', '', 'titulo', 'desc')
      .subscribe( actores => this.MovieData = actores );
  }


}

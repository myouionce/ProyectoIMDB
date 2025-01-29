import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import { MoviesTableComponent } from '../../components/movies-table/movies-table.component';


@Component({
  selector: 'app-by-movie',
  imports: [MatButtonModule, MoviesTableComponent],
  templateUrl: './by-movie.component.html',
  styleUrl: './by-movie.component.scss'
})
export class ByMovieComponent {

}

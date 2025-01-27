import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import { ActorsTableComponent } from "../../components/actors-table/actors-table.component";


@Component({
  selector: 'app-by-movie',
  imports: [MatButtonModule, ActorsTableComponent],
  templateUrl: './by-movie.component.html',
  styleUrl: './by-movie.component.scss'
})
export class ByMovieComponent {

}

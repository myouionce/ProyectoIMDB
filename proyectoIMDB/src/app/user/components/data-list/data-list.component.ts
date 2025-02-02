import { MovieService } from './../../../shared/services/movie.service';
import { ActorService } from './../../../shared/services/actor.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Pelicula, Actor } from '../../../shared/interfaces/imdb.interface';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { ActivatedRoute } from '@angular/router';
import { ActorCardComponent } from "../actor-card/actor-card.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-data-list',
  imports: [CommonModule, MovieCardComponent, ActorCardComponent, MatButtonModule, MatIconModule],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.scss'
})
export class DataListComponent {
  public dataType: boolean = false;
  public data: any[] = [];

  
  constructor(
    private actorService: ActorService,
    private movieService: MovieService,
    private route: ActivatedRoute
  ){}


  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      const path = urlSegments.map(segment => segment.path).join('/');
      if (path.includes('actorlist')) {
        this.dataType = true;
        this.actorService.getActores()
          .subscribe(actores  => this.data = actores);
      } else if (path.includes('movielist')) {
        this.dataType = false;
        this.movieService.getMovies()
          .subscribe(movies => this.data = movies);
      }
    });


  }

  currentPage = 1;
  itemsPerPage = 12;
  get paginatedData(){
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.data.slice(start, end);
  }
  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }
  
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  
}

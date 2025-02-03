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
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-data-list',
  imports: [CommonModule, MovieCardComponent, ActorCardComponent, MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.scss'
})
export class DataListComponent {
  public dataType: boolean = false;
  public data: any[] = [];
  public searchInput = new FormControl();
  public isAscending: boolean = true;

  searchForm!: FormGroup;

  public generosS:string[] = [];
  public sortS:string[] = ["titulo", "lanzamiento", "calificacion"];
  

  
  constructor(
    private actorService: ActorService,
    private movieService: MovieService,
    private formBuilder:FormBuilder,
    private route: ActivatedRoute
  ){ 
    this.searchForm = this.createSearchForm();
  }


  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      const path = urlSegments.map(segment => segment.path).join('/');
      if (path.includes('actorlist')) {
        this.dataType = true;
        this.actorService.getActores()
          .subscribe(actores  => this.data = actores);
      } else if (path.includes('movielist')) {
        this.dataType = false;
        this.movieService.getFilteredMovies('','','','','titulo','asc')
          .subscribe(movies => {
            this.data = movies;
            console.log(movies);
          });
        
      }
    });

    this.movieService.getGeneros()
    .subscribe(res => {
      this.generosS = res;
    });


  }

  searchActor(): void{
    const value: string = this.searchInput.value || '';

    this.actorService.getActorsByFilter(value)
      .subscribe( actores => this.data = actores );
  }


  search(){
    const formValues = this.searchForm.value;

    // Convertimos los géneros en una cadena separada por comas
    const genreString = formValues.genre ? formValues.genre.join(',') : '';
    // genres: string, keywords: string, year: string, rating: string, sortBy: string, order: string
    this.movieService.getFilteredMovies(
      genreString,
      formValues.searchInput,
      formValues.year,
      formValues.rating,
      formValues.sortBy,
      formValues.order,
    ).subscribe(movies => {
      this.data = movies;
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
  
  createSearchForm(): FormGroup{
    return this.formBuilder.group({
      searchInput:[''],
      genre:[],
      year:['',[Validators.maxLength(4)]],
      rating:[1,[Validators.min(1),Validators.max(10)]],
      sortBy:["titulo"],
      order:["asc"]
    });
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
  
  toggleSort() {
    this.isAscending = !this.isAscending; // Alternar entre true y false
    this.searchForm.patchValue({order:(this.isAscending?'asc':'desc')}) // Aquí puedes enviar el valor donde lo necesites
  }
}

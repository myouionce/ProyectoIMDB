import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule} from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Pelicula } from '../../../shared/interfaces/imdb.interface';


@Component({
  selector: 'admin-movies-table',
  imports: [MatPaginatorModule, MatIconModule, MatTableModule,CommonModule, RouterModule, MatSortModule, MatButtonModule],
  templateUrl: './movies-table.component.html',
  styleUrl: './movies-table.component.scss'
})
export class MoviesTableComponent implements AfterViewInit{

  private _liveAnnouncer = inject(LiveAnnouncer);
  
  public peliculas_data = [
    {
      id: 1,
      titulo: "Inception",
      descripcion: "Un ladrón especializado en el robo de secretos a través de los sueños recibe una última oportunidad para redimir su vida, si logra implantar una idea en la mente de un CEO.",
      genero: "Ciencia ficción, Acción, Thriller",
      director: "Christopher Nolan",
      lanzamiento: 2010,
      calificacion: 8.8
    },
    {
      id:2,
      titulo: "The Dark Knight",
      descripcion: "Batman se enfrenta al Joker, un criminal psicópata cuyo objetivo es sumergir a Gotham City en el caos.",
      genero: "Acción, Crimen, Drama",
      director: "Christopher Nolan",
      lanzamiento: 2008,
      calificacion: 9.0
    },
    {
      id:3,
      titulo: "The Shawshank Redemption",
      descripcion: "Un banquero es condenado a prisión por un crimen que no cometió. A lo largo de los años, establece una amistad con otro prisionero y se gana el respeto de todos.",
      genero: "Drama",
      director: "Frank Darabont",
      lanzamiento: 1994,
      calificacion: 9.3
    },
    {
      id:4,
      titulo: "The Matrix",
      descripcion: "Un programador de computadoras descubre que la realidad que conoce es una simulación creada por máquinas, y se une a un grupo de rebeldes para liberarse de ella.",
      genero: "Ciencia ficción, Acción",
      director: "Lana Wachowski, Lilly Wachowski",
      lanzamiento: 1999,
      calificacion: 8.7
    },
    {
      id:5,
      titulo: "Interstellar",
      descripcion: "En un futuro cercano, un grupo de astronautas emprende un viaje a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.",
      genero: "Ciencia ficción, Drama, Aventura",
      director: "Christopher Nolan",
      lanzamiento: 2014,
      calificacion: 8.6
    }
  ]
  

  // public trabajos = [
  //   {
  //     titulo: "Crepúsculo",
  //     año: 2008,
  //     rol: "Edward Cullen"
  //   },
  //   {
  //     titulo: "Cosmopolis",
  //     año: 2012,
  //     rol: "Eric Packer"
  //   },
  //   {
  //     titulo: "The Rover",
  //     año: 2014,
  //     rol: "Rey"
  //   },
  //   {
  //     titulo: "Good Time",
  //     año: 2017,
  //     rol: "Connie Nikas"
  //   },
  //   {
  //     titulo: "The Batman",
  //     año: 2022,
  //     rol: "El Acertijo (Riddler)"
  //   }
  // ]
  

  @Input()
  public peliculas: Pelicula[] = [];

  dataSource = new MatTableDataSource<any>(this.peliculas_data);
  displayedColumns: string[] = ['titulo', 'descripcion',
    'genero', 'director', 'año' ,'calificacion','delete', 'edit'];

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  deleteMovie(id:number){
     
     this.dataSource.data =this.dataSource.data.filter(peli=> peli.id != id);
     
     console.log(this.dataSource.data);
     this.dataSource._updateChangeSubscription();
  }
}

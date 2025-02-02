import { MovieService } from './../../../shared/services/movie.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Pelicula } from '../../../shared/interfaces/imdb.interface';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'admin-movies-table',
  imports: [MatPaginatorModule, MatIconModule, MatTableModule, CommonModule, RouterModule, MatSortModule, MatButtonModule],
  templateUrl: './movies-table.component.html',
  styleUrl: './movies-table.component.scss'
})
export class MoviesTableComponent implements AfterViewInit {

  private _liveAnnouncer = inject(LiveAnnouncer);

  public peliculas_data = []



  @Input()
  public peliculas: Pelicula[] = [];

  dataSource = new MatTableDataSource<any>(this.peliculas);
  displayedColumns: string[] = ['titulo', 'descripcion',
    'genero', 'director', 'año', 'calificacion', 'delete', 'edit'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['peliculas']) {
      this.dataSource.data = this.peliculas;
      this.dataSource._updateChangeSubscription(); // Actualiza la tabla
    }
  }

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

  private _snackBar = inject(MatSnackBar);

  deleteMovie(id: number) {

    if (this.dataSource.data) {
      this.dataSource.data = this.dataSource.data.filter(peli => peli._id !== id);
      console.log(this.dataSource.data);

      this.movieService.deleteMovieById(id.toString())
        .subscribe(response => {
          this._snackBar.open('Pelicula eliminada', 'Cerrar', { duration: 3000 });
        });
      this.dataSource._updateChangeSubscription();
    } else {
      console.error('dataSource.data is undefined');
    }
  }
}

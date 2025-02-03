import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Actor } from '../../../shared/interfaces/imdb.interface';
import { ActorService } from '../../../shared/services/actor.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'admin-actors-table',
  imports: [MatPaginatorModule, MatIconModule, MatTableModule, CommonModule, RouterModule, MatSortModule, MatButtonModule],
  templateUrl: './actors-table.component.html',
  styleUrl: './actors-table.component.scss'
})
export class ActorsTableComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  public actores_data = []
  constructor(
    private actorService: ActorService
  ) { }


  @Input()
  public actores: Actor[] = [];

  dataSource = new MatTableDataSource<any>(this.actores);
  displayedColumns: string[] = ['nombre', 'fecha_de_nacimiento', 'biografia', 'delete', 'edit'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actores'] && this.actores) {
      this.dataSource = new MatTableDataSource(this.actores);
      
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
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

  deleteActor(id: number) {

    if (this.dataSource.data) {
      this.dataSource.data = this.dataSource.data.filter(actor => actor._id !== id);
      console.log(this.dataSource.data);

      this.actorService.deleteActorById(id.toString())
        .subscribe(response => {
          this._snackBar.open('Actor eliminado', 'Cerrar', { duration: 3000 });
        });
      this.dataSource._updateChangeSubscription();
    } else {
      console.error('dataSource.data is undefined');
    }
  }

}

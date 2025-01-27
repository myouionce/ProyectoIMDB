import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSidenavModule} from '@angular/material/sidenav'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatListModule} from '@angular/material/list'

@Component({
  selector: 'app-layout-admin-page',
  imports: [RouterModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './layout-admin-page.component.html',
  styleUrl: './layout-admin-page.component.scss'
})
export class LayoutAdminPageComponent {
  public sidebarItems = [
    {label: 'Peliculas', icon: 'movie', url:'./by-movie'},
    {label: 'Actores', icon: 'add', url:'./by-actor'},
    {label: 'Agregar Pelicula', icon: 'add_to_queue', url:'./add-movie'},
    {label: 'Agregar Actor', icon: 'person_add', url:'./add-actor'}
  ]
}

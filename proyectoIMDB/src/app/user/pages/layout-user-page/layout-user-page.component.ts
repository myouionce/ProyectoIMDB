import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-user-page',
  imports: [RouterModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './layout-user-page.component.html',
  styleUrl: './layout-user-page.component.scss'
})
export class LayoutUserPageComponent {
  public sidebarItems = [
    {label: 'Peliculas', icon: 'movie', url:'./movielist'},
    {label: 'Actores', icon: 'group', url:'./actorlist'}
  ]
}

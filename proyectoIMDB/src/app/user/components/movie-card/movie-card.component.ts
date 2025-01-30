import { Component, Input } from '@angular/core';
import { Pelicula } from '../../../shared/interfaces/imdb.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input()
  public pelicula!: Pelicula;

  ngOnInit(): void {
    if(!this.pelicula){
      throw new Error('Attribute pelicula is required');
    }
  }

  onImageError(event: any) {
    event.target.src = 'notFound.png'
  }
}

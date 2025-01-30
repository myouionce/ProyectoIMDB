import { Component, Input } from '@angular/core';
import { Actor } from '../../../shared/interfaces/imdb.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-actor-card',
  imports: [CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule],
  templateUrl: './actor-card.component.html',
  styleUrl: './actor-card.component.scss'
})
export class ActorCardComponent {
  
  @Input()
  public actor!: Actor;

  ngOnInit(): void {
    if(!this.actor){
      throw new Error('Attribute actor is required');
    }
  }

  onImageError(event: any) {
    event.target.src = 'notFound.png'
  }
}

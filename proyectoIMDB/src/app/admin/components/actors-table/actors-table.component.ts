import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'admin-actors-table',
  imports: [CommonModule, RouterModule],
  templateUrl: './actors-table.component.html',
  styleUrl: './actors-table.component.scss'
})
export class ActorsTableComponent {
  

  @Input()
  public actores: any[] = [];
}

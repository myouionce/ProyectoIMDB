import { Component } from '@angular/core';
import { ActorsTableComponent } from '../../components/actors-table/actors-table.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-by-actor',
  imports: [MatButtonModule ,ActorsTableComponent],
  templateUrl: './by-actor.component.html',
  styleUrl: './by-actor.component.scss'
})
export class ByActorComponent {

}

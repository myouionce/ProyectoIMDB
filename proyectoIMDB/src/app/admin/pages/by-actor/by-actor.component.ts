import { Actor } from './../../../shared/interfaces/imdb.interface';
import { Component } from '@angular/core';
import { ActorsTableComponent } from '../../components/actors-table/actors-table.component';
import { MatButtonModule } from '@angular/material/button';
import { ActorService } from '../../../shared/services/actor.service';

@Component({
  selector: 'app-by-actor',
  imports: [MatButtonModule ,ActorsTableComponent],
  templateUrl: './by-actor.component.html',
  styleUrl: './by-actor.component.scss'
})
export class ByActorComponent {
  public ActorData!:Actor[];
  constructor(
    private actorService:ActorService

  ){}

  ngOnInit(){
    this.actorService.getActores()
    .subscribe(response=>{
      this.ActorData = response
      console.log(this.ActorData);
    });
  }
}

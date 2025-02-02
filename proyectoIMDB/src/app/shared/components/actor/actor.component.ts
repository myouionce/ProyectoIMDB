
import { CommonModule } from '@angular/common';
import { Component, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Actor, Pelicula } from '../../interfaces/imdb.interface';
import { MovieService } from './../../../shared/services/movie.service';
import { ActorService } from './../../../shared/services/actor.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-actor',
  imports: [MatCardModule, CommonModule, RouterModule, MatButtonModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonToggleModule,
    MatSelectModule, ReactiveFormsModule, CommonModule, MatDividerModule],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.scss'
})
export class ActorComponent {
  actorForm!: FormGroup;


  public actorMode: 'view' | 'edit' | 'add' = 'view';


  public actor = {
    nombre: ' ',
    nacimiento: '',
    biografia: '',
    fotoPrincipal: '',
    fotosExtra: ['']
  }

  //----------------------------------------------------
  //definir la lista de actores con getReparto y id de la pelicula
  public peliculas_data: Pelicula[] = [];
  public trabajos: Pelicula[] = [];
  //------------------------------------------------------------


  public filtro: string = '';
  public peliculas_filtradas = [...this.peliculas_data];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private actorService: ActorService,
    private movieService: MovieService,
    private activatedRouter: ActivatedRoute
  ) {
    this.actorForm = this.createActorForm();
  }

  filtrarPeliculas(event: Event) {
    const texto = (event.target as HTMLInputElement).value.toLowerCase();
    this.peliculas_filtradas = this.peliculas_data.filter(peli =>
      peli.titulo.toLowerCase().includes(texto)
    );
  }




  ngOnInit(): void {
    if (this.router.url.includes('add-')) {
      this.actorMode = 'add';

      return;
    }
    //-------------------------------------------------
    //cambiar por un get con el id de la pelicula

    this.activatedRouter.params
      .pipe(
        switchMap(({ id }) => this.actorService.getActorsById(id)))
      .subscribe(actor => {
        console.log(actor);
        if (!actor) {
          return this.router.navigateByUrl('/');
        }
        this.actor = actor;
        return;
      })
    this.activatedRouter.params
      .pipe(
        switchMap(({ id }) => this.movieService.getTrabajos(id)))
      .subscribe(pelis => {
        if (!pelis) {
          return this.router.navigateByUrl('/');
        }
        
        this.trabajos = pelis;
        return;
      })


      console.log(this.actor);

    if (!this.router.url.includes('user')) {
      this.actorMode = 'edit';
      
      this.setActorData({ ...this.actor, trabajos: this.trabajos });

      return;
    }
    this.actor.fotosExtra = this.actor.fotosExtra.filter(foto => foto != this.actor.fotoPrincipal);
    

  }
  addImg(urlImg: string) {
    let fotos = this.actorForm.value.fotosExtra;
    fotos[0] === '' ? fotos[0] = urlImg : fotos.push(urlImg);
    console.log(fotos);
    this.actorForm.patchValue({ fotosExtra: fotos });
  }

  deleteImg(i: number) {
    let fotos = this.actorForm.value.fotosExtra;
    fotos.splice(i, 1);
    this.actorForm.patchValue({ fotosExtra: fotos });
  }

  createActorForm(): FormGroup {
    return this.formBuilder.group({
      nombre: [this.actor.nombre, [Validators.required]],
      nacimiento: [this.actor.nacimiento, [Validators.required]],
      biografia: [this.actor.biografia, [Validators.required]],
      fotoPrincipal: [this.actor.fotoPrincipal],
      fotosExtra: [this.actor.fotosExtra],
      trabajos: [this.trabajos]
    });
  }

  setActorData(actor: any): void {
    
    if (this.actorForm) {
      
      this.actorForm.patchValue({
        nombre: actor.nombre || '',
        nacimiento: actor.nacimiento || '',
        biografia: actor.biografia || '',
        fotoPrincipal: actor.fotoPrincipal || '',
        fotosExtra: actor.fotosExtra || [],
        trabajos: actor.trabajos || []
      });
    }
  }
}

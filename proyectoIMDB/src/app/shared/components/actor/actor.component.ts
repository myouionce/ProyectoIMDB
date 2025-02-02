
import { CommonModule } from '@angular/common';
import { Component, inject, SimpleChanges } from '@angular/core';
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
import { first, forkJoin, switchMap } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  loadTrabajos(actorId: string): void {
    this.movieService.getTrabajos(actorId)
      .subscribe(
        pelis => {
          
          if (!pelis) {
            this.trabajos = [];
            this.setActorData(this.actor);
            return;
          }
          this.trabajos = pelis;
          this.setActorData(this.actor);


        },
        error => {
          if (error.status === 404) {
            this.trabajos = [];
            this.setActorData(this.actor);
          } else {
            console.error('Error al obtener los trabajos:', error);
          }
        }
      );
  }


  ngOnInit(): void {
    if (this.router.url.includes('add-')) {
      this.actorMode = 'add';
      this.loadPeliculas();
      return;
    }
    //-------------------------------------------------
    //cambiar por un get con el id de la pelicula

    this.activatedRouter.params
      .pipe(
        switchMap(({ id }) => this.actorService.getActorsById(id)))
      .subscribe({
        next: actor => {
          
          if (!actor) {
            this.router.navigateByUrl('/');
            return;
          }
          this.actor = actor;
          this.loadTrabajos(actor._id as unknown as string);
        },
        error: err => {
          console.error('Error al obtener el actor:', err);
          this.router.navigateByUrl('/');
        }
      });

      forkJoin({
        trabajos1: this.activatedRouter.params.pipe(
          first(),
          switchMap(({ id }) => this.movieService.getTrabajos(id))
        ),
        peliculas1: this.movieService.getMovies()
      }).subscribe(({ trabajos1, peliculas1 }) => {
        this.peliculas_data = peliculas1;
        this.peliculas_filtradas = [...peliculas1];
  
        this.trabajos = trabajos1;
        this.setActorTrabajo(trabajos1);
      });
    





    if (!this.router.url.includes('user')) {
      this.actorMode = 'edit';


      return;
    }
    this.actor.fotosExtra = this.actor.fotosExtra.filter(foto => foto != this.actor.fotoPrincipal);


  }
  loadPeliculas(): void {
    this.movieService.getMovies()
      .subscribe(
        peliculas => {
          this.peliculas_data = peliculas;
          this.peliculas_filtradas = [...this.peliculas_data];
        },
        error => {
          console.error('Error al obtener las películas:', error);
        }
      );
  }
  addImg(urlImg: string) {
    let fotos = this.actorForm.value.fotosExtra;
    fotos[0] === '' ? fotos[0] = urlImg : fotos.push(urlImg);
    
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
        fotosExtra: actor.fotosExtra || []
      });
    }
  }

  setActorTrabajo(trabajos: Pelicula[]): void {
    if (this.actorForm) {
        const trabajoValido = trabajos
          .map(r => this.peliculas_filtradas.find(a => a._id === r._id)) // Busca coincidencias por ID
          .filter(a => a); 
  
        this.actorForm.patchValue({
          trabajos: trabajoValido
        });
  
      }
  }

  private _snackBar = inject(MatSnackBar);
  texto: string = '';
  guardarActor(){
    if (this.actorForm.invalid) {
      return; 
    }

    const nuevoActor: Actor = {
      _id: {$oid: ''},
      nombre: this.actorForm.value.nombre,
      nacimiento: this.actorForm.value.nacimiento,
      biografia: this.actorForm.value.biografia,
      fotoPrincipal: this.actorForm.value.fotoPrincipal || '',
      fotosExtra: this.actorForm.value.fotosExtra || []
    };
    console.log(nuevoActor);
    this.actorService.addActor(nuevoActor).subscribe(response =>{
      if(response){
        this._snackBar.open('Actor creado', 'Cerrar', {duration: 3000});
        this.saveTrabajos(response._id.$oid);
      }else{
        this.texto = 'El actor ya existe';
      }
    })
  
  }
  saveTrabajos(id: string){

  }
}

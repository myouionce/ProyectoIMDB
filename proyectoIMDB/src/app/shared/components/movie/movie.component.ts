import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Actor, Pelicula } from '../../interfaces/imdb.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { first, forkJoin, switchMap, timeout } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { ActorService } from '../../services/actor.service';

@Component({
  selector: 'app-movie',
  imports: [MatCardModule, CommonModule, RouterModule, MatButtonModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonToggleModule,
    MatSelectModule, ReactiveFormsModule, CommonModule, MatDividerModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {

  public movieMode: 'view' | 'edit' | 'add' = 'view';

  movieForm!: FormGroup;

  public movie = {
    _id: '',
    titulo: '',
    descripcion: '',
    genero: [''],
    director: '',
    lanzamiento: '',
    calificacion: 0,
    portada: '',
    fotosExtra: ['']
  }

  public movieReparto:Actor[] = [];
  //----------------------------------------------------
  //definir la lista de actores con getReparto y id de la pelicula
  public actores_data:Actor[] = []
  //getgeneros()
  public generos:string[] = [];

  //------------------------------------------------------------

  
  public filtro: string = ''; 
  public actores_filtrados:Actor[] = [];

  
  constructor(
    private actorService:ActorService,
    private movieService: MovieService,
    private formBuilder:FormBuilder,
    private router: Router,
    private activatedRouter:ActivatedRoute
  ){
    this.movieForm = this.createMovieForm();
  }



  filtrarActores(event: Event) {
    const texto = (event.target as HTMLInputElement).value.toLowerCase();
    this.actores_filtrados = this.actores_data.filter(actor =>
      actor.nombre.toLowerCase().includes(texto)
    );
  }
  getStars(calificacion: number):string[]{
    const stars: string[] = [];
    let remaining = calificacion / 2; // Convierte de 10 a escala de 5

    while (remaining >= 1) {
      stars.push('star');
      remaining--;
    }

    if (remaining >= 0.5) {
      stars.push('star_half');
      remaining -= 0.5;
    }

    while (stars.length < 5) {
      stars.push('star_border');
    }

    return stars;
  }

  ngOnInit():void{
    if(this.router.url.includes('add-')){
      this.movieMode = 'add';
      
      this.actorService.getActores().subscribe(
        actores => {this.actores_data = actores;
          this.actores_filtrados = [...actores];
        }

      )
      return;
    }
    this.generos = ["Drama", "Crimen", "Comedia", "Accion"];
    
    //-------------------------------------------------
    //cambiar por un get con el id de la pelicula
    
    this.activatedRouter.params
    .pipe(
      switchMap(({id})=> this.movieService.getMovieById(id)))
      .subscribe(peli => {
        if(!peli){
          if(this.router.url.includes('admin')){
            return this.router.navigateByUrl('/admin');
          }else{
            return this.router.navigateByUrl('/user');
          }
          
        }
        this.movie = peli;
        this.setMovieData(peli);
        return;
      })

    

    forkJoin({
      reparto1: this.activatedRouter.params.pipe(
        first(),
        switchMap(({ id }) => this.actorService.getReparto(id))
      ),
      actores1: this.actorService.getActores()
    }).subscribe(({ reparto1, actores1 }) => {
      this.actores_data = actores1;
      this.actores_filtrados = [...actores1];
    
      this.movieReparto = reparto1;
      this.setMovieRepartoData(reparto1);
    });
    //reparto
    //------------------------------------------------------
    
    
    if(!this.router.url.includes('user')){
      this.movieMode = 'edit';
      
      return;
    }

  }
 
  addImg(urlImg:string){
    let fotos = this.movieForm.value.fotosExtra;
    fotos[0] === ''?fotos[0] = urlImg:fotos.push(urlImg);
    console.log(fotos);
    this.movieForm.patchValue({fotosExtra:fotos});
  }

  deleteImg(i:number){
    let fotos = this.movieForm.value.fotosExtra;
    fotos.splice(i,1);
    this.movieForm.patchValue({fotosExtra:fotos});
  }

  createMovieForm(): FormGroup{
    return this.formBuilder.group({
      _id:[this.movie._id],
      titulo:[this.movie.titulo, [Validators.required]],
      lanzamiento:[this.movie.lanzamiento, [Validators.required]],
      descripcion: [this.movie.descripcion, [Validators.required]],
      genero: [this.movie.genero, [Validators.required]],
      director: [this.movie.director, [Validators.required]],
      calificacion: [this.movie.calificacion, [Validators.required]],
      portada: [this.movie.portada],
      fotosExtra: [this.movie.fotosExtra],
      reparto: [this.movieReparto]
    });
  }
  

  setMovieData(movie:Pelicula):void{
    if(this.movieForm){
      this.movieForm.patchValue({
      _id:movie._id || '',
      titulo: movie.titulo || '',
      lanzamiento: movie.lanzamiento || '',
      descripcion: movie.descripcion || '',
      genero: movie.genero || [],
      director: movie.director || '',
      calificacion: movie.calificacion  || 0,
      portada: movie.portada || '',
      fotosExtra: movie.fotosExtra || []
      });
    }
  }
  
  setMovieRepartoData(reparto: Actor[]): void {
   if (this.movieForm) {
      const repartoValido = reparto
        .map(r => this.actores_filtrados.find(a => a._id === r._id)) // Busca coincidencias por ID
        .filter(a => a); 

      this.movieForm.patchValue({
        reparto: repartoValido
      });

    }
  }
  onSubmit(){
    if(this.movie._id){
      this.movieService.updateMovie(this.movieForm.value)
      .subscribe( peli => {
        console.log("Pelicula Actualizada")
      });

      
      let addActores = this.movieForm.value.reparto.filter((item2:Actor) => !this.movieReparto.some((item1:Actor) => item1._id === item2._id))
                      
      if (addActores.length>0){
        this.movieService.addReparto(this.movie._id, addActores)
        .subscribe( resp =>{
          if(resp){

            console.log("Reparto Agregado")
          }else{
            console.log("Reparto falso")

          }
        })
      }
      let removeActors = this.movieReparto.filter((item2:Actor) => !this.movieForm.value.reparto.some((item1:Actor) => item1._id === item2._id));
                      
      if (removeActors.length>0){
        this.movieService.deleteReparto(this.movie._id, removeActors)
        .subscribe( resp =>{
          console.log("Reparto borrado");
        })
      }
    }else{
      this.movieService.addMovie(this.movieForm.value)
      .subscribe( peli => {
        console.log("Pelicula Creada")
      });
    }
  }
}

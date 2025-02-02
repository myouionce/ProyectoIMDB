import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';
import { Actor } from '../../interfaces/imdb.interface';

@Component({
  selector: 'app-actor',
  imports: [MatCardModule, CommonModule, RouterModule, MatButtonModule, FormsModule,
      MatFormFieldModule, MatInputModule, MatIconModule, MatButtonToggleModule,
      MatSelectModule, ReactiveFormsModule, CommonModule, MatDividerModule],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.scss'
})
export class ActorComponent {
  public actorMode: 'view' | 'edit' | 'add' = 'view';
  
  actorForm!: FormGroup;


  public actor = {
    nombre: ' ',
    nacimiento: '',
    biografia: '',
    fotoPrincipal: '',
    fotosExtra: [''] ,
    trabajos:[{}]
  }

  //----------------------------------------------------
  //definir la lista de actores con getReparto y id de la pelicula
  public peliculas_data = [
    {
      id: 1,
      titulo: "Inception",
      descripcion: "Un ladrón especializado en el robo de secretos a través de los sueños recibe una última oportunidad para redimir su vida, si logra implantar una idea en la mente de un CEO.",
      genero: "Ciencia ficción, Acción, Thriller",
      director: "Christopher Nolan",
      lanzamiento: 2010,
      calificacion: 8.8,
      portada:'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      fotosExtra: []
    },
    {
      id:2,
      titulo: "The Dark Knight",
      descripcion: "Batman se enfrenta al Joker, un criminal psicópata cuyo objetivo es sumergir a Gotham City en el caos.",
      genero: "Acción, Crimen, Drama",
      director: "Christopher Nolan",
      lanzamiento: 2008,
      calificacion: 9.0,
      portada:'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      fotosExtra: []
    },
    {
      id:3,
      titulo: "The Shawshank Redemption",
      descripcion: "Un banquero es condenado a prisión por un crimen que no cometió. A lo largo de los años, establece una amistad con otro prisionero y se gana el respeto de todos.",
      genero: "Drama",
      director: "Frank Darabont",
      lanzamiento: 1994,
      calificacion: 9.3,
      portada:'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      fotosExtra: []
    },
    {
      id:4,
      titulo: "The Matrix",
      descripcion: "Un programador de computadoras descubre que la realidad que conoce es una simulación creada por máquinas, y se une a un grupo de rebeldes para liberarse de ella.",
      genero: "Ciencia ficción, Acción",
      director: "Lana Wachowski, Lilly Wachowski",
      lanzamiento: 1999,
      calificacion: 8.7,
      portada:'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      fotosExtra: []
    },
    {
      id:5,
      titulo: "Interstellar",
      descripcion: "En un futuro cercano, un grupo de astronautas emprende un viaje a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.",
      genero: "Ciencia ficción, Drama, Aventura",
      director: "Christopher Nolan",
      lanzamiento: 2014,
      calificacion: 8.6,
      portada:'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      fotosExtra: []
    },
    {
      id:6,
      titulo: "Interstellar",
      descripcion: "En un futuro cercano, un grupo de astronautas emprende un viaje a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.",
      genero: "Ciencia ficción, Drama, Aventura",
      director: "Christopher Nolan",
      lanzamiento: 2014,
      calificacion: 8.6,
      portada:'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      fotosExtra: []
    },
    {
      id:7,
      titulo: "Interstellar",
      descripcion: "En un futuro cercano, un grupo de astronautas emprende un viaje a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.",
      genero: "Ciencia ficción, Drama, Aventura",
      director: "Christopher Nolan",
      lanzamiento: 2014,
      calificacion: 8.6,
      portada:'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      fotosExtra: []
    },
    {
      id:8,
      titulo: "Interstellar",
      descripcion: "En un futuro cercano, un grupo de astronautas emprende un viaje a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.",
      genero: "Ciencia ficción, Drama, Aventura",
      director: "Christopher Nolan",
      lanzamiento: 2014,
      calificacion: 8.6,
      portada:'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      fotosExtra: []
    }
  ]

  //------------------------------------------------------------

  
  public filtro: string = ''; 
  public peliculas_filtradas = [...this.peliculas_data];

  filtrarPeliculas(event: Event) {
    const texto = (event.target as HTMLInputElement).value.toLowerCase();
    this.peliculas_filtradas = this.peliculas_data.filter(peli =>
      peli.titulo.toLowerCase().includes(texto)
    );
  }


  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ){
    this.actorForm = this.createActorForm();
  }

  
  ngOnInit():void{
    if(this.router.url.includes('add-')){
      this.actorMode = 'add';
      
      return;
    }
    //-------------------------------------------------
    //cambiar por un get con el id de la pelicula
    const actor = {
      nombre: "Robert Pattinson",
      nacimiento: "1986-05-13",
      biografia: "Robert Thomas Pattinson es un actor, productor y músico británico. Nació en Londres, Inglaterra, el 13 de mayo de 1986. Saltó a la fama mundial por su papel de Edward Cullen en la saga de películas 'Crepúsculo' (Twilight), basada en los libros de Stephenie Meyer. A lo largo de su carrera, ha trabajado en una variedad de géneros, desde dramas independientes hasta grandes producciones de Hollywood. Además de su carrera actoral, Pattinson ha demostrado ser un talentoso músico, y ha estado involucrado en varios proyectos musicales. Ha recibido numerosos premios por su talento y se ha consolidado como uno de los actores más versátiles de su generación.",
      fotoPrincipal: 'https://m.media-amazon.com/images/M/MV5BNzk0MDQ5OTUxMV5BMl5BanBnXkFtZTcwMDM5ODk5Mg@@._V1_FMjpg_UX1000_.jpg',
      fotosExtra: ["https://hips.hearstapps.com/hmg-prod/images/actor-robert-pattinson-attends-the-opening-ceremony-of-the-news-photo-1588147075.jpg",
                "https://m.media-amazon.com/images/M/MV5BNzk0MDQ5OTUxMV5BMl5BanBnXkFtZTcwMDM5ODk5Mg@@._V1_FMjpg_UX1000_.jpg",
                "https://hips.hearstapps.com/hmg-prod/images/actor-robert-pattinson-attends-the-opening-ceremony-of-the-news-photo-1588147075.jpg",
                "https://hips.hearstapps.com/hmg-prod/images/actor-robert-pattinson-attends-the-opening-ceremony-of-the-news-photo-1588147075.jpg",
                "https://hips.hearstapps.com/hmg-prod/images/actor-robert-pattinson-attends-the-opening-ceremony-of-the-news-photo-1588147075.jpg"
                  
              ],
      trabajos: this.peliculas_data
    };
    
    if(!this.router.url.includes('user')){
      this.actorMode = 'edit';
      this.setActorData(actor);
      
      return;
    }
    actor.fotosExtra = actor.fotosExtra.filter(foto => foto!= actor.fotoPrincipal);
    this.actor = actor;
  }
  addImg(urlImg:string){
    let fotos = this.actorForm.value.fotosExtra;
    fotos[0] === ''?fotos[0] = urlImg:fotos.push(urlImg);
    console.log(fotos);
    this.actorForm.patchValue({fotosExtra:fotos});
  }

  deleteImg(i:number){
    let fotos = this.actorForm.value.fotosExtra;
    fotos.splice(i,1);
    this.actorForm.patchValue({fotosExtra:fotos});
  }

  createActorForm(): FormGroup {
    return this.formBuilder.group({
      nombre:[this.actor.nombre, [Validators.required]],
      nacimiento:[this.actor.nacimiento, [Validators.required]],
      biografia:[this.actor.biografia, [Validators.required]],
      fotoPrincipal:[this.actor.fotoPrincipal],
      fotosExtra:[this.actor.fotosExtra],
      trabajos:[this.actor.trabajos]
    });
  }

  setActorData(actor:any):void{
    if(this.actorForm){
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

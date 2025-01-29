import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { Pelicula } from '../../interfaces/imdb.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie',
  imports: [MatCardModule, CommonModule, RouterModule, MatButtonModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule,
    MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {

  public movieMode: 'view' | 'edit' | 'add' = 'view';
  public movie : Pelicula = {
    id: 0,
    titulo: '',
    descripcion: '',
    genero: [],
    director: '',
    lanzamiento: 0,
    calificacion: 0,
    portada: '',
    fotosExtra: []
  }
  public actores_data = [
    {
      nombre: "Robert Pattinson",
      fecha_de_nacimiento: "1986-05-13",
      biografia: "Robert Thomas Pattinson es un actor, productor y músico británico. Nació en Londres, Inglaterra, el 13 de mayo de 1986. Saltó a la fama mundial por su papel de Edward Cullen en la saga de películas 'Crepúsculo' (Twilight), basada en los libros de Stephenie Meyer. A lo largo de su carrera, ha trabajado en una variedad de géneros, desde dramas independientes hasta grandes producciones de Hollywood. Además de su carrera actoral, Pattinson ha demostrado ser un talentoso músico, y ha estado involucrado en varios proyectos musicales. Ha recibido numerosos premios por su talento y se ha consolidado como uno de los actores más versátiles de su generación."
    },
    {
      nombre: "Leonardo DiCaprio",
      fecha_de_nacimiento: "1974-11-11",
      biografia: "Leonardo Wilhelm DiCaprio es un actor y productor estadounidense. Nació el 11 de noviembre de 1974 en Los Ángeles, California. DiCaprio comenzó su carrera en televisión antes de convertirse en una estrella de cine. Es conocido por sus papeles en películas como 'Titanic', 'Inception', 'The Revenant', y 'The Wolf of Wall Street'. A lo largo de su carrera, ha sido nominado a varios premios, incluyendo múltiples nominaciones al Óscar. Finalmente, en 2016, ganó el Premio de la Academia a Mejor Actor por su interpretación en 'The Revenant'."
    },
    {
      nombre: "Scarlett Johansson",
      fecha_de_nacimiento: "1984-11-22",
      biografia: "Scarlett Ingrid Johansson es una actriz y cantante estadounidense nacida el 22 de noviembre de 1984 en Nueva York. Es conocida por su papel como la Viuda Negra en el Universo Cinematográfico de Marvel, pero ha tenido una carrera exitosa en una variedad de géneros cinematográficos, incluyendo dramas como 'Lost in Translation' y 'Marriage Story'. Ha sido nominada a varios premios importantes, incluyendo los Globos de Oro y los Premios Óscar, consolidándose como una de las actrices más taquilleras de la historia del cine."
    },
    {
      nombre: "Dwayne Johnson",
      fecha_de_nacimiento: "1972-05-02",
      biografia: "Dwayne Douglas Johnson, conocido profesionalmente como The Rock, es un actor, productor y exluchador profesional estadounidense. Nació el 2 de mayo de 1972 en Hayward, California. Empezó su carrera en la lucha libre profesional antes de hacer la transición al cine, donde ha protagonizado grandes franquicias como 'Fast & Furious', 'Jumanji', y 'The Scorpion King'. Además de su exitosa carrera actoral, Johnson también es un empresario y ha sido nombrado una de las personas más influyentes del mundo por la revista Time."
    },
    {
      nombre: "Meryl Streep",
      fecha_de_nacimiento: "1949-06-22",
      biografia: "Mary Louise Streep, conocida como Meryl Streep, es una actriz estadounidense nacida el 22 de junio de 1949 en Summit, Nueva Jersey. Considerada una de las mejores actrices de su generación, Streep ha sido nominada en 21 ocasiones al Premio Óscar, más que cualquier otro actor o actriz en la historia. A lo largo de su carrera, ha trabajado en una amplia gama de géneros, desde dramas como 'Kramer vs. Kramer' hasta comedias musicales como 'Mamma Mia!'. Ha ganado múltiples premios, incluidos tres Premios Óscar, y es conocida por su capacidad para interpretar una gran diversidad de personajes."
    }
  ]
  
  public movieGenders = new FormControl(['']);
  public reparto = new FormControl(['']);
  public generos = ['Acción', 'Crimen', 'Drama', 'Terror'];

  public filtro: string = ''; 
  public actores_filtrados = [...this.actores_data];

  filtrarActores(event: Event) {
    const texto = (event.target as HTMLInputElement).value.toLowerCase();
    this.actores_filtrados = this.actores_data.filter(actor =>
      actor.nombre.toLowerCase().includes(texto)
    );
  }


  constructor(
    private router: Router
  ){}

  ngOnInit():void{
    if(!this.router.url.includes('user')){
      if(this.router.url.includes('add')){
        this.movieMode = 'add';
        return;
      }
      this.movieMode = 'edit';
      this.movie = {
        id: 1,
        titulo: "The Dark Knight",
        descripcion: "Batman se enfrenta al Joker, un criminal psicópata cuyo objetivo es sumergir a Gotham City en el caos.",
        genero: ['Acción', 'Crimen', 'Drama'],
        director: "Christopher Nolan",
        lanzamiento: 2008,
        calificacion: 9.0,
        portada: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
        fotosExtra: ['https://m.media-amazon.com/images/M/MV5BMjIzMGU0MDQtNDcyOS00MmEyLTg3MWMtODE4YWI1ZGZlMTllXkEyXkFqcGc@._V1_.jpg',
          'https://m.media-amazon.com/images/M/MV5BMjIzMGU0MDQtNDcyOS00MmEyLTg3MWMtODE4YWI1ZGZlMTllXkEyXkFqcGc@._V1_.jpg'
          ]

      };
      this.movieGenders.setValue(this.movie.genero);
    }
  }
  
}

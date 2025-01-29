import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Pelicula } from '../../../shared/interfaces/imdb.interface';
import { MovieCardComponent } from "../movie-card/movie-card.component";

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  public peliculas: Pelicula[] = [
    {
      id: 1,
      titulo: "Interstellar",
      descripcion: "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de salvar a la humanidad.",
      genero: ["Ciencia ficción", "Drama", "Aventura"],
      director: "Christopher Nolan",
      lanzamiento: 2014,
      calificacion: 8.6,
      portada: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      fotosExtra: [
        "https://image.tmdb.org/t/p/w500/jlQJDD0L5ZojjlS0KYnApdO0n19.jpg",
        "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
      ]
    },
    {
      id: 2,
      titulo: "Inception",
      descripcion: "Un ladrón que roba secretos corporativos a través del uso de la tecnología de sueños recibe la tarea inversa: implantar una idea en la mente de un CEO.",
      genero: ["Acción", "Ciencia ficción", "Aventura"],
      director: "Christopher Nolan",
      lanzamiento: 2010,
      calificacion: 8.8,
      portada: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      fotosExtra: [
        "https://image.tmdb.org/t/p/w500/s2bT29y0ngXxxu2IA8AOzzXTRhd.jpg",
        "https://image.tmdb.org/t/p/w500/5N20rQURev5CNDcMjHVUZhpoCNC.jpg"
      ]
    },
    {
      id: 3,
      titulo: "The Matrix",
      descripcion: "Un hacker descubre la impactante verdad sobre su mundo y su papel en la guerra contra sus controladores.",
      genero: ["Acción", "Ciencia ficción"],
      director: "Lana Wachowski, Lilly Wachowski",
      lanzamiento: 1999,
      calificacion: 8.7,
      portada: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      fotosExtra: [
        "https://image.tmdb.org/t/p/w500/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg",
        "https://image.tmdb.org/t/p/w500/hEpWvX6Bp79eLxY1kX5ZZJcme5U.jpg"
      ]
    },
    {
      id: 4,
      titulo: "The Dark Knight",
      descripcion: "Batman debe enfrentarse a su mayor enemigo, el Joker, quien desata el caos en Gotham City.",
      genero: ["Acción", "Crimen", "Drama"],
      director: "Christopher Nolan",
      lanzamiento: 2008,
      calificacion: 9.0,
      portada: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      fotosExtra: [
        "https://image.tmdb.org/t/p/w500/hUzeosd33nzE5MCNsZxCGEKTXaQ.jpg",
        "https://image.tmdb.org/t/p/w500/xKb6mtdfI5Qsggc44Hr9CCUDvaj.jpg"
      ]
    },
    {
      id: 5,
      titulo: "Avatar",
      descripcion: "Un ex-marine se encuentra en medio de una guerra entre los humanos y los habitantes de Pandora, los Na'vi.",
      genero: ["Ciencia ficción", "Aventura", "Acción"],
      director: "James Cameron",
      lanzamiento: 2009,
      calificacion: 7.9,
      portada: "https://image.tmdb.org/t/p/w500/kmcqlZGaSh20zpTbuoF0Cdn07dT.jpg",
      fotosExtra: [
        "https://image.tmdb.org/t/p/w500/2iX9kcs2Wg4F7JxuQiEwHuzjSHK.jpg",
        "https://image.tmdb.org/t/p/w500/oEswPC8L6cK1K13a1cUdjmMFDcB.jpg"
      ]
    },
    {
      id: 6,
      titulo: "Pulp Fiction",
      descripcion: "Las vidas de dos matones, un boxeador, la esposa de un mafioso y un par de asaltantes se entrelazan en una serie de historias criminales.",
      genero: ["Crimen", "Drama"],
      director: "Quentin Tarantino",
      lanzamiento: 1994,
      calificacion: 8.9,
      portada: "https://image.tmdb.org/t/p/w500/tbHDWqzG8vbjRkqEwb9fOjHqAL7.jpg",
      fotosExtra: [
        "https://image.tmdb.org/t/p/w500/8WFoNKkt8sBMJm9e5ZiZ0bHksy2.jpg",
        "https://image.tmdb.org/t/p/w500/1CpHfcOwXq2WMB8TjA5cfiYo3nU.jpg"
      ]
    },
    {
      id: 7,
      titulo: "Gladiator",
      descripcion: "Un general romano traicionado busca venganza contra el corrupto emperador que asesinó a su familia y lo desterró como esclavo.",
      genero: ["Acción", "Aventura", "Drama"],
      director: "Ridley Scott",
      lanzamiento: 2000,
      calificacion: 8.5,
      portada: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
      fotosExtra: [
        "https://image.tmdb.org/t/p/w500/eIi3klFf7mp3oL5EEF4mLIDs26r.jpg",
        "https://image.tmdb.org/t/p/w500/p5B8W9zmpVfiXjOa5pD9S9vW6Pc.jpg"
      ]
    },
    {
      id: 8,
      titulo: "Forrest Gump",
      descripcion: "La vida de un hombre con un coeficiente intelectual bajo que, sin embargo, presencia y participa en eventos históricos clave en EE.UU.",
      genero: ["Drama", "Romance"],
      director: "Robert Zemeckis",
      lanzamiento: 1994,
      calificacion: 8.8,
      portada: "https://image.tmdb.org/t/p/w500/yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg",
      fotosExtra: [
        "https://image.tmdb.org/t/p/w500/wxvBq9UCOd9NJ8tPBo5S7UqXwOB.jpg",
        "https://image.tmdb.org/t/p/w500/vWoj8W1asvxMZZ7X24vhNz1fkHM.jpg"
      ]
    },
    {
      id: 9,
      titulo: "The Shawshank Redemption",
      descripcion: "Un hombre inocente condenado a cadena perpetua por el asesinato de su esposa encuentra la esperanza y la redención en prisión.",
      genero: ["Drama", "Crimen"],
      director: "Frank Darabont",
      lanzamiento: 1994,
      calificacion: 9.3,
      portada: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      fotosExtra: [
        "https://image.tmdb.org/t/p/w500/f7DImXDebOs148U4uPjI61iDvaK.jpg",
        "https://image.tmdb.org/t/p/w500/mAkADQEWqtSVvRoiB39rPbrD80s.jpg"
      ]
    }
    
  ];
  
  

  constructor(
    // private apiService: ApiService
  ){}

  // TODO: ngOnInit de peliculas
  // ngOnInit(): void {
  //   this.HeroeService.getHeroes()
  //   .subscribe(heroes  => this.heroes = heroes);
  // }
}

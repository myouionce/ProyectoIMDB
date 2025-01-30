import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Pelicula, Actor } from '../../../shared/interfaces/imdb.interface';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { ActivatedRoute } from '@angular/router';
import { ActorCardComponent } from "../actor-card/actor-card.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-data-list',
  imports: [CommonModule, MovieCardComponent, ActorCardComponent, MatButtonModule, MatIconModule],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.scss'
})
export class DataListComponent {
  public dataType: boolean = false;
  public data: any[] = [];

  
  constructor(
    // private apiService: ApiService
    private route: ActivatedRoute
  ){}

  // TODO: ngOnInit de peliculas
  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      const path = urlSegments.map(segment => segment.path).join('/');

      if (path.includes('actorlist')) {
        this.fillActorList();
        this.dataType = true;
      } else if (path.includes('movielist')) {
        this.fillMovieList();
        this.dataType = false;
      }
    });


    // this.HeroeService.getHeroes()
    // .subscribe(heroes  => this.heroes = heroes);
  }

  fillActorList(): void {
    // Lógica para llenar el arreglo con actores
    this.data = [
      {
        "_id": { "$oid": "679a961166f5deedc3a79456" },
        "nombre": "Arnold Schwarzenegger",
        "nacimiento": "30-07-1947",
        "biografia": "Arnold Schwarzenegger (nacido el 30 de julio de 1947 en Thal, Austria) es un actor, empresario y exfisicoculturista profesional...",
        "fotoPrincipal": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg/320px-Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg",
        "fotosExtra": [
          "https://cdn.britannica.com/11/222411-050-D3D66895/American-politician-actor-athlete-Arnold-Schwarzenegger-2016.jpg",
          "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2024/03/26/17114431722376.jpg"
        ]
      },
      {
        "_id": { "$oid": "679a961166f5deedc3a79457" },
        "nombre": "Leonardo DiCaprio",
        "nacimiento": "11-11-1974",
        "biografia": "Leonardo DiCaprio es un actor y productor estadounidense conocido por películas como Titanic, El Lobo de Wall Street e Inception...",
        "fotoPrincipal": "data:image/webp;base64,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",
        "fotosExtra": [
          "https://static.dw.com/image/64703017_605.jpg",
          "https://media.gq.com.mx/photos/62a9a49e1b91bd85b064a00a/16:9/w_2560%2Cc_limit/GettyImages-1410375580.jpg"
        ]
      },
      {
        "_id": { "$oid": "679a961166f5deedc3a79458" },
        "nombre": "Scarlett Johansson",
        "nacimiento": "22-11-1984",
        "biografia": "Scarlett Johansson es una actriz estadounidense conocida por su papel de Black Widow en el UCM y películas como Lost in Translation...",
        "fotoPrincipal": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Scarlett_Johansson_C%C3%A9sar_2014_3.jpg/320px-Scarlett_Johansson_C%C3%A9sar_2014_3.jpg",
        "fotosExtra": [
          "https://hips.hearstapps.com/hmg-prod/images/scarlett-johansson-1568129185.jpg",
          "https://static.independent.co.uk/2021/04/07/17/GettyImages-1153124042.jpg"
        ]
      },
      {
        "_id": { "$oid": "679a961166f5deedc3a79459" },
        "nombre": "Tom Hanks",
        "nacimiento": "09-07-1956",
        "biografia": "Tom Hanks es un actor estadounidense icónico, conocido por sus actuaciones en Forrest Gump, Náufrago y Rescatando al Soldado Ryan...",
        "fotoPrincipal": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Tom_Hanks_2016.jpg/320px-Tom_Hanks_2016.jpg",
        "fotosExtra": [
          "https://media.gq.com/photos/5e9e3d6a91e0730008557a45/master/pass/Tom-Hanks-GQ-2020-04.jpg",
          "https://static01.nyt.com/images/2022/06/09/multimedia/09xp-hanks/09xp-hanks-videoSixteenByNineJumbo1600.jpg"
        ]
      },
      {
        "_id": { "$oid": "679a961166f5deedc3a79460" },
        "nombre": "Meryl Streep",
        "nacimiento": "22-06-1949",
        "biografia": "Meryl Streep es considerada una de las mejores actrices de todos los tiempos, con películas como El Diablo Viste de Prada y Kramer vs. Kramer...",
        "fotoPrincipal": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Meryl_Streep_Berlinale_2016.jpg/320px-Meryl_Streep_Berlinale_2016.jpg",
        "fotosExtra": [
          "https://static.onecms.io/wp-content/uploads/sites/6/2021/06/02/Meryl-Streep-1.jpg",
          "https://images.clarin.com/2023/07/06/meryl-streep-cumple-74-anos___EYZTO6Mfo_1200x630__1.jpg"
        ]
      },
      {
        "_id": { "$oid": "679a961166f5deedc3a79461" },
        "nombre": "Robert Downey Jr.",
        "nacimiento": "04-04-1965",
        "biografia": "Robert Downey Jr. es un actor estadounidense famoso por su interpretación de Iron Man en el UCM y su actuación en Sherlock Holmes...",
        "fotoPrincipal": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Robert_Downey_Jr._2014_Comic_Con_%28cropped%29.jpg/320px-Robert_Downey_Jr._2014_Comic_Con_%28cropped%29.jpg",
        "fotosExtra": [
          "https://media.revistagq.com/photos/5f60e61c96451fc6a5d86ad7/16:9/w_2560%2Cc_limit/GettyImages-906665630.jpg",
          "https://media.gq.com.mx/photos/648ef841e498cc2abdb993de/16:9/w_2560%2Cc_limit/GettyImages-1464647316.jpg"
        ]
      },
      {
        "_id": { "$oid": "679a961166f5deedc3a79462" },
        "nombre": "Natalie Portman",
        "nacimiento": "09-06-1981",
        "biografia": "Natalie Portman es una actriz ganadora del Oscar, conocida por su papel en El Cisne Negro y como Padmé Amidala en Star Wars...",
        "fotoPrincipal": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Natalie_Portman_Cannes_2015_5.jpg/320px-Natalie_Portman_Cannes_2015_5.jpg",
        "fotosExtra": [
          "https://www.biography.com/.image/t_share/MTgwMTk0Mzg2NDczNDIwMzEy/natalie-portman-photo-by-dave-j-hogan_getty-images-entertainment_getty-images.jpg",
          "https://www.eluniversal.com.mx/resizer/xpDTdEnoJH5m8E8NckOX7NEGLA4=/1100x666/cloudfront-us-east-1.images.arcpublishing.com/eluniversal/G3VCMIBFQBA3ZN3E4VJHAFDX2M.jpg"
        ]
      }
    ];    
  }

  fillMovieList(): void {
    // Lógica para llenar el arreglo con películas
    this.data = [
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
  }
  currentPage = 1;
  itemsPerPage = 12;
  get paginatedData(){
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.data.slice(start, end);
  }
  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }
  
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  
}

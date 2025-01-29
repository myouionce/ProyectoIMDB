export interface Pelicula {
  id:           number;
  titulo:       string;
  descripcion:  string;
  genero:       string[];
  director:     string;
  lanzamiento:  number;
  calificacion: number;
  portada:      string;
  fotosExtra:   string[];
}
export interface ActoresXpelicula {
  idPelicula: string;
  idActor:    string;
}
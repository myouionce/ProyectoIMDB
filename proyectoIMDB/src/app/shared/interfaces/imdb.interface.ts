export interface Pelicula {
  _id:           string;
  titulo:       string;
  descripcion:  string;
  genero:       string[];
  director:     string;
  lanzamiento:  string;
  calificacion: number;
  portada:      string;
  fotosExtra:   string[];
}

export interface ActoresXpelicula {
  idPelicula: string;
  idActor:    string;
}

export interface Actor {
  _id:           ID;
  nombre:        string;
  nacimiento:    string;
  biografia:     string;
  fotoPrincipal: string;
  fotosExtra:    string[];
}

export interface ID {
  $oid: string;
}

export interface User {
  name:       string;
  correo:     string;
  contrasena: string;
}

export interface AuthResponse {
  message: string;
  flag: boolean;
  rol?: number;
}
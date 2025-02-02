import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/imdb.interface';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.baseUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  // api.get('/auth/:email/:password',UserController.ValidateUser);//Ruta para autentificar usuario
  authUser(correo: string, pass: string):Observable<AuthResponse | undefined>{
    return this.httpClient.get<AuthResponse>(`${this.url}/auth/${correo}/${pass}`)
    .pipe(
      catchError(err => {
        if (err.status === 401) {
          console.log('Credenciales inválidas, por favor intente nuevamente');
        } else {
          console.error('Error en la autenticación:', err.message);
        }
        // Retornamos un valor por defecto para continuar el flujo
        return of(undefined);
      })
    );
  }

  // api.post('/saveAdmin',UserController.createAdmin);// Ruta para crear un administrador
  // api.post('/saveUser', UserController.createUser); // Ruta para crear un usuario
  saveUser(usuario:User):Observable<User | undefined>{
    return this.httpClient.post<User>(`${this.url}/saveUser`,usuario)
      .pipe(
      catchError(err => {
        if (err.status === 400) {
          console.log('El usuario ya existe');
        } else {
          console.error('Error desconocido:', err.message);
        }
        // Retornamos un valor por defecto para continuar el flujo
        return of(undefined);
      })
    );
  }
}

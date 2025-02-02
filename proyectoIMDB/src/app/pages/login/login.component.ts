import { User } from './../../shared/interfaces/imdb.interface';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatIconModule,
    MatCardModule,FormsModule, 
    MatFormFieldModule, MatInputModule, 
    MatSelectModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userForm!: FormGroup;


  constructor(private formBd: FormBuilder, private router: Router, private userService: UserService) {
    this.userForm = this.formBd.group({
      correo: ['cherrymotion@gmail.com', [Validators.required, Validators.email]],
      contrasena: ['pass123', Validators.required]
    });
  }
  texto: string = '';
  submit() {
    if (this.userForm.valid) {
      const { correo, contrasena } = this.userForm.value; 
      this.userService.authUser(correo, contrasena).subscribe(response => {
        if(response){
          if (response.rol === 1) { // Si rol es 1, redirigir a admin
            this.router.navigate(['/admin']);
          } else { // Si no es admin, redirigir a user
            this.router.navigate(['/user']);
          }
        }
        else{
          this.texto = 'Credenciales inválidas, por favor intente nuevamente';
        }
      });
    }
  }
  

}

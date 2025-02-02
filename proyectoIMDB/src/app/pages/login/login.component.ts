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


  constructor(private formBd: FormBuilder, private router: Router) {
    this.userForm = this.formBd.group({
      // TODO: LIMPIAR INFO
      correo: ['shaOrtiz123@gmail.com', [Validators.required, Validators.email]],
      contrasena: ['88088088', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      console.log('Usuario:', user);
      // Aquí podrías llamar a un servicio para enviar los datos al backend.
      this.router.navigate(['/admin']);
    }
  }

}

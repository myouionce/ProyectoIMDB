import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';
import { User } from '../../shared/interfaces/imdb.interface';

@Component({
  selector: 'app-sign',
  imports: [MatButtonModule, MatIconModule,
      MatCardModule,FormsModule, 
      MatFormFieldModule, MatInputModule, 
      MatSelectModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.scss'
})
export class SignComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signInForm = this.fb.group({
      // TODO: LIMPIAR INFO ''
      name: ['Sharon', Validators.required],
      correo: ['usuarioshaOrtiz123@gmail.com', [Validators.required, Validators.email]],
      contrasena: ['pass', Validators.required]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const user: User = this.signInForm.value;
      console.log('Usuario:', user);
      // Aquí podrías llamar a un servicio para enviar los datos al backend.
      this.router.navigate(['/user']);
    }
  }
}

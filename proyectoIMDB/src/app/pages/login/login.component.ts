import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  public user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contactMethod: '',
    mensaje: ''
  };

  constructor(private formBd: FormBuilder) {
    this.userForm = this.formBd.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, [Validators.required]],
      contactMethod: [this.user.contactMethod],
      mensaje: [this.user.mensaje]
    });
  }

  ngOnInit(): void {
    const user = {
      firstName: 'Sharon',
      lastName: 'Ortiz',
      email: 'shaOrtiz123@gmail.com',
      phone: '88088088',
      contactMethod: 'email',
      mensaje: 'Soy Sharon de Prueba'
    };
    this.setUserForm(user);
  }

  setUserForm(userData: any): void {
    this.userForm.setValue({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      contactMethod: userData.contactMethod || '',
      mensaje: userData.mensaje || ''
    });
  }

}

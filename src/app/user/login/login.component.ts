import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  constructor(public FormBuilder:FormBuilder) {}
  form=this.FormBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
})
}

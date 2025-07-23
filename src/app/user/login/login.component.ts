import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  constructor(public FormBuilder:FormBuilder) {}
  isSubmitted: boolean = false;
  form=this.FormBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
})
  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched)|| Boolean(control?.dirty))
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      console.log(this.form.value);
      // Here you would typically handle the login logic, e.g., call a service to authenticate the user
    }
  }
}

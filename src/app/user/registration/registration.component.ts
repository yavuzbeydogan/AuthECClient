import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styles: ``
})
export class RegistrationComponent {
  constructor(public formBuilder: FormBuilder) {}
    form = this.formBuilder.group({
    fullName: [''],
    email: [''],
    password: [''],
    confirmPassword: [''],
  });
  onSubmit() {
  console.log(this.form.value);}
}


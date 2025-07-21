import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styles: ``
})
export class RegistrationComponent {
  constructor(public formBuilder: FormBuilder) {}
  isSubmitted :boolean = false;

    passwordMatchValidator:ValidatorFn=(control:AbstractControl):null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      if (password && confirmPassword && password.value !== confirmPassword.value) 
        confirmPassword?.setErrors({ passwordMismatch: true })
      else 
      confirmPassword?.setErrors(null)
      return null;
    }
    form = this.formBuilder.group({
    fullName: ['',Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')]],
    confirmPassword: [''],
  }, {Validators: this.passwordMatchValidator}
);
  onSubmit() {
  console.log(this.form.value);
  this.isSubmitted = true;
}
  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid)&&(this.isSubmitted || Boolean(control?.touched));
}
}
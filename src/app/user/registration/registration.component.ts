import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FirstKeyPipe } from '../../shared/pipes/first-key.pipe';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe, RouterLink],
  templateUrl: './registration.component.html',
  styles: ``
})
export class RegistrationComponent implements OnInit{
  constructor(public formBuilder: FormBuilder,
  private service: AuthService,
  private toastr:ToastrService,
  private router:Router) { }
  isSubmitted: boolean = false;
  ngOnInit(): void {
    if(this.service.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')

    if (password && confirmPassword && password.value != confirmPassword.value)
      confirmPassword?.setErrors({ passwordMismatch: true })
    else
      confirmPassword?.setErrors(null)

    return null;
  }

  form = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)]],
    confirmPassword: [''],
  }, { validators: this.passwordMatchValidator })



  onSubmit(){
    console.log("magur");
    console.log('form:', this.form.value);
    this.isSubmitted = true;
    if(this.form.valid){
      this.service.createUser(this.form.value)
      .subscribe({
        next:(res:any)=>{
          if(res.succeeded){
            this.form.reset();
            this.isSubmitted = false;
            this.toastr.success('New user created!', 'Success');
          }
          else 
          console.log('response:', res);
        },
        error:err=>console.log('error',err)
      });
    }
  }
  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched)|| Boolean(control?.dirty))
  }

}
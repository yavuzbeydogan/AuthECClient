import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  constructor(public FormBuilder:FormBuilder, 
  private service:AuthService,
  private router:Router,
  private toastr:ToastrService) {}
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
      this.service.signin(this.form.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/dashboard');
    },
        error: (err: any) => {
          if (err.status == 400) 
            this.toastr.error('Invalid email or password', 'Login Failed')
          else
            console.log('error during login: \n');
         
        }
    
    })
  }
}
}
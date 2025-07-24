import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {
  constructor(private router: Router) {}

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/signin');
  }
}

import { Component } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RegistrationComponent],
  templateUrl: './user.component.html',
  styles: ``
})
export class UserComponent {

}

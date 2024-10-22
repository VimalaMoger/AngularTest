import { Component, OnInit } from '@angular/core';
import { AuthService } from '../mock-auth-service/mock-auth-service.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private auth: AuthService ){}
  needsLogin(){
    return ! this.auth.isAuthenticated();
  }
}

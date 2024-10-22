import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-mock-auth-service',
  standalone: true,
  imports: [],
  templateUrl: './mock-auth-service.component.html',
  styleUrl: './mock-auth-service.component.css',
})
export class MockAuthServiceComponent {
}

@Injectable({ providedIn: 'root' })
export class AuthService{
  authenticated = false;
  isAuthenticated():boolean{
    return this.authenticated;
  } 
}


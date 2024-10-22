import { Component } from '@angular/core';

export class AuthServiceDI{
  authenticated = false;
  isAuthenticated():boolean{
    return this.authenticated;
  } 
}

@Component({
  selector: 'app-dep-injection',
  standalone: true,
  imports: [],
  templateUrl: './dep-injection.component.html',
  styleUrl: './dep-injection.component.css'
})
export class DepInjectionComponent extends AuthServiceDI {
  override isAuthenticated() {
    return false;
  }

}



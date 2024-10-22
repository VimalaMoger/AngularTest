import { Component, EventEmitter, Input, Output } from '@angular/core';


//creating a User class
export class User {
  constructor(public email: string, public password: string) {
  }
}

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  @Output() loggedIn = new EventEmitter<User>();  //output event, exposes Observable
  @Input() enabled = true;   //we can change the input property on our component
  
  login(email: string,password: string){
    console.log('login ${email} ${password}');
    if(email && password){
      console.log('Emitting');
      this.loggedIn.emit(new User(email,password));//emits a domain model on the output event

    }
  }

}
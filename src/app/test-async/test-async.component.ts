import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-async',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-async.component.html',
  styleUrl: './test-async.component.css'
})
export class TestAsyncComponent implements OnInit{

  needsLogin:boolean=true;
  constructor(private auth: AuthServiceAsync){}

  //call lifecycle hook ngOnInit(), in test environment
  ngOnInit(): void {
    this.auth.isAuthenticated().then(() =>{
      this.needsLogin = !this.auth.isAuthenticated();
    })
  }
}

export class AuthServiceAsync{
  isAuthenticated(): Promise<boolean>{
    return Promise.resolve(false);
  }
}

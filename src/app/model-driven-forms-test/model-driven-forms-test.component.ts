import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../test/test.component';

@Component({
  selector: 'app-model-driven-forms-test',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './model-driven-forms-test.component.html',
  styleUrl: './model-driven-forms-test.component.css'
})
export class ModelDrivenFormsTestComponent {
  @Output() loggedIn = new EventEmitter<User>();
  //we associate template form element with the model form on our componnet
  form: FormGroup |any;

  constructor(private fb: FormBuilder) {
  }
//initialize form with ngOnIt lifecycle hook
  ngOnInit() { 
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)]],
    });
  }
//when user submits the form, we call the login() function
  login() {
    console.log(`Login ${this.form.value}`);
    if (this.form.valid) {
      this.loggedIn.emit(
          new User(
              this.form.value.email,
              this.form.value.password
          )
      );
    }
  }

}

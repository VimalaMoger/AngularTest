import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDrivenFormsTestComponent } from './model-driven-forms-test.component';
import { User } from '../test/test.component';

describe('ModelDrivenFormsTestComponent', () => {
  let user: User;
  let component: ModelDrivenFormsTestComponent;
  let fixture: ComponentFixture<ModelDrivenFormsTestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      declarations:[]
    });
   
    
    fixture = TestBed.createComponent(ModelDrivenFormsTestComponent);
    component = fixture.componentInstance;
    //manually trigger the ngOnIt lifecycle function on our component, angular wont call this for us
    component.ngOnInit();

  });

  //check blank form is invalid, check the valid property on the form model itself
  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  //check individual fields are valid by referencing to the actual field  form the form.controls property
  it('email field validity', () => {
    let email = component.form.controls['email']; 
    expect(email.valid).toBeFalsy(); 
  });

  //check to see if email field is invalid
  it('email field validity', () => {
     let errors:any = {};
      let em = component.form.controls['email'];
      errors = em.errors || {};
      expect(errors['required']).toBeTruthy(); 
      
      const email = component.form.controls.email;
      expect(email.valid).toBeFalsy();         
      
      // Set email to something
      email.setValue("test");
     
      // Set email to something correct
      email.setValue("test@example.com");
      errors = email.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['pattern']).toBeFalsy();   
      expect(email.valid).toBeTruthy(); 

  });

  it('password field validity', () => {
    let errors : any= {};
    let password = component.form.controls['password'];

    // password field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set password to incorrect value
    password.setValue("123456");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    //set password to correct value
    password.setValue("123456789");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

  it('submitting a form emits a user', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['email'].setValue("test@test.com");
    component.form.controls['password'].setValue("123456789");
    expect(component.form.valid).toBeTruthy();

    // Subscribe to the Observable and store the user in a local variable.
    component.loggedIn.subscribe((value) => user = value);

    // Trigger the login function
    component.login();

    // Now we can check to make sure the emitted value is correct
    expect(user.email).toBe("test@test.com");
    expect(user.password).toBe("123456789");
    });

});

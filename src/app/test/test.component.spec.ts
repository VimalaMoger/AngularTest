import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestComponent, User } from './test.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TestComponent', () => {
  let user: User;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let submitEl: DebugElement;
  let emailEl: DebugElement;
  let passwordEl: DebugElement;

  beforeEach(() => {
   
    TestBed.configureTestingModule({
      declarations: []
    });

    // create component and test fixture
    fixture = TestBed.createComponent(TestComponent);

    // get Test Component instance from the fixture
    component = fixture.componentInstance;

    submitEl = fixture.debugElement.query(By.css('button'));
    emailEl = fixture.debugElement.query(By.css('input[type=email]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
  });
  it('Setting enabled to false disables the submit button', () => {
    component.enabled = false;  //test within component
    fixture.detectChanges();  //call this, to trigger change detection and update the view
    expect(submitEl.nativeElement.disabled).toBeTruthy();
  });

  it('Entering email and password emits loggedIn event', () => {
  //test from the view
    emailEl.nativeElement.value ="test@example.com";
    passwordEl.nativeElement.value = "123456";
    //test the output property by subscribing to an EventEmitter
    component.loggedIn.subscribe((value) =>{ user = value}); //synchronously emits user object in subscribe callback
    submitEl.triggerEventHandler('click', null);
    expect(user.email).toBe("test@example.com");
    expect(user.password).toBe("123456");
  });
});
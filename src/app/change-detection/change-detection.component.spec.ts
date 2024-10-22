import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionComponent } from './change-detection.component';
import { DebugElement } from '@angular/core';
import { AuthService } from '../mock-auth-service/mock-auth-service.component';
import { By } from '@angular/platform-browser';

/* Test whether changes in the state of our application trigger changes in the view
ATB and fixtures helps inspect the component’s view through fixture.debugElement and trigger a change detection run by calling fixture.detectChanges() */

describe('ChangeDetectionComponent', () => {

  let component: ChangeDetectionComponent;
  let fixture: ComponentFixture<ChangeDetectionComponent>;
  let authService: AuthService;
  let el: DebugElement; 

  beforeEach(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [],
      providers: [AuthService]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(ChangeDetectionComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    // UserService provided to the TestBed
    authService = TestBed.inject(AuthService);

    //  get the "a" element by CSS selector (e.g., by class name)
    el = fixture.debugElement.query(By.css('a')); 
  });
    it('login button hiddern when user authenticated',() => {
      expect(el.nativeElement.textContent.trim()).toBe('');
      fixture.detectChanges(); //trigger change detection run Angular  checks property bindings
      //authService defaults to not authenticated, so we show the text Login

      expect(el.nativeElement.textContent.trim()).toBe('Login');
      spyOn(authService, 'isAuthenticated').and.returnValue(true);//returns authenticated

      fixture.detectChanges();//triggered a second change detection
      expect(el.nativeElement.textContent.trim()).toBe('Logout');//should show Logout text
    
  });
});


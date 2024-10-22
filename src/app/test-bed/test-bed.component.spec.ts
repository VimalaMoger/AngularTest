import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../mock-auth-service/mock-auth-service.component';

describe('AngulartestUsingTestbedComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service : AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[],
      providers:[AuthService]  //dependency injection
    });
    //create component and test fixture
    fixture = TestBed.createComponent(LoginComponent); //fixture is a wrapper for a component and its template
    //get test component from the fixture
    component = fixture.componentInstance;  //find the component from the componentInstance on the fixture
    service = TestBed.inject(AuthService); //resolving the dependency using inject function
  });

  it('needsLogin returns true when the user has not been authenticated', () => {  
    spyOn(service,'isAuthenticated').and.returnValue(false);    
    expect(component.needsLogin()).toBeTruthy();
  });
  
  it('needsLogin returns false when the user has been authenticated', () => {           
    spyOn(service,'isAuthenticated').and.returnValue(true);  
    expect(component.needsLogin()).toBeFalsy();
  });
});

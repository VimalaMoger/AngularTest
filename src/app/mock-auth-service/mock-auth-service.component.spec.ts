import { AuthService } from './mock-auth-service.component';
import { LoginComponent } from '../login/login.component';
import { TestBed } from '@angular/core/testing';

describe('MockAuthServiceComponent', () => {
  let login: LoginComponent;
  let service : AuthService ;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthService, LoginComponent],
      providers: [AuthService
        //LoginComponent
        //{ provide: MockAuthServiceComponent, useValue: LoginComponent } // provide the mock service
      ],
    }).compileComponents();
    service = new AuthService();
    login = new LoginComponent(service);
  });

  afterEach(() => {
    login = null as any;
    service = null as any;
  })

  it('needsLogin returns true when the user has not been authenticated', () => {
    service.authenticated = false;
    expect(login.needsLogin()).toBeTruthy();
    expect(login.needsLogin()).toEqual(true);
   
  });
  it('needsLogin returns false when the user has been authenticated', () => { 
    service.authenticated = true;
    expect(login.needsLogin()).toBeFalsy();
    expect(login.needsLogin()).toEqual(false);
  });
});

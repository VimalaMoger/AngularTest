import { LoginComponent } from "../login/login.component";
import { AuthService } from "../mock-auth-service/mock-auth-service.component";


describe('SpyOnRealObject', () => {
  let login: LoginComponent;
  let service : AuthService ;
  let spy: any;
  let spyLogin :any;

  beforeEach(async () => {
    service = new AuthService();
    login= new LoginComponent(service);
   
    });
  afterEach(() => {
    login= null as any;
    service= null as any;
  })

  it('needsLogin returns true when the user has not been authenticated', () => {  
    spy = spyOn(service,'isAuthenticated').and.returnValue(false);  
    expect(login.needsLogin()).toBeTruthy();
    expect(login.needsLogin()).toEqual(true)
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(2);
    spyLogin = spyOn(login, 'needsLogin').and.returnValue(true);
    expect(spyLogin).not.toHaveBeenCalled();
    expect(spyLogin).toHaveBeenCalledTimes(0);
  });
  
  it('needsLogin returns false when the user has been authenticated', () => {           
    spyOn(service,'isAuthenticated').and.returnValue(true);  
    expect(login.needsLogin()).toBeFalsy();
  });

});


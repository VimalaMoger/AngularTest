import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { AuthServiceDI, DepInjectionComponent } from './dep-injection.component';
import { LoginComponent } from '../login/login.component';

describe('DepInjectionComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service : AuthServiceDI;
  let componentService: AuthServiceDI;

  //declaring the test component
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[],
      providers:[AuthServiceDI] //resolving dependency via TestBed
    });

    //override the component providers to use this mocked AuthService
    //Configure the component with another set of Providers
    TestBed.overrideComponent(LoginComponent,
      { //MetaDataOverride property set/add/remove
        set:{providers:[{provide : AuthServiceDI, useClass : DepInjectionComponent}]}
      });

    //create component and test fixture  
    fixture = TestBed.createComponent(LoginComponent);

    //get test component from the fixture
    component = fixture.componentInstance;

    //AuthService provided to the TestBed
    service = TestBed.inject(AuthServiceDI);   //resolves a token into dependency

    //AuthService provided by Component- thr component fixture- dependency thr component's injector
    componentService = fixture.debugElement.injector.get(AuthServiceDI);
  });

  //resolving dependency via inject function
  it('service injected via inject(...) and TestBed.inject(..) should be the same instance', () => {
    inject([AuthServiceDI], (injectedservice: AuthServiceDI)=>{
      expect(injectedservice).toBe(service);
    });  
    });

  it('service injected via inject(...) and TestBed.inject(..) should be the same instance', () => {
    inject([AuthServiceDI], (injectedservice: AuthServiceDI)=>{
      expect(injectedservice).toBe(service);
    });  
  });

  it('service injected via component should be the same instance of MockAuthService', () => {
 
    expect(componentService instanceof DepInjectionComponent).toBeTruthy();

  });
});

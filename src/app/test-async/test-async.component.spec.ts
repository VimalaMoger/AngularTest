import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { AuthServiceAsync, TestAsyncComponent } from './test-async.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TestAsyncComponent', () => {
  let component: TestAsyncComponent;
  let fixture: ComponentFixture<TestAsyncComponent>;
  let authService: AuthServiceAsync;
  let el: DebugElement; 

  beforeEach(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [],
      providers: [AuthServiceAsync]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(TestAsyncComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    // UserService provided to the TestBed
    authService = TestBed.inject(AuthServiceAsync);

    //  get the "a" element by CSS selector (e.g., by class name)
    el = fixture.debugElement.query(By.css('a')); 
  });
  //Jasmine done function to handle the asynchronous code and returned promise 
  it('Button label via jasmine.done', (done) => {  //done function to handle async code in Jasmine
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    //callback function using spy object
    let spy = spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true)); 
    component.ngOnInit(); //angular wont do this in test env't, manually call this, to apply changes made in the template
    spy.calls.mostRecent().returnValue.then(() => { //callback is called when the promise returned from 
      //is Authenticated function
      fixture.detectChanges();
      expect(el.nativeElement.textContent.trim()).toBe('Logout');
      done(); 
    });
  });

  /* angular specific  functions 1)-async and whenStable 2)-fakeAsync and tick */
  //async function executes the code inside its body in a special async test zone
  //wrap the test spec in function in waitForAsync
  it('Button label via async() and whenStable()', waitForAsync(() => { 
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    //when all pending promises have been resolved , resolved promise returned from whenStable
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.nativeElement.textContent.trim()).toBe('Logout');
    });
    component.ngOnInit();
  }))

  //wrap the test spec in fakeAsync
  it('Button label via fakeAsync() and tick()', fakeAsync(() => {  //done function to handle async code in Jasmine
    expect(el.nativeElement.textContent.trim()).toBe('');
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true)); 
    component.ngOnInit(); 
    tick(); //blocks execution until when any pending activities to be completed
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
    }));
 });


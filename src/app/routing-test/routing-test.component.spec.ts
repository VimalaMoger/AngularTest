import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HomeComponent, routes, RoutingTestComponent, SearchComponent } from './routing-test.component';
import { Router, RouterModule } from '@angular/router';
import {Location} from '@angular/common';

describe('RoutingTestComponent', () => {
  let router :Router;
  let location: Location;
  let fixture : ComponentFixture<RoutingTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //router set up RouterTestingModule
      imports: [RouterModule.forRoot(routes)],
      declarations: [ 
        HomeComponent,
        SearchComponent,
      ]
    });
    router = TestBed.inject(Router); 
    location = TestBed.inject(Location); 

    fixture = TestBed.createComponent(RoutingTestComponent); 
    router.initialNavigation();

  });

  it("fakeAsync works", fakeAsync(() => {
    let promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to "" redirects you to /home', fakeAsync(() => { 
    router.navigate([""]).then(() => {
      expect(location.path()).toBe("/home");
    });
  }));

  it('navigate to "search" redirects you to /search', fakeAsync(() => { 
    router.navigate(["/search"]).then(() => {
      expect(location.path()).toBe("/search");
    });
  }));
});
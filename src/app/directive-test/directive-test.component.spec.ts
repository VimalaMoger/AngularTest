import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DirectiveTestComponent } from './directive-test.component';


@Component({
  template: ` <h2 [textColor]="textColor">Text Color of Component</h2>`,
  imports: [DirectiveTestComponent],
})
class TestComponent {
  textColor: string = 'black';
}

describe('DirectiveTestComponent', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [DirectiveTestComponent, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should apply text color', () => {
    const elem= fixture.debugElement.query(By.directive(DirectiveTestComponent));

    const textColor= elem.nativeElement.style.color;
    expect(textColor).toBe('black');
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div class="colored-div" [style.background-color]="color"> </div>`
})
export class TestComponent {
  color: any;
}

describe('Test', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('background should have correct color', () => {
      let customColor = 'green';
      component.color = customColor;
      fixture.detectChanges();
      const colorEl: HTMLElement = fixture.debugElement.query(By.css('.colored-div')).nativeElement;
      expect(colorEl.style.backgroundColor).toBe(customColor);
  });
});
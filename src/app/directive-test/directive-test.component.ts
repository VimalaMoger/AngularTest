import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
/* 
@Component({
  selector: 'app-directive-test',
  standalone: true,
  imports: [],
  templateUrl: './directive-test.component.html',
  styleUrl: './directive-test.component.css'
}) */


  @Directive({
    selector: '[textColor]',
  })
  export class DirectiveTestComponent implements OnChanges {
    @Input() textColor!: string;
  
    constructor(private el: ElementRef) {}
  
    ngOnChanges() {
      this.applyTextColor();
    }
  
    applyTextColor() {
      this.el.nativeElement.style.color = this.textColor;
    }
  }



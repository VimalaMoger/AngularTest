import { Component } from '@angular/core';
import { AuthService } from '../mock-auth-service/mock-auth-service.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-detection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './change-detection.component.html',
  styleUrl: './change-detection.component.css'
})
export class ChangeDetectionComponent {
  constructor(private auth:AuthService){}
  needsLogin(){
    return ! this.auth.isAuthenticated();
  }
}

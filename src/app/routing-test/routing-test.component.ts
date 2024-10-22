import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';


@Component({
  template: `Search`})
export class SearchComponent {
}

@Component({
  template: `Home`})
export class HomeComponent {
}

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent}
];

@Component({
  selector: 'app-routing-test',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './routing-test.component.html',
  styleUrl: './routing-test.component.css'
})
export class RoutingTestComponent {
}

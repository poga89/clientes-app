import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a Angular';

  curso: string = 'Angular 7';
  alumno: string = 'Braider Polo';
  profesor: string = 'Udemy';
}

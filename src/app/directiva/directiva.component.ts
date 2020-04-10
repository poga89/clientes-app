import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {

  habilitar: boolean= true;  
  listaCurso: string[] = ['TypeScript','Java','c#','JavaScript','php','Java EE'];
  constructor() { }

  setHabilitar(): void{

    this.habilitar = (this.habilitar==true) ? false: true;

  }


}

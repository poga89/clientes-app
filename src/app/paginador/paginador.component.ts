import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'paginador-nav',
  templateUrl: './paginador.component.html'
  })
export class PaginadorComponent implements OnInit {

  constructor() { }

  @Input() paginador: any;
  
  paginas: number[];
  ngOnInit() {
    this.paginas= Array(this.paginador.totalPages).fill(0).map((_valor, indice)=> indice + 1);
  }

}

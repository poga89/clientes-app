import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginador-nav',
  templateUrl: './paginador.component.html'
  })
export class PaginadorComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() paginador: any;
  
  paginas: number[];

  desde: number;
  hasta: number;

  ngOnInit() {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges){

    let paginadorActualizado = changes['paginador'];
    if(paginadorActualizado.previousValue){
        this.initPaginator();
    }

  }

  private initPaginator(): void{

   this.desde= Math.min(Math.max(1, this.paginador.number - 4),this.paginador.totalPages - 5 );
   this.hasta= Math.min(Math.min(this.paginador.totalPages, this.paginador.number + 4 ),this.paginador.totalPages);

  if(this.paginador.totalPages>5){
    this.paginas= Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice)=> indice + this.desde);
  }else{
    this.paginas= Array(this.paginador.totalPages).fill(0).map((_valor, indice)=> indice + 1);
  }

}


}

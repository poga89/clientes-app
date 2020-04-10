import { ClientesService } from './clientes.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import {CLIENT} from './clientes.json';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  cli: Cliente[];


  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    this.clientesService.getClientes().subscribe(
      cli => {
        this.cli=cli
      }
    );
  }

}

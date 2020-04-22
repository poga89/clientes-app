import { Observable } from 'rxjs';
import { ClientesService } from './clientes.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import {CLIENT} from './clientes.json';
import Swal from 'sweetalert2';

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

  delete(cliente: Cliente): void{


    Swal.fire({
      title: 'Esta seguro?',
      text: `Seguro de Eliminar al cliente! ${cliente.nombre} ${cliente.apellido} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.clientesService.delete(cliente.id).subscribe(
          res=>{
            this.cli=this.cli.filter(clie => clie !== cliente)
            Swal.fire(
              'Eliminado!',
              ` ${cliente.nombre} ${cliente.apellido} `,
              'success'
            )
          }
        )
      }
    })

   

  }

}

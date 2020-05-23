import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientesService } from './clientes.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import {CLIENT} from './clientes.json';
import {ModalService} from './detalle/modal.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  cli: Cliente[];
  paginador: any;
  clienteSeleccionado:Cliente;


  constructor(private clientesService: ClientesService,
              private activatedRoute: ActivatedRoute,
              private modalservice: ModalService) { }

  ngOnInit() {
    /**
     * paginador en el front cada ves que se cambie el valor de la pagina este lo actualiza.
     */

    this.activatedRoute.paramMap.subscribe(
      params=> {
      let page: number = +params.get('page');
      if(!page){
        page=0;
      }  

      this.clientesService.getClientes(page).subscribe(
          response => {
            this.cli=response.content as Cliente[];
            this.paginador=response;
          }
        )

      }
    )
    
    this.modalservice.notificarUpload.subscribe(cliente=>{
      this.cli = this.cli.map(clienteoriginal => {
        if(cliente.id== clienteoriginal.id){
          clienteoriginal.foto=cliente.foto;
        }
        return clienteoriginal;
      })
    });

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


  abrirModal(cliente: Cliente){
    this.clienteSeleccionado = cliente;
    this.modalservice.abrirModal();
  }

}

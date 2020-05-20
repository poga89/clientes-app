import { ActivatedRoute } from '@angular/router';
import { ClientesService } from './../clientes.service';
import { Cliente } from './../cliente';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente: Cliente;
  titulo : string = "Detalle Cliente";
  private fotoseleccionada: File;

  constructor(private clientesService: ClientesService,
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params=>{
      let id : number =+ params.get('id');
      if(id){
        this.clientesService.getIdcliente(id).subscribe(cliente=>{
          this.cliente = cliente;
        });
      }
    })
  }


  seleccionarfoto(event){
    this.fotoseleccionada = event.target.files[0];
    console.log(this.fotoseleccionada);
  }

  subirFoto(){
    this.clientesService.subirFoto(this.fotoseleccionada, this.cliente.id)
    .subscribe(cliente=>{
      this.cliente = cliente;
      Swal.fire('Archivo adjunto con exito',"exito", "success");
    });
  }

}

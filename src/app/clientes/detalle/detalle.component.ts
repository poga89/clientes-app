import { ActivatedRoute } from '@angular/router';
import { ClientesService } from './../clientes.service';
import { Cliente } from './../cliente';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import {ModalService} from './modal.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;
  titulo : string = "Detalle Cliente";
  private fotoseleccionada: File;
  progreso : number = 0;


  constructor(private clientesService: ClientesService,
              private  modalservice: ModalService) { }

  ngOnInit() {
    
  }


  seleccionarfoto(event){
    this.fotoseleccionada = event.target.files[0];
    this.progreso=0;
    console.log(this.fotoseleccionada);
    if(this.fotoseleccionada.type.indexOf('image') < 0){
      Swal.fire('Error','El archivo debe ser una imagen','error');
    }
  }

  subirFoto(){

    if(!this.fotoseleccionada){
      Swal.fire('Error','Debe seleciconar una foto','error');
    }else{
      this.clientesService.subirFoto(this.fotoseleccionada, this.cliente.id)
        .subscribe(event=>{

          if(event.type===HttpEventType.UploadProgress){
            this.progreso = Math.round((event.loaded/event.total) * 100);
          }else if(event.type === HttpEventType.Response){
            let response: any = event.body;
            this.cliente= response.cliente as Cliente;
            Swal.fire('Archivo adjunto con exito','Exito', "success");
          }

        /*this.cliente = cliente;*/ 
        
       });
    }
  }

  cerrarModal(){

    this.modalservice.cerrarModal();
    this.fotoseleccionada= null;
    this.progreso=0;
  }

}

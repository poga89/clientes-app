import { Routes, Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from './clientes.service';
import { Cliente } from './cliente';
import { Component, OnInit, NgModule } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private errores: string[];
  private titulo: string = "Crear Cliente";
  constructor(private clientesService: ClientesService,
              private router: Router,
              private activateroute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activateroute.params.subscribe(
      params=> {
        let id = params['id']
        if(id){
          this.clientesService.getIdcliente(id).subscribe( (cliente) => this.cliente = cliente )
        }
      }
    );
  }

  public create(): void{
    this.clientesService.create(this.cliente)
    .subscribe(
      client=> {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo Cliente', `Cliente ${client.mensaje} ${client.cliente.nombre} creado con exito`, "success")
      },
      err=>{
        this.errores= err.error.errors as string[];
        console.error('Codigo del error del backend' + err.status);
      }
     
    );

  }

  public update(): void{

    this.clientesService.update(this.cliente).subscribe(
      json=>{
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente Actualizado', `Cliente ${json.mensaje}  actualizado con exito`, "success")
      },
      err=>{
        this.errores= err.error.errors as string[];
        console.error('Codigo del error del backend' + err.status);
      }
    )

    

  }



}

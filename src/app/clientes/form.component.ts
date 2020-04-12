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
    this.clientesService.create(this.cliente).subscribe(
      cliente=> {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo Cliente', `Cliente ${cliente.nombre} creado con exito`, "success")
      }
     
    );

  }

  public update(): void{

    this.clientesService.update(this.cliente).subscribe(
      cliente=>{
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con exito`, "success")
      }
    )

  }



}

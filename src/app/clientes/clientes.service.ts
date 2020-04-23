import { Router } from '@angular/router';
import { CLIENT } from './clientes.json';
import { Cliente } from './cliente';
import { Injectable } from '@angular/core';
import { Observable,of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';




@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private endpoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private route: Router) { }

  getClientes(): Observable<Cliente[]> {

    return this.http.get<Cliente[]>(this.endpoint);

  };


  create (cliente: Cliente): Observable<any>{

    console.log(cliente);
    return this.http.post<any>(this.endpoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire('Error al crear cliente',e.error.mensaje,'error');
        return throwError(e);
      })
    );

  };

  getIdcliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(this.endpoint+"/"+id).pipe(
      catchError( e => { // Manejo de errores en angular
        this.route.navigate(['/clientes']);
         console.error(e);
         Swal.fire('Error al editar cliente', e.error.mensaje, 'error');
         return throwError(e);
      })
    )
  };

  update (cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.endpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire('Error al actualizar cliente',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  delete (id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(this.endpoint+"/"+id,{headers: this.httpHeaders} ).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire('Error al eliminar cliente',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

}

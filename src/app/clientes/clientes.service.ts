import { Router } from '@angular/router';
import { CLIENT } from './clientes.json';
import { Cliente } from './cliente';
import { Injectable } from '@angular/core';
import { Observable,of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Region } from './region';




@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private endpoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private route: Router) { }


  private isNotAutorizado(e): boolean {
    if(e.status==401 || e.status==403 ){
      this.route.navigate(['/login'])
      return true;
    }

    return false;
  }


  getRegiones(): Observable<Region[]> {

    return this.http.get<Region[]>(this.endpoint+'/regiones').pipe(
      catchError(e=>  {
        this.isNotAutorizado(e);
        return throwError(e);
      })
    );
    
  }

 

  getClientes(page: number): Observable<any> {

    return this.http.get(this.endpoint+'/page/'+ page).pipe(
      map(
        (res: any)=>{
          res.content as Cliente[];
          return res;
        }
      )
    )

  };


  create (cliente: Cliente): Observable<any>{

    console.log(cliente);
    return this.http.post<any>(this.endpoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e=>{

        if(this.isNotAutorizado(e)){
          return throwError(e);
        }
        
        if(e.status==400){
          return throwError(e);
        }  

        console.error(e.error.mensaje);
        Swal.fire('Error al crear cliente',e.error.mensaje,'error');
        return throwError(e);
      })
    );

  };

  getIdcliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(this.endpoint+"/"+id).pipe(
      catchError( e => { // Manejo de errores en angular
        
        if(this.isNotAutorizado(e)){
          return throwError(e);
        }

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
        
        if(this.isNotAutorizado(e)){
          return throwError(e);
        }

        if(e.status==400){
          return throwError(e);
        } 

        console.error(e.error.mensaje);
        Swal.fire('Error al actualizar cliente',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  delete (id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(this.endpoint+"/"+id,{headers: this.httpHeaders} ).pipe(
      catchError(e=>{

        if(this.isNotAutorizado(e)){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire('Error al eliminar cliente',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id: any): Observable<HttpEvent<{}>>{

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    /**
     * barra de progreso
     */
    const req = new HttpRequest('POST', `${this.endpoint}/upload`, formData, {
      reportProgress: true
    });


    return this.http.request(req).pipe(
      catchError(e=>  {
        this.isNotAutorizado(e);
        return throwError(e);
      })
    );
      
    
  }

}

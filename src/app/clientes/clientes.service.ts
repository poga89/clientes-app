import { CLIENT } from './clientes.json';
import { Cliente } from './cliente';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private endpoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {

    return this.http.get<Cliente[]>(this.endpoint);

  };


  create (cliente: Cliente): Observable<Cliente>{

    console.log(cliente);
    return this.http.post<Cliente>(this.endpoint, cliente, {headers: this.httpHeaders});

  }

  getIdcliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(this.endpoint+"/"+id);
  }

  update (cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.endpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders})
  }

}

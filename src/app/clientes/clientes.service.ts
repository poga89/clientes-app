import { CLIENT } from './clientes.json';
import { Cliente } from './cliente';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor() { }

  getClientes(): Observable<Cliente[]> {

    return of(CLIENT);
  };

}

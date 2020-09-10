import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from './../models/factura';



@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private urlEndPoint: string ='http://localhost:8080/api/facturas';

  constructor(private httpClient: HttpClient) { }


  getFactura(id:number): Observable<Factura>{
    return this.httpClient.get<Factura>(this.urlEndPoint+"/"+id);    
  }

}

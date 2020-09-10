import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FacturasService } from './service/facturas.service';
import { Factura } from './models/factura';


@Component({
  selector: 'app-detallefactura',
  templateUrl: './detallefactura.component.html',
})
export class DetallefacturaComponent implements OnInit {

  factura: Factura;
  titulo: string='Factura';

  constructor(private facturaService : FacturasService,
              private route :ActivatedRoute  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      let id =+ params.get('id');
      this.facturaService.getFactura(id).subscribe(factura=>{
        this.factura = factura;
      })
    })
  }

}

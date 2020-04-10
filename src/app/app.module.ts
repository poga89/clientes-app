import { ClientesService } from './clientes/clientes.service';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { AppComponent } from './app.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ClientesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

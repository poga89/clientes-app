import { ClientesService } from './clientes/clientes.service';
import { HeaderComponent } from './header/header.component';
import { PaginadorComponent } from './paginador/paginador.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { AppComponent } from './app.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';


const routes: Routes= [

  {path: '',redirectTo: '/directivas', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent}

]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginadorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClientesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { LoginComponent } from './login/login.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { VistaAdministradorComponent } from './vista-administrador/vista-administrador.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaginaPrincipalComponent,
    VistaAdministradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

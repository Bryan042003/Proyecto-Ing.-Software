import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaComponent } from './Componentes/mapa/mapa.component';
import { CardAudioComponent } from './Componentes/card-audio/card-audio.component';
import { FiltrosComponent } from './Componentes/filtros/filtros.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { LoginComponent } from './login/login.component';
import { VistaAdministradorComponent } from './vista-administrador/vista-administrador.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    MapaComponent,
    CardAudioComponent,
    FiltrosComponent,
    LoginComponent,
    VistaAdministradorComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

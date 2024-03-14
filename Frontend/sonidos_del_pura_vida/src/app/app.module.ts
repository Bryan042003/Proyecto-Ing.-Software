import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { LoginComponent } from './login/login.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { VistaAdministradorComponent } from './vista-administrador/vista-administrador.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FiltrosComponent } from './Componentes/filtros/filtros.component';
import { CardAudioComponent } from './Componentes/card-audio/card-audio.component';
import { MapaComponent } from './Componentes/mapa/mapa.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VistaAdministradorComponent,
    CardAudioComponent,
    MapaComponent,
    FiltrosComponent,
    PaginaPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

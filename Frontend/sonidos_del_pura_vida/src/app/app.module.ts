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
import { FormCrearAudioComponent } from './form-crear-audio/form-crear-audio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VisualizarInfoAudiosComponent } from './visualizar-info-audios/visualizar-info-audios.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { GestionDeAudiosComponent } from './gestion-de-audios/gestion-de-audios.component';
import { GestionDeAdministradoresComponent } from './gestion-de-administradores/gestion-de-administradores.component';
import { HistorialComponent } from './historial/historial.component';
import { RegistrarAdminComponent } from './registrar-admin/registrar-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    MapaComponent,
    CardAudioComponent,
    FiltrosComponent,
    LoginComponent,
    VistaAdministradorComponent,
    FormCrearAudioComponent,
    VisualizarInfoAudiosComponent,
    DashboardComponent,
    PerfilComponent,
    GestionDeAudiosComponent,
    GestionDeAdministradoresComponent,
    HistorialComponent,
    RegistrarAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

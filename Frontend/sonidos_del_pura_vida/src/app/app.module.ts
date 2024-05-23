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
import { CardAdminComponent } from './card-admin/card-admin.component';
import { EditarAudioComponent } from './editar-audio/editar-audio.component';
import { ConfirmarEliminacionComponent } from './confirmar-eliminacion/confirmar-eliminacion.component';
import { CardHistorialComponent } from './card-historial/card-historial.component';
import { ConfirmarEdicionAudioComponent } from './confirmar-edicion-audio/confirmar-edicion-audio.component';
import { EditarAdminComponent } from './editar-admin/editar-admin.component';
import { ConfirmarEliminacionAdminComponent } from './confirmar-eliminacion-admin/confirmar-eliminacion-admin.component';
import { ConfirmarEdicionAdminComponent } from './confirmar-edicion-admin/confirmar-edicion-admin.component';

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
    CardAdminComponent,
    EditarAudioComponent,
    ConfirmarEliminacionComponent,
    CardHistorialComponent,
    ConfirmarEdicionAudioComponent,
    EditarAdminComponent,
    ConfirmarEliminacionAdminComponent,
    ConfirmarEdicionAdminComponent,
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

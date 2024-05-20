import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { MapaComponent } from './Componentes/mapa/mapa.component';
import { CardAudioComponent } from './Componentes/card-audio/card-audio.component';
import { FiltrosComponent } from './Componentes/filtros/filtros.component';
import { LoginComponent } from './login/login.component';
import { VistaAdministradorComponent } from './vista-administrador/vista-administrador.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { GestionDeAudiosComponent } from './gestion-de-audios/gestion-de-audios.component';
import { GestionDeAdministradoresComponent } from './gestion-de-administradores/gestion-de-administradores.component';
import { HistorialComponent } from './historial/historial.component'; 
import { AuthGuard } from './authGuard/auth.guard';

const routes: Routes = [ 
  {path: '',component: PaginaPrincipalComponent},
  {path: 'admin', component: LoginComponent},
  {path: 'dashboard',component: DashboardComponent, canActivate: [AuthGuard]},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

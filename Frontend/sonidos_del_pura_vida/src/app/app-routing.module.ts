import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { MapaComponent } from './Componentes/mapa/mapa.component';
import { CardAudioComponent } from './Componentes/card-audio/card-audio.component';
import { FiltrosComponent } from './Componentes/filtros/filtros.component';
import { LoginComponent } from './login/login.component';
import { VistaAdministradorComponent } from './vista-administrador/vista-administrador.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [ 
  // {path: '',redirectTo: "pagina-principal", pathMatch: "full"},
  {path: '',component: PaginaPrincipalComponent},
  {path: 'mapa',component: MapaComponent},
  {path: 'card-audio',component: CardAudioComponent},
  {path: 'filtros',component: FiltrosComponent},
  //{path: 'login', component: LoginComponent},
  {path: 'admin', component: LoginComponent},
  {path: 'vista-admistrador',component: VistaAdministradorComponent},
  {path: 'dashboard',component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

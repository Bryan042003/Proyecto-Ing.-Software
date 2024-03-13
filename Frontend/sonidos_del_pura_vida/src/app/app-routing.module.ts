import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { LoginComponent } from './login/login.component';
import { VistaAdministradorComponent } from './vista-administrador/vista-administrador.component';

const routes: Routes = [
  {path: '',redirectTo: "pagina-principal", pathMatch: "full"},
  {path: 'pagina-principal',component: PaginaPrincipalComponent},
  {path: 'login',component: LoginComponent},
  {path: 'vista-administrador',component: VistaAdministradorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

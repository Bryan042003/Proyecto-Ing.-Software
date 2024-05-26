import { Component } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Admin } from '../models/Admin.model';

@Component({
  selector: 'app-gestion-de-administradores',
  templateUrl: './gestion-de-administradores.component.html',
  styleUrl: './gestion-de-administradores.component.css'
})
export class GestionDeAdministradoresComponent {
  admins: Admin[] = [];

  adminPorPagina: number = 10;
  paginas: any[] = [];
  paginaActual: number = 0;

  activarVistaInformacionAdmin: boolean = false;
  adminSeleccionado!: Admin;

  tocoBotonAnadir: boolean = false;
  eliminarAdmin = false;
  editarAdmin = false;
  original = true;

constructor(public pasarDatosService: PasarDatosService) { }
ngOnInit() {
  this.cargarAdmins();
  this.pasarDatosService.setActivarInformacionAdmin(false);
  this.pasarDatosService.setFlagEliminarAdmin(false);
  this.pasarDatosService.setFlagEditarDatosAdmin(false);
  this.pasarDatosService.setActivarOriginalVistaAdmin(true);

  this.pasarDatosService.getActivarOriginalVistaAdmin().subscribe(flag => {
    // Activamos aqui la vista original con el logo pro mil
    this.original = flag;
    if(this.original){
      this.activarVistaInformacionAdmin = false;
      this.eliminarAdmin = false;
      this.editarAdmin = false;
    }
  });

  this.pasarDatosService.getFlagEliminarAdmin().subscribe(flag => {
    // Activamos aqui la vista de eliminar admin donde tenemos el boton
    this.eliminarAdmin = flag;
    if(this.eliminarAdmin){
      this.activarVistaInformacionAdmin = false;
      this.eliminarAdmin = true;
      this.editarAdmin = false;
    }
  });

  this.pasarDatosService.getFlagEditarDatosAdmin().subscribe(flag => {
    // Activamos aqui la vista de editar admin informacion
    this.editarAdmin = flag;
    if(this.editarAdmin){
      this.activarVistaInformacionAdmin = false;
      this.eliminarAdmin = false;
      this.editarAdmin = true;
    }
  });

  this.pasarDatosService.getActivarInformacionAdmin().subscribe(flag => {
    // Activamos aqui la vista de informacion de admin
    this.activarVistaInformacionAdmin = flag;
    if(this.activarVistaInformacionAdmin){
      this.activarVistaInformacionAdmin = true;
      this.eliminarAdmin = false;
      this.editarAdmin = false;
      this.original = false;
    }
  });

}

paginateAdmin() {
  this.paginaActual = 0;
  this.paginas = [];

  for (let i = 0; i < this.admins.length; i += this.adminPorPagina) {
    this.paginas.push(this.admins.slice(i, i + this.adminPorPagina));
  }
}
irAPagina(pagina: number) {
  this.paginaActual = pagina;
}

paginaAnterior() {
  if (this.paginaActual > 0) {
    this.paginaActual--;
  }
}

paginaSiguiente() {
  if (this.paginaActual < this.paginas.length - 1) {
    this.paginaActual++;
  }
}

cargarAdmins() {
  this.pasarDatosService.getAdmins().subscribe(
    (res: any) => {
      this.admins = res;
      console.log("entrando a cargarAdmins");
      this.paginateAdmin();
    }
  );
}

botonAnadir(){
  this.tocoBotonAnadir = !this.tocoBotonAnadir;
  if(this.tocoBotonAnadir){
    this.activarVistaInformacionAdmin = false;
    this.eliminarAdmin = false;
    this.editarAdmin = false;
    this.original = false;
  } else {
    this.original = true;
  }
}

activarVistaInfoAdmin(admin: Admin) {
  this.tocoBotonAnadir = false;
  this.activarVistaInformacionAdmin = true;
  this.adminSeleccionado = admin;
  this.eliminarAdmin = false;
  this.editarAdmin = false;
  this.original = false;
}
}


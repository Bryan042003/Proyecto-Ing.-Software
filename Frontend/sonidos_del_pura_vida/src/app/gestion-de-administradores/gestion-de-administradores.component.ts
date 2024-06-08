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
  paginaGrupoActual: number = 0;
  paginasPorGrupo: number = 5;
  maximoGrupos: number = 0;

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
  this.maximoGrupos = Math.ceil(this.paginas.length / this.paginasPorGrupo); // Número de grupos de páginas
}
irAPagina(pagina: number) {
  this.paginaActual = pagina;
  this.paginaGrupoActual = Math.floor(this.paginaActual / this.paginasPorGrupo); // Actualizar el grupo de páginas

}

paginaAnterior() {
  if (this.paginaActual > 0) {
    this.paginaActual--;
    this.paginaGrupoActual = Math.floor(this.paginaActual / this.paginasPorGrupo);

  }
}

paginaSiguiente() {
  if (this.paginaActual < this.paginas.length - 1) {
    this.paginaActual++;
    this.paginaGrupoActual = Math.floor(this.paginaActual / this.paginasPorGrupo);
  }
}
  // Métodos para cambiar de grupo de páginas
  grupoAnterior() {
    if (this.paginaGrupoActual > 0) {
      this.paginaGrupoActual--;
    }
  }

  grupoSiguiente() {
    if (this.paginaGrupoActual < this.maximoGrupos - 1) {
      this.paginaGrupoActual++;
    }
  }

  // Obtener las páginas del grupo actual
  getPaginasGrupoActual(): number[] {
    const inicio = this.paginaGrupoActual * this.paginasPorGrupo;
    const fin = inicio + this.paginasPorGrupo;
    return this.paginas.slice(inicio, fin).map((_, i) => inicio + i); // Devolver un array con las páginas del grupo actual
  }

cargarAdmins() {
  this.pasarDatosService.getAdmins().subscribe(
    (res: any) => {
      this.admins = res;
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
  this.pasarDatosService.setAdmin(admin);
}
}


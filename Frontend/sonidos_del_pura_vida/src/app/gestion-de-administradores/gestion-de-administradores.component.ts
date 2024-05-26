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

  flagConfirmarEliminar = false;
  flagConfirmarEdicionDatos = false;

  tocoBotonAnadir: boolean = false; 
  eliminar = false;
  editar = false;

constructor(public pasarDatosService: PasarDatosService) { }
ngOnInit() {
  this.cargarAdmins();
  this.pasarDatosService.getFlagEditarAdmin().subscribe(flag => {
    this.activarVistaInformacionAdmin = flag;
    console.log("activar/desactivar vista admin");

  });

  this.pasarDatosService.getEliminarAdmin().subscribe(flag => {
    this.eliminar = flag;
    console.log("eliminar ");
  });

  this.pasarDatosService.getEditarAdmin().subscribe(flag => {
    this.editar = flag;
    console.log("editar ");
  });


  /*
  aqui se presiona el devolverse dentro de la vista de confirmar edicion y eliminacion de admin
  */
  this.pasarDatosService.getFlagEditarDatosAdmin().subscribe(flag => {
    this.flagConfirmarEdicionDatos = flag;
    this.editar = false;
    this.eliminar = false;
    
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

activarVistaInfoAdmin(admin: Admin) {
  this.tocoBotonAnadir = false;
  this.adminSeleccionado = admin;
  this.activarVistaInformacionAdmin = true;
  this.flagConfirmarEliminar = false;
  this.flagConfirmarEdicionDatos = false;
  console.log("activar vista admin");

}

  botonAnadir(){
    this.tocoBotonAnadir = !this.tocoBotonAnadir;
    this.activarVistaInformacionAdmin = false;
    this.flagConfirmarEliminar = false;
    this.flagConfirmarEdicionDatos = false;
    console.log("activar añadir admin");
    
  }

}


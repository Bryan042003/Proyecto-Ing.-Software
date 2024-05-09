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

tocoBotonAnadir: boolean = false;
constructor(public pasarDatosService: PasarDatosService) { }
ngOnInit() {
  this.cargarAdmins();
  console.log(this.admins);

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
  }

}


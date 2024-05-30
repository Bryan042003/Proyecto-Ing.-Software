import { Component, Input, OnInit } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Admin } from '../models/Admin.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-admin',
  templateUrl: './editar-admin.component.html',
  styleUrl: './editar-admin.component.css'
})
export class EditarAdminComponent {
  @Input() admin!: Admin;
  flagEliminar = false;
  flagCerrarEditar = false;
  flagEditar = false;

  adminActual = this.pasarDatosService.getAdminFromToken();
  adminActualID = this.adminActual.id;

  constructor(public pasarDatosService: PasarDatosService) { }
   cerrarEditar(){
    this.pasarDatosService.setActivarOriginalVistaAdmin(true);
    this.pasarDatosService.setFlagEditarAdmin(false);
    this.pasarDatosService.setFlagEditarDatosAdmin(false);
    this.flagCerrarEditar = true;
  }

  activarEliminar(){

    if(this.adminActualID != this.admin.id){
      this.pasarDatosService.setFlagEliminarAdmin(true);
      this.flagEliminar = true;
    } else {
      this.showAlertErrorEliminarAdminActual();

    }

  }

  activarEditar(){

    if(this.adminActualID != this.admin.id){
      this.flagEditar = true;
      this.pasarDatosService.setFlagEditarDatosAdmin(true);
    } else {
      this.showAlertErrorEditarAdminActual();
    }

  }

  showAlertErrorEliminarAdminActual() {
    Swal.fire({
      title: 'No se puede autoeliminar!',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }

  showAlertErrorEditarAdminActual() {
    Swal.fire({
      title: 'Para autoeditarse hacerlo desde el perfil!',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }

}

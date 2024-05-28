import { Component, Input, OnInit } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Admin } from '../models/Admin.model';

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

  constructor(public pasarDatosService: PasarDatosService) { }
   cerrarEditar(){
    this.pasarDatosService.setActivarOriginalVistaAdmin(true);
    this.pasarDatosService.setFlagEditarAdmin(false);
    this.pasarDatosService.setFlagEditarDatosAdmin(false);
    this.flagCerrarEditar = true;
  }

  activarEliminar(){
    this.pasarDatosService.setFlagEliminarAdmin(true);
    this.flagEliminar = true;
  }

  activarEditar(){
    this.flagEditar = true;
    this.pasarDatosService.setFlagEditarDatosAdmin(true);
    
  }
}

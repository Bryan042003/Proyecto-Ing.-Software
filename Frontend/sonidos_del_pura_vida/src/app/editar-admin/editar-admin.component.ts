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
    this.pasarDatosService.setFlagEditarAdmin(false);
  }

  activarEliminar(){
    this.flagEliminar = true;
    this.pasarDatosService.setFlagConfirmarEliminacionAdmin(true);
  }

  activarEditar(){
    console.log("estoy en editar true");
    this.flagEditar = true;
    this.pasarDatosService.setFlagEditarDatosAdmin(true);
  }


}

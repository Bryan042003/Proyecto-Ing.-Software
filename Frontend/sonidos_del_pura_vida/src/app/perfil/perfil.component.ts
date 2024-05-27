import { Component } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  constructor(private pasarDatosService:PasarDatosService){}

  admin = this.pasarDatosService.getAdminFromToken();

  nombrePerfil = this.pasarDatosService.getNombreAdminPerfil();

  esEditable = false;
  nombre = this.pasarDatosService.getNombreAdminPerfil();
  id = this.admin.id;

  botonActivo = false;
  botonInactivo = true;

  guardarCambios(){
    this.toggleEditable();

    const Admin = new FormData();
    Admin.append('id', this.id);
    Admin.append('nombre', this.nombre);
    this.pasarDatosService.editarNombreAdminPerfil(Admin).subscribe(
      (res) => {
        this.showAlertSuccess();
        this.pasarDatosService.setNombreAdminPerfil(this.nombre);
      },
      (error) => {
        Swal.close();
        this.showAlertError();
      }
    );
  }

  toggleEditable(){
    this.esEditable = !this.esEditable;
    if(this.esEditable){
      this.botonActivo = true;
      this.botonInactivo = false;
    } else {
      this.botonActivo = false;
      this.botonInactivo = true;
    }
  }

  showAlertSuccess() {
    return Swal.fire({
      title: 'Nombre editado con éxito!',
      icon: 'success',
      timer: 1000,
      showConfirmButton: false
    });
  }

  showAlertError() {
    Swal.fire({
      title: 'Error al editar el nombre de perfil!',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }
}

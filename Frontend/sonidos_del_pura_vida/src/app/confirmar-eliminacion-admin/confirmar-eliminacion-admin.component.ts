import { Component, Input } from '@angular/core';
import { Audio } from '../models/Audio.model';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Admin } from '../models/Admin.model';

@Component({
  selector: 'app-confirmar-eliminacion-admin',
  templateUrl: './confirmar-eliminacion-admin.component.html',
  styleUrl: './confirmar-eliminacion-admin.component.css'
})
export class ConfirmarEliminacionAdminComponent {
  @Input() admin!: Admin;
  constructor(private fb: FormBuilder, public pasarDatosService: PasarDatosService) { }
  @Input() audio!: Audio;

  private idAdmin: number = Number(this.pasarDatosService.getAdminFromToken().id);

  form = this.fb.group({
    motivo: ['', [Validators.required, Validators.maxLength(255)]],
  });


  adminActual = this.pasarDatosService.getAdminFromToken();
  adminActualID = this.adminActual.id;

  async onSubmit() {

    if (this.form.valid) {
      const motivo = this.form.get('motivo')?.value || '';


      this.showAlertLoad();

      this.pasarDatosService.getEliminarAudio(this.audio.id, this.idAdmin, motivo, this.audio.ruta_audio, this.audio.ruta_imagen).subscribe(
        (res) => {
          Swal.close();
          this.showAlertSuccess();
          this.form.reset();
          this.form.untouched;

        },
        (error) => {
          Swal.close();
          this.showAlertError();
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  eliminarAdministrador(){
      this.pasarDatosService.deleteAdministrador(this.admin.id).subscribe(
        (res) => {
          Swal.close();
          this.showAlertSuccess();
          this.form.reset();
          this.form.untouched;

        },
        (error) => {
          Swal.close();
          this.showAlertError();
        }
      );
  }

  desactivarEliminar() {
    this.pasarDatosService.setActivarInformacionAdmin(true);
  }

  showAlertSuccess() {
    Swal.fire({
      title: 'Administrador Eliminado',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    }).then(() => {
      window.location.reload();
    });
  }

  showAlertError() {
    Swal.fire({
      title: 'Error al eliminar el Administrador',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }

  showAlertErrorAdminLogin() {
    Swal.fire({
      title: 'ERROR! No se puede autoeliminar!',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }

  showAlertLoad() {
    Swal.fire({
      title: 'Cargando...',
      text: 'Espere un momento por favor',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,

    });
    Swal.showLoading();
  }



}

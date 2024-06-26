import { Component, Input } from '@angular/core';
import { Audio } from '../models/Audio.model';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Admin } from '../models/Admin.model';

@Component({
  selector: 'app-confirmar-eliminacion',
  templateUrl: './confirmar-eliminacion.component.html',
  styleUrl: './confirmar-eliminacion.component.css'
})
export class ConfirmarEliminacionComponent {

  constructor(private fb: FormBuilder, public pasarDatosService: PasarDatosService) { }
  @Input() audio!: Audio;

  private idAdmin: number = Number(this.pasarDatosService.getAdminFromToken().id);

  form = this.fb.group({
    motivo: ['', [Validators.required, Validators.maxLength(255)]],
  });

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
          console.error(error);
          Swal.close();
          this.showAlertError();
        }
      );
    } else {
      this.showAlertInvalid();
      this.form.markAllAsTouched();
    }
  }

  showAlertSuccess() {
    Swal.fire({
      title: 'Audio Eliminado',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    }).then(() => {
      window.location.reload();
    });
  }

  showAlertError() {
    Swal.fire({
      title: 'Error al eliminar el audio',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }

  showAlertInvalid() {
    Swal.fire({
      title: 'Campos inválidos',
      text: 'Por favor, revise los campos de motivo',
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


  desactivarEliminar() {
    this.pasarDatosService.setFlagConfirmarEliminacion(false);
  }

}

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Admin } from '../models/Admin.model';
import { PasarDatosService } from '../services/pasar-datos.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmar-edicion-admin',
  templateUrl: './confirmar-edicion-admin.component.html',
  styleUrls: ['./confirmar-edicion-admin.component.css']
})
export class ConfirmarEdicionAdminComponent implements OnChanges {
  @Input() admin!: Admin;

  form: FormGroup;

  constructor(private fb: FormBuilder, public pasarDatosService: PasarDatosService) {
    this.form = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['admin'] && this.admin) {
      this.form.patchValue({
        id: this.admin.id,
        nombre: this.admin.nombre,
        email: this.admin.correo,
        password: ''
      });
    }
  }

  desactivarEdicionDatosAdmin() {
    this.pasarDatosService.setActivarInformacionAdmin(true);
  }

  async onSubmit() {
    if (this.form.valid) {
      const datosActualizados = this.form.value;

      this.showAlertLoad();

      const formDataAdmin = new FormData();
      formDataAdmin.append('id', datosActualizados.id);
      formDataAdmin.append('nombre', datosActualizados.nombre);
      formDataAdmin.append('correo', datosActualizados.email);

      const formDataPassword = new FormData();
      formDataPassword.append('password', datosActualizados.password);

      // Realizar la llamada para actualizar nombre y correo
      this.pasarDatosService.getEditarAdmin(formDataAdmin).subscribe(
        response => {
          if (datosActualizados.password) {
            // Si hay una nueva contraseña, realizar la llamada para cambiar la contraseña
            this.pasarDatosService.getEditarContraAdmin(formDataPassword).subscribe(
              response => {
                this.showAlertSuccess();
              },
              error => {
                this.showAlertError();
              }
            );
          } else {
            this.showAlertSuccess();
          }
        },
        error => {
          this.showAlertError();
        }
      );
    } else {
      this.showAlertInvalid();
    }
  }

  showAlertSuccess() {
    Swal.fire({
      title: 'Cambios Guardados',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }

  showAlertError() {
    Swal.fire({
      title: 'Error al guardar los cambios',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }

  showAlertInvalid() {
    Swal.fire({
      title: 'Campos inválidos',
      text: 'Por favor, revise los campos del formulario',
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


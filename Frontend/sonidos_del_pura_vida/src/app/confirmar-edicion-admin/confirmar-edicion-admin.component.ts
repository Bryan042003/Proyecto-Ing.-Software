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
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['admin'] && this.admin) {
      this.form.patchValue({
        nombre: this.admin.nombre,
        email: this.admin.correo,
        password: this.admin.password
      });
    }
  }

  desactivarEdicionDatosAdmin() {
    // Aquí desactivarla y que se nos active el de ver información de admin
    this.pasarDatosService.setActivarInformacionAdmin(true);
  }

  async onSubmit() {
    if (this.form.valid) {
      const datosActualizados = this.form.value;
      console.log(datosActualizados);

      // Aquí puedes agregar la lógica para guardar los cambios en el backend
      // ...

      this.showAlertSuccess();
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
    }).then(() => {
      window.location.reload();
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

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

  flagEditar = true;
  visible:boolean = true;
  changetype: boolean = true;

  form: FormGroup;

  constructor(private fb: FormBuilder, public pasarDatosService: PasarDatosService) {
    this.form = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }



  getPasswordStrength() {
    let contraActual = (<HTMLInputElement>document.getElementById("password")).value;
    let strength = 0;

    if (contraActual.length > 7) {
      strength++;
    }
    if (contraActual.match(/[a-z]/)) {
      strength++;
    }
    if (contraActual.match(/[A-Z]/)) {
      strength++;
    }
    if (contraActual.match(/[0-9]/)) {
      strength++;
    }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(contraActual)) {
      strength++;
    }

    let progressBar = <HTMLProgressElement>document.getElementById("passwordStrength");
    progressBar.value = strength;

    if (strength <= 1) {
      progressBar.classList.add('weak');
    } else if (strength <= 4) {
      progressBar.classList.add('medium');
    } else {
      progressBar.classList.add('strong');
    }
    return strength;
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
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


  desactivarEditar(){
    this.flagEditar = false;
    this.pasarDatosService.setActivarOriginalVistaAdmin(true);
    
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
      formDataPassword.append('id', datosActualizados.id);
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
                console.log(error);
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


import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Admin } from '../models/Admin.model';
import { PasarDatosService } from '../services/pasar-datos.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmar-edicion-admin',
  templateUrl: './confirmar-edicion-admin.component.html',
  styleUrls: ['./confirmar-edicion-admin.component.css']
})
export class ConfirmarEdicionAdminComponent implements OnChanges {
  @Input() admin!: Admin;


  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,}$/i;

  flagEditar = true;
  visible:boolean = true;
  changetype: boolean = true;

  constructor(private fb: FormBuilder, public pasarDatosService: PasarDatosService) {}

  form = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    correo: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.emailPattern)]],
    password: ['',[Validators.required, Validators.maxLength(50), this.hasNumber, this.hasCapitalCase, this.hasEightCharacters]],
    }
  );

  hasNumber(control: FormControl): {[s: string]: boolean} | null {
    const numReg = /\d/;
    if (!control.value || !numReg.test(control.value)) {
      return { noNumber: true };
    }
    return null;
  }

  hasCapitalCase(control: FormControl): {[s: string]: boolean} | null {
    const capitalReg = /[A-Z]/;
    if (!control.value || !capitalReg.test(control.value)) {
      return { noCapitalCase: true };
    }
    return null;
  }

  hasEightCharacters(control: FormControl): {[s: string]: boolean} | null {
    if (!control.value || control.value.length < 8) {
      return { lessThanEightCharacters: true };
    }
    return null;
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
        correo: this.admin.correo,
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
      formDataAdmin.append('id', this.form.get('id')?.value || '');
      formDataAdmin.append('nombre', this.form.get('nombre')?.value || '');
      formDataAdmin.append('correo', this.form.get('correo')?.value || '');

      const formDataPassword = new FormData();
      formDataPassword.append('id', this.form.get('id')?.value || '');
      formDataPassword.append('password', this.form.get('password')?.value || '');

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


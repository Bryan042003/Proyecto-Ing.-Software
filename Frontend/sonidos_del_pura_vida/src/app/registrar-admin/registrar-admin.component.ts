import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PasarDatosService } from '../services/pasar-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-admin',
  templateUrl: './registrar-admin.component.html',
  styleUrl: './registrar-admin.component.css'
})
export class RegistrarAdminComponent {

  constructor(private fb: FormBuilder, public pasarDatosService: PasarDatosService ) { }

  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,}$/i;
  passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  public strengthBar = document.getElementById("strength-bar");
  public msg = document.getElementById("msg");
  public barLenght: any;

  visible:boolean = true;
  changetype: boolean = true;
  public passwordActual = '';

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    correo: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.emailPattern)]],
    password: ['',[Validators.required, Validators.maxLength(50), this.hasNumber, this.hasCapitalCase, this.hasEightCharacters]],
    confirmPassword: ['']
  }, { validator: this.verificarContraseñas });

  verificarContraseñas(group: FormGroup): {[s: string]: boolean} | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordsNotMatch: true };
    }
    return null;
  }

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

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  async onSubmit() {

    if (this.form.valid) {
      const Admin = new FormData();
      Admin.append('nombre', this.form.get('nombre')?.value || '');
      Admin.append('correo', this.form.get('correo')?.value || '');
      Admin.append('password', this.form.get('password')?.value || '');

      this.pasarDatosService.addAdmin(Admin).subscribe(
        (res) => {
          this.form.reset();
          this.form.untouched;
          this.showAlertSuccess();
        },
        (error) => {
          Swal.close();
          this.showAlertError();
        }
      );
    } else {
      this.showAlertInvalid();
      this.form.markAllAsTouched();
    }
  }

  showAlertError() {
    Swal.fire({
      title: 'Error al registrar el administrador',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }

  showAlertSuccess() {
    Swal.fire({
      title: 'Administrador agregado correctamente',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    }).then(() => {
      window.location.reload();
    });
  }

  showAlertInvalid(){
    Swal.fire({
      title: 'Campos inválidos',
      text: 'Por favor, revise los campos del formulario',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
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

}

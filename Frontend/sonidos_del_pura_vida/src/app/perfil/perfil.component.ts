import { Component } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  constructor(private fb: FormBuilder, private pasarDatosService:PasarDatosService){}

  admin = this.pasarDatosService.getAdminFromToken();

  nombrePerfil = this.pasarDatosService.getNombreAdminPerfil();

  contraAdminStorage = localStorage.getItem('contraAdmin') || '';

  esEditable = false;
  nombre = this.pasarDatosService.getNombreAdminPerfil();
  id = this.admin.id;

  botonActivo = false;
  botonInactivo = true;

  botonEditarContraActivo = false;
  botonEditarContraInactivo = true;

  esEditableContra = false;

  CapaCambiarContraPerfil = false;

  esEditableContraseña = false;

  visible:boolean = true;
  changetype: boolean = true;

  password: string = '';
  confirmPassword: string = '';

  form = this.fb.group({
    password: ['',[Validators.required, Validators.maxLength(50), this.hasNumber, this.hasCapitalCase, this.hasEightCharacters]],
    confirmPassword: ['']
  }, { validator: this.verificarContraseñas });


  ongInit(){
    this.contraAdminStorage = localStorage.getItem('contraAdmin') || '';
  }

  guardarCambiosNombre(){
    this.toggleEditable();

    const Admin = new FormData();
    Admin.append('id', this.id);
    Admin.append('nombre', this.nombre);
    this.pasarDatosService.editarNombreAdminPerfil(Admin).subscribe(
      (res) => {
        this.showAlertSuccessNombre();
        this.pasarDatosService.setNombreAdminPerfil(this.nombre);
      },
      (error) => {
        Swal.close();
        this.showAlertErrorNombre();
      }
    );
  }

  async editarContraPerfil(){

    if (this.form.valid) {
    const Admin = new FormData();
    Admin.append('id', this.id);
    Admin.append('password', this.contraAdminStorage);

    this.pasarDatosService.editarContraAdminPerfil(Admin).subscribe(
      (res) => {
        this.showAlertSuccessContra();
        localStorage.setItem('contraAdmin', this.contraAdminStorage);
        this.CapaCambiarContraPerfil = false;
        this.botonEditarContraActivo = false;
        this.botonEditarContraInactivo = true;
        this.esEditableContra = false;
      },
      (error) => {
        Swal.close();
        this.showAlertErrorContra();
      }
    );
    } else {
      this.showAlertErrorContra();
    }
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

  toggleEditableContra(){
    this.esEditableContra = !this.esEditableContra;
    if(this.esEditableContra){
      this.botonEditarContraActivo = true;
      this.botonEditarContraInactivo = false;
      this.CapaCambiarContraPerfil = true;
    } else {
      this.contraAdminStorage = localStorage.getItem('contraAdmin') || '';
      this.viewpass();
      this.botonEditarContraActivo = false;
      this.botonEditarContraInactivo = true;
      this.CapaCambiarContraPerfil = false;
    }
  }

  EditarContaPerfil(){
    this.botonEditarContraActivo = false;
    this.botonEditarContraInactivo = true;
    this.CapaCambiarContraPerfil = false;
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


  showAlertSuccessNombre() {
    return Swal.fire({
      title: 'Nombre editado con éxito!',
      icon: 'success',
      timer: 1000,
      showConfirmButton: false
    });
  }

  showAlertErrorNombre() {
    Swal.fire({
      title: 'Error al editar el nombre de perfil!',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }

  showAlertSuccessContra() {
    return Swal.fire({
      title: 'Contraseña editada con éxito!',
      icon: 'success',
      timer: 1000,
      showConfirmButton: false
    });
  }

  showAlertErrorContra() {
    Swal.fire({
      title: 'Error al editar la contraseña',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }
}

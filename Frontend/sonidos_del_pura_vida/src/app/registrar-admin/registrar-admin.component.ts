import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
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

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['',Validators.maxLength(255)]
  });


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



}

import { Component,Input, OnChanges, SimpleChanges } from '@angular/core';
import { Admin } from '../models/Admin.model';
import { PasarDatosService } from '../services/pasar-datos.service';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmar-edicion-admin',
  templateUrl: './confirmar-edicion-admin.component.html',
  styleUrl: './confirmar-edicion-admin.component.css'
})
export class ConfirmarEdicionAdminComponent implements OnChanges{
  @Input() admin!: Admin;
  private idAdmin: number = 2;

  nombre: string = '';
  email: string = '';
  password: string = '';
  constructor(private fb: FormBuilder, public pasarDatosService: PasarDatosService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['admin']) {
      this.nombre = this.admin.nombre;
      this.email = this.admin.correo;
      this.password = this.admin.password;
    }
  }

  desactivarEdicionDatosAdmin(){
   /// aqui desactivarla y que se nos active el de de ver información de admin
    this.pasarDatosService.setActivarInformacionAdmin(true);
  }

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
});


  async onSubmit() {

    if(this.form.valid){
      const motivo = this.form.get('motivo')?.value || '';
      console.log(motivo);

      this.showAlertLoad();
  }

}

  showAlertSuccess() {
    Swal.fire({
      title: 'Admin Eliminado',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    }).then(() => {
      window.location.reload();
    });
  }

  showAlertError() {
    Swal.fire({
      title: 'Error al eliminar el Admin',
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

}

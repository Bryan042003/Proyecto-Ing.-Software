import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  visible:boolean = true;
  changetype: boolean = true;

  constructor(private fb: FormBuilder,public pasarDatosService: PasarDatosService,private router:Router) { }

  form = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    if(this.form.valid){
      let formData = new FormData();
      formData.append('correo', this.form.get('correo')?.value || '');
      formData.append('password', this.form.get('password')?.value || '');
      this.pasarDatosService.authAdmin(formData).subscribe(
        (res: any) => {
          if(res.jwt){
            localStorage.setItem('jwt', res.jwt);
            localStorage.setItem('contraAdmin', this.form.value.password || '');
            this.showAlertSuccess().then(() => {
              this.router.navigate(['/dashboard']);
            });

          }
          else{
            this.showAlertError();
          }
        },
        (err) => {
          this.showAlertError();
        }
      );

    }
    else{
      this.showAlertError();
    }

  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  showAlertSuccess() {
    return Swal.fire({
      title: 'Aunteticación exitosa',
      icon: 'success',
      timer: 1000,
      showConfirmButton: false
    });

  }
  showAlertError() {
    Swal.fire({
      title: 'Correo o contraseña incorrectos',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }

}

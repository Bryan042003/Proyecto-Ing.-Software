import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { PasarDatosService } from '../services/pasar-datos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  visible:boolean = true;
  changetype: boolean = true;

  constructor(private fb: FormBuilder,public pasarDatosService: PasarDatosService) { }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    console.log('Formulario enviado');
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

}

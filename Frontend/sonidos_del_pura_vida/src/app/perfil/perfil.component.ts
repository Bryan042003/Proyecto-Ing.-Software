import { Component } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  constructor(private pasarDatosService:PasarDatosService){}

  admin = this.pasarDatosService.getAdminFromToken();
}

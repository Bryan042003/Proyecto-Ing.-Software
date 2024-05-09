import { Component, Input } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Admin } from '../models/Admin.model';


@Component({
  selector: 'app-card-admin',
  templateUrl: './card-admin.component.html',
  styleUrl: './card-admin.component.css'
})

export class CardAdminComponent {

  @Input() admin!: Admin;

  constructor(private pasarDatosService: PasarDatosService) { }

ubicarAdmin() {
    this.pasarDatosService.setAdmin(this.admin);
}


}

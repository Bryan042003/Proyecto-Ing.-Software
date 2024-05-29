import { Component, Input, OnChanges, OnInit} from '@angular/core';
import { Historial } from '../models/Historial.model';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Admin } from '../models/Admin.model';

@Component({
  selector: 'app-card-historial',
  templateUrl: './card-historial.component.html',
  styleUrls: ['./card-historial.component.css']
})
export class CardHistorialComponent implements OnInit {
  @Input() audiohistorial!: Historial;
  admin: Admin | undefined ;

  constructor(private pasarDatosService: PasarDatosService) { }

  ngOnInit(): void {
      this.getAdminById();
  }

  getAdminById() {
    this.pasarDatosService.getAdminById(String(this.audiohistorial.id_administrador)).subscribe(
      (res: any) => {
        this.admin = res;
      }
    );
  }
}
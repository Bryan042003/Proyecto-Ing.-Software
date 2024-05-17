import { Component,Input } from '@angular/core';
import { Historial } from '../models/Historial.model';

@Component({
  selector: 'app-card-historial',
  templateUrl: './card-historial.component.html',
  styleUrl: './card-historial.component.css'
})
export class CardHistorialComponent {
  @Input() audiohistorial!: Historial
  ;


}

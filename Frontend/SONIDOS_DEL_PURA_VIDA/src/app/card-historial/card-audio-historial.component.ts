import { Component, Input } from '@angular/core';
import{ Historial } from '../models/Historial.model';

@Component({
  selector: 'app-card-audio-historial',
  templateUrl: './card-audio-historial.component.html',
  styleUrl: './card-audio-historial.component.css'
})
export class CardAudioHistorialComponent {
  @Input() historial!: Historial;
  
}

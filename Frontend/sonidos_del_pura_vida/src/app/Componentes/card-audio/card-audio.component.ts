import { Component, Input } from '@angular/core';
import { Audio } from '../../models/Audio.model';
import { PasarDatosService } from '../../services/pasar-datos.service';

@Component({
  selector: 'app-card-audio',
  templateUrl: './card-audio.component.html',
  styleUrls: ['./card-audio.component.css']
})
export class CardAudioComponent {
  @Input() audio!: Audio;
  @Input() esAdmin!: boolean;

  constructor(private pasarDatosService: PasarDatosService) { }

ubicarAudio() {
    this.pasarDatosService.setAudio(this.audio);
}

}

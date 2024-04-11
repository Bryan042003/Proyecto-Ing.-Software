import { Component, Input } from '@angular/core';
import { Audio } from '../../models/Audio.model';

@Component({
  selector: 'app-card-audio',
  templateUrl: './card-audio.component.html',
  styleUrls: ['./card-audio.component.css']
})
export class CardAudioComponent {
  @Input() audio!: Audio;

}

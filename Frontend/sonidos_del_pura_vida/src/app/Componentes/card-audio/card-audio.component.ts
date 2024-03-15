import { Component, OnInit } from '@angular/core';
import { PasarDatosService } from '../../services/pasar-datos.service';
import { Audio } from '../../models/Audio.model';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-card-audio',
  templateUrl: './card-audio.component.html',
  styleUrl: './card-audio.component.css'
})
export class CardAudioComponent implements OnInit{

  audios:Audio[] = [];
  constructor(@Inject(PasarDatosService) private pasarDatosService: PasarDatosService) { }



  private cargarAudios(){
    this.pasarDatosService.getAudios().subscribe(
      (audios) => {
        this.audios = audios;
      }
    );
  }

/*
  deleteAudio(id:number){
    this.pasarDatosService.deleteAudio(id).subscribe();
    this.audios = this.audios.filter(audio => audio.id !== id);
  }


*/
  ngOnInit(): void {
    this.cargarAudios();
  }

}

import { Component, OnInit } from '@angular/core';
import { PasarDatosService } from '../../services/pasar-datos.service';
import { Audio } from '../../models/Audio.model';


@Component({
  selector: 'app-card-audio',
  templateUrl: './card-audio.component.html',
  styleUrl: './card-audio.component.css'
})
export class CardAudioComponent implements OnInit{

  audios:Audio[] = [];
  constructor(private pasarDatosService: PasarDatosService) { }

  ngOnInit(): void {
    this.cargarAudios();
  }

  private cargarAudios(){
    this.pasarDatosService.getAudios().subscribe(
      (res:any) => {
        console.log(res);
        this.audios = res;
      }
    );
  }

/*
  deleteAudio(id:number){
    this.pasarDatosService.deleteAudio(id).subscribe();
    this.audios = this.audios.filter(audio => audio.id !== id);
  }


*/

}

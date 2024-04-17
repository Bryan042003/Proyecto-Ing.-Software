import { Component, OnInit } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Audio } from '../models/Audio.model';
import { FormCrearAudioComponent } from '../form-crear-audio/form-crear-audio.component';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent implements OnInit {
  audios:Audio[] = [];
  audioU: any;

  constructor(public pasarDatosService: PasarDatosService) {}

  ngOnInit(): void {
    this.cargarAudios();
    this.audioU = this.pasarDatosService.getAudio();
  }

  private cargarAudios(){
    this.pasarDatosService.getAudios().subscribe(
      (res:any) => {
        console.log(res);
        this.audios = res;
      }
    );
  }





}

/*
  deleteAudio(id:number){
    this.pasarDatosService.deleteAudio(id).subscribe();
    this.audios = this.audios.filter(audio => audio.id !== id);
  }


*/


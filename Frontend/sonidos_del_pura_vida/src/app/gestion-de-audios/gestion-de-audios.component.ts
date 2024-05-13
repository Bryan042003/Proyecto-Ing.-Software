import { Component } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Audio } from '../models/Audio.model';

@Component({
  selector: 'app-gestion-de-audios',
  templateUrl: './gestion-de-audios.component.html',
  styleUrl: './gestion-de-audios.component.css'
})
export class GestionDeAudiosComponent {
  audios: Audio[] = [];

  audioPorPagina: number = 10;
  paginas: any[] = [];
  paginaActual: number = 0;
  activarVistaInformacionAudio: boolean = false;
  audioSeleccionado!: Audio;
  constructor(public pasarDatosService: PasarDatosService) { }
  ngOnInit() {
    this.cargarAudios();
  }

  paginateAudios() {
    this.paginaActual = 0;
    this.paginas = [];

    for (let i = 0; i < this.audios.length; i += this.audioPorPagina) {
      this.paginas.push(this.audios.slice(i, i + this.audioPorPagina));
    }
  }
  irAPagina(pagina: number) {
    this.paginaActual = pagina;
  }

  paginaAnterior() {
    if (this.paginaActual > 0) {
      this.paginaActual--;
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.paginas.length - 1) {
      this.paginaActual++;
    }
  }

  cargarAudios() {
    this.pasarDatosService.getAudios().subscribe(
      (res: any) => {
        this.audios = res;
        this.paginateAudios();
      }
    );
  }

  activarVistaInfoAudio(audio: Audio) {
    this.audioSeleccionado = audio;
    console.log(this.audioSeleccionado);
    console.log(this.activarVistaInformacionAudio);
    this.activarVistaInformacionAudio = true;
  }

}

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
  opcionElegida: string = 'Ordenar por:';

  flagConfirmarEliminar = false;
  flagConfirmarEdicionDatos = false;

  constructor(public pasarDatosService: PasarDatosService) { }
  ngOnInit() {
    this.cargarAudios();

    this.pasarDatosService.getFlagEditarAudio().subscribe(flag => {
      this.activarVistaInformacionAudio = flag;
    });

    this.pasarDatosService.getFlagConfirmarEliminacion().subscribe(flag => {
      this.flagConfirmarEliminar = flag;
    });

    this.pasarDatosService.getFlagEditarDatosAudio().subscribe(flag => {
      this.flagConfirmarEdicionDatos = flag;
      console.log(" flag de edicion de datos:");
      console.log(this.flagConfirmarEdicionDatos);
    });

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
    this.activarVistaInformacionAudio = true;

  }


  filtros(): void {
    const tipoFiltro = this.pasarDatosService.getTipoFiltro();
    const datoFiltrar = this.pasarDatosService.getDatoFiltrar();

    switch (tipoFiltro) {
      case 'A → Z':
        this.audios.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;

      case 'Z → A':
        this.audios.sort((a, b) => b.titulo.localeCompare(a.titulo));
        break;

      case 'Más reciente':
        this.audios.sort((a, b) => b.fecha_registro.localeCompare(a.fecha_registro));
        break;

      case 'Más antiguo':
        this.audios.sort((a, b) => a.fecha_registro.localeCompare(b.fecha_registro));
        break;

      default:
        break;
    }
    this.paginateAudios();
  }

  
  filtrando(tipoFiltrar: string) {
    this.opcionElegida = tipoFiltrar;
    this.pasarDatosService.setTipoFiltro(tipoFiltrar);
    this.filtros();
  }

  cerrarEditar(){
    this.pasarDatosService.setFlagEditarAudio(false);
  }

}

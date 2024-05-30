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
  paginaGrupoActual: number = 0;
  paginasPorGrupo: number = 5;
  maximoGrupos: number = 0;



  activarVistaInformacionAudio: boolean = false;
  audioSeleccionado!: Audio;
  opcionElegida: string = 'Ordenar por:';

  flagConfirmarEliminar = false;
  flagConfirmarEdicionDatos = false;

  constructor(public pasarDatosService: PasarDatosService) { }
  ngOnInit() {
    this.cargarAudios();
    this.pasarDatosService.setFlagConfirmarEliminacion(false);
    this.pasarDatosService.setFlagEditarDatosAudio(false);

    this.pasarDatosService.getFlagEditarAudio().subscribe(flag => {
      this.activarVistaInformacionAudio = flag;
    });

    this.pasarDatosService.getFlagConfirmarEliminacion().subscribe(flag => {
      this.flagConfirmarEliminar = flag;
    });

    this.pasarDatosService.getFlagEditarDatosAudio().subscribe(flag => {
      this.flagConfirmarEdicionDatos = flag;
     
    });



  }

  paginateAudios() {
    this.paginaActual = 0;
    this.paginas = [];

    for (let i = 0; i < this.audios.length; i += this.audioPorPagina) {
      this.paginas.push(this.audios.slice(i, i + this.audioPorPagina));
    }
    this.maximoGrupos = Math.ceil(this.paginas.length / this.paginasPorGrupo); // Número de grupos de páginas
  }
  irAPagina(pagina: number) {
    this.paginaActual = pagina;
    this.paginaGrupoActual = Math.floor(this.paginaActual / this.paginasPorGrupo); // Actualizar el grupo de páginas

  }

  paginaAnterior() {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.paginaGrupoActual = Math.floor(this.paginaActual / this.paginasPorGrupo);

    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.paginas.length - 1) {
      this.paginaActual++;
      this.paginaGrupoActual = Math.floor(this.paginaActual / this.paginasPorGrupo);

    }
  }

  // Métodos para cambiar de grupo de páginas
  grupoAnterior() {
    if (this.paginaGrupoActual > 0) {
      this.paginaGrupoActual--;
    }
  }

  grupoSiguiente() {
    if (this.paginaGrupoActual < this.maximoGrupos - 1) {
      this.paginaGrupoActual++;
    }
  }

  // Obtener las páginas del grupo actual
  getPaginasGrupoActual(): number[] {
    const inicio = this.paginaGrupoActual * this.paginasPorGrupo;
    const fin = inicio + this.paginasPorGrupo;
    return this.paginas.slice(inicio, fin).map((_, i) => inicio + i); // Devolver un array con las páginas del grupo actual
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

  cerrarEditar() {
    this.pasarDatosService.setFlagEditarAudio(false);
  }

}

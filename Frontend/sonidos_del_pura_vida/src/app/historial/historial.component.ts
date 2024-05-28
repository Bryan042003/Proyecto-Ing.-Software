import { Component } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Historial } from '../models/Historial.model';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {


  historial: Historial[] = [];

  audioPorPagina: number = 10;
  paginas: any[] = [];
  paginaActual: number = 0;
  paginaGrupoActual: number = 0;
  paginasPorGrupo: number = 5;
  maximoGrupos: number = 0;

  activarVistaInformacionAudio: boolean = false;
  opcionElegida: string = 'Ordenar por:';
  opcionElegidaHistorial: string = 'Filtrar por acción:';
  estadoFiltroAccion: boolean = false;
  estadoFiltroFecha: boolean = false;
  audiosFiltradosAccion: Historial[] = [];
  audiosFiltradosFecha: Historial[] = [];
  filtradoAccion: string = 'Accion';
  startDate: string | undefined;
  endDate: string | undefined;

  constructor(public pasarDatosService: PasarDatosService) { }
  ngOnInit() {
    this.cargarHistorial();
  }

  paginateHistorial() {
    this.paginaActual = 0;
    this.paginas = [];
    
    const listaHistorial = this.estadoFiltroFecha ? this.audiosFiltradosFecha : (this.estadoFiltroAccion ? this.audiosFiltradosAccion : this.historial);

    for (let i = 0; i < listaHistorial.length; i += this.audioPorPagina) {
      this.paginas.push(listaHistorial.slice(i, i + this.audioPorPagina));
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

  cargarHistorial() {
    this.pasarDatosService.getHistorial().subscribe(
      (res: any) => {
        this.historial = res;
        this.paginateHistorial();
      }
    );
  }

  filtros(): void {
    const tipoFiltro = this.pasarDatosService.getTipoFiltro();
    switch (tipoFiltro) {
      case 'A → Z':
        this.historial.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;

      case 'Z → A':
        this.historial.sort((a, b) => b.titulo.localeCompare(a.titulo));
        break;

      case 'Más reciente':
        this.historial.sort((a, b) => b.fecha_accion.toString().localeCompare(a.fecha_accion.toString()));
        break;

      case 'Más antiguo':
        this.historial.sort((a, b) => a.fecha_accion.toString().localeCompare(b.fecha_accion.toString()));
        break;

      case 'Modificado':
        if (this.estadoFiltroAccion === false) {
          this.audiosFiltradosAccion = [];
        } else {
          this.audiosFiltradosAccion = this.historial.filter(historial => historial.accion === tipoFiltro);
        }
        break;
      case 'Eliminado':
        if (this.estadoFiltroAccion === false) {
          this.audiosFiltradosAccion = [];
        } else {
          this.audiosFiltradosAccion = this.historial.filter(historial => historial.accion === tipoFiltro);
        }
        break;

      default:
        break;
    }

    this.paginateHistorial();
  }

  filtrando(tipoFiltrar: string) {
    this.opcionElegida = tipoFiltrar;
    this.pasarDatosService.setTipoFiltro(tipoFiltrar);
    this.filtros();
  }

  filtrandoAccion(tipoFiltrar: string) {
    this.opcionElegidaHistorial = tipoFiltrar;
    this.estadoFiltroAccion = true;
    this.estadoFiltroFecha = false;
    this.pasarDatosService.setTipoFiltro(tipoFiltrar);
    this.filtros();
  }

  eliminarFiltrosHistorial() {
    this.estadoFiltroAccion = false;
    
    this.paginateHistorial();
  }

  eliminarFiltrosFecha() {
    this.estadoFiltroFecha = false;
    this.startDate = '';
    this.endDate = '';
    this.paginateHistorial();
  }

  filtrarPorFecha(startDate: string, endDate: string): void {
    console.log(startDate, endDate);
    this.estadoFiltroFecha = true;
    this.estadoFiltroAccion = false;
    this.audiosFiltradosFecha = this.historial.filter(historial => {
      const fechaAccion = historial.fecha_accion.toString().split(' ')[0];
      return fechaAccion >= startDate && fechaAccion <= endDate;
    });
    this.paginateHistorial();
  }
}

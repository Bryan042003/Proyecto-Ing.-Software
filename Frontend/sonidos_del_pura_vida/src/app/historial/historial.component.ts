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
  activarVistaInformacionAudio: boolean = false;
  opcionElegida: string = 'Ordenar por:';

  constructor(public pasarDatosService: PasarDatosService) { }
  ngOnInit() {
    this.cargarHistorial();
  }

  paginateHistorial() {
    this.paginaActual = 0;
    this.paginas = [];

    for (let i = 0; i < this.historial.length; i += this.audioPorPagina) {
      this.paginas.push(this.historial.slice(i, i + this.audioPorPagina));
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
    const datoFiltrar = this.pasarDatosService.getDatoFiltrar();

    switch (tipoFiltro) {
      case 'A → Z':
        this.historial.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;

      case 'Z → A':
        this.historial.sort((a, b) => b.titulo.localeCompare(a.titulo));
        break;

      case 'Más reciente':
        this.historial.sort((a, b) => b.fecha_accion.localeCompare(a.fecha_accion));
        break;

      case 'Más antiguo':
        this.historial.sort((a, b) => a.fecha_accion.localeCompare(b.fecha_accion));
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


}

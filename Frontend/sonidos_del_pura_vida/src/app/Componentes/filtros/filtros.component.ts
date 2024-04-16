import { Component } from '@angular/core';
import { PasarDatosService } from '../../services/pasar-datos.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent {
  constructor(public pasarDatosService: PasarDatosService) {}
  estadoFiltroAutor:boolean = false;
  estadoFiltroTitulo:boolean = false;
  estadoFiltro:boolean = false;

  activarFiltro(tipoFiltro:string, filtrar:string, estado:boolean):void {
    this.pasarDatosService.setTipoFiltro(tipoFiltro);
    this.pasarDatosService.setDatoFiltrar(filtrar);
    this.pasarDatosService.setEstadoFiltro(estado);
    switch(tipoFiltro) {

      case 'autor':
        this.estadoFiltroAutor = estado;
        break;

      case 'titulo':
        this.estadoFiltroTitulo = estado;
        break;
    }
  }

  desactivarFiltro(desactivarFiltro:string): void {

    switch(desactivarFiltro) {

      case 'autor':
        this.estadoFiltroAutor = false;
        this.estadoFiltro = false;
        this.pasarDatosService.setEstadoFiltro(false);
        break;

      case 'titulo':
        this.estadoFiltroTitulo = false;
        this.estadoFiltro = false;
        this.pasarDatosService.setEstadoFiltro(false);
        break;
    }
    
  }
}

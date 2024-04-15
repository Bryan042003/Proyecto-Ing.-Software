import { Component } from '@angular/core';
import { PasarDatosService } from '../../services/pasar-datos.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent {
  constructor(public pasarDatosService: PasarDatosService) {}
  estadoFiltro:boolean = false;  

  activarFiltro(tipoFiltro:string, filtrar:string, estado:boolean):void {
    this.pasarDatosService.setTipoFiltro(tipoFiltro);
    this.pasarDatosService.setDatoFiltrar(filtrar);
    this.pasarDatosService.setEstadoFiltro(estado);
    this.estadoFiltro = estado;
  }

  desactivarFiltro():void {
    this.pasarDatosService.setEstadoFiltro(false);
    this.estadoFiltro = false;
  }
}

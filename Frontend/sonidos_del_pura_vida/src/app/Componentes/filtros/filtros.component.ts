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
  estadoFiltradoProvincia:boolean = false;
  estadoFiltro:boolean = false;
  public provinciaSanJose: boolean = false;
  public provinciaAlajuela: boolean = false;
  public provinciaGuanacaste: boolean = false;
  public provinciaLimon: boolean = false;
  public provinciaHeredia: boolean = false;
  public provinciaPuntarenas: boolean = false;
  public provinciaCartago: boolean = false;

  activarFiltro(tipoFiltro:string, filtrar:string):void {
    this.pasarDatosService.setTipoFiltro(tipoFiltro);
    this.pasarDatosService.setDatoFiltrar(filtrar);
    
    let estado = filtrar !== '';

    switch(tipoFiltro) {
      case 'autor':
        this.estadoFiltroAutor = estado;
        this.estadoFiltro = estado;
        break;

      case 'titulo':
        this.estadoFiltroTitulo = estado;
        this.estadoFiltro = estado;
        
        break;

      case 'provincia':
        this.estadoFiltradoProvincia = estado;
        this.estadoFiltro = estado;
        break;
    }

    this.pasarDatosService.setEstadoFiltro(this.estadoFiltro);
}

}

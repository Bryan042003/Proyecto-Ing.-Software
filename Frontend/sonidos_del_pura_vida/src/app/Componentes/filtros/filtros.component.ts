import { Component } from '@angular/core';
import { PasarDatosService } from '../../services/pasar-datos.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent {
  constructor(public pasarDatosService: PasarDatosService) { }
  estadoFiltroAutor: boolean = false;
  estadoFiltroTitulo: boolean = false;
  estadoFiltradoProvincia: boolean = false;
  estadoFiltro: boolean = false;
  estadoFiltradoCanton: boolean = false;
  public provinciaSanJose: boolean = false;
  public provinciaAlajuela: boolean = false;
  public provinciaGuanacaste: boolean = false;
  public provinciaLimon: boolean = false;
  public provinciaHeredia: boolean = false;
  public provinciaPuntarenas: boolean = false;
  public provinciaCartago: boolean = false;

  cantones: any[] = [];

  activarFiltro(tipoFiltro: string, filtrar: string): void {
    this.pasarDatosService.setTipoFiltro(tipoFiltro);
    this.pasarDatosService.setDatoFiltrar(filtrar);

    let estado = filtrar !== '';

    switch (tipoFiltro) {
      case 'autor':
        
        this.estadoFiltroAutor = estado;
        this.pasarDatosService.setEstadoFiltroAutor(this.estadoFiltroAutor);
        break;

      case 'titulo':
        this.estadoFiltroTitulo = estado;
        this.pasarDatosService.setEstadoFiltroTitulo(this.estadoFiltroAutor);
        break;

      case 'provincia':
        this.estadoFiltradoProvincia = estado;
        this.pasarDatosService.setEstadoFiltroProvincia(this.estadoFiltroAutor);

        break;

      case 'canton':
        this.estadoFiltradoCanton = estado;
        this.pasarDatosService.setEstadoFiltroCanton(this.estadoFiltroAutor);

        break;
    }

    if (this.estadoFiltradoProvincia || this.estadoFiltradoCanton || this.estadoFiltroAutor || this.estadoFiltroTitulo) {
      this.pasarDatosService.setEstadoFiltro(true);
    }else{
      this.pasarDatosService.setEstadoFiltro(false);
    }
  }

  cargarCantones(idProvincia: string) {
    this.pasarDatosService.getCantones(idProvincia).subscribe(
      (res: any) => {
        this.cantones = res;
      }
    );
  }


}

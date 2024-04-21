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

  isEmptyOrWhitespace(str: string): boolean {
    return !str || !str.trim();
  }

  activarFiltro(tipoFiltro: string, filtrar: string): void {
    this.pasarDatosService.setTipoFiltro(tipoFiltro);
    this.pasarDatosService.setDatoFiltrar(filtrar);

    let estado = filtrar !== '';
    console.log("estado: " + estado);
    console.log("tipoFiltro: " + tipoFiltro);
    console.log("dato: " + filtrar);

    if (!this.isEmptyOrWhitespace(filtrar)) {
      console.log("entrooooo");
      if (tipoFiltro == 'autor') {
        this.estadoFiltroAutor = estado;
        this.pasarDatosService.setEstadoFiltroAutor(this.estadoFiltroAutor);
      }
      if (tipoFiltro == 'titulo') {
        this.estadoFiltroTitulo = estado;
        this.pasarDatosService.setEstadoFiltroTitulo(this.estadoFiltroTitulo);
      }
      if (tipoFiltro == 'provincia') {
        console.log("entrooooo provincia");
        this.estadoFiltradoProvincia = estado;
        this.pasarDatosService.setEstadoFiltroProvincia(this.estadoFiltradoProvincia);
      }
      if (tipoFiltro == 'canton') {
        this.estadoFiltradoCanton = estado;
        this.pasarDatosService.setEstadoFiltroCanton(this.estadoFiltradoCanton);
      }
    } else {

      if (tipoFiltro == 'autor') {
        this.estadoFiltroAutor = false;
        this.pasarDatosService.setEstadoFiltroAutor(this.estadoFiltroAutor);
      }

      if (tipoFiltro == 'titulo') {
        this.estadoFiltroTitulo = false;
        this.pasarDatosService.setEstadoFiltroTitulo(this.estadoFiltroTitulo);
      }
      if (tipoFiltro == 'canton') {
        console.log("entrooooo canton quitado");
        this.estadoFiltradoCanton = false;
        this.pasarDatosService.setEstadoFiltroCanton(this.estadoFiltradoCanton);

      }
      if (tipoFiltro == 'provincia') {
        console.log("entrooooo provincia quitado");
        this.estadoFiltradoProvincia = false;
        this.pasarDatosService.setEstadoFiltroProvincia(this.estadoFiltradoProvincia);

      }
    }

    if (this.estadoFiltradoProvincia || this.estadoFiltradoCanton || this.estadoFiltroAutor || this.estadoFiltroTitulo) {

      this.pasarDatosService.setEstadoFiltro(true);
    } else {
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

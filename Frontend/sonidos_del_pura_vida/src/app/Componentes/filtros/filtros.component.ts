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
  public cantonSeleccionado: boolean = false;

  public provinciaGuardada: string = '';

  cantones: any[] = [];

  isEmptyOrWhitespace(str: string): boolean {
    return !str || !str.trim();
  }

  verificandoCantonEsSeleccionado(tipoCanton: string, cantonNombre: string, seleccionado: boolean) {
    if (seleccionado) {
      this.activarFiltro(tipoCanton, cantonNombre);
      //console.log('El checkbox ' + cantonNombre + ' está seleccionado');
    } else {
      this.activarFiltro("provincia", this.provinciaGuardada);
      //console.log('El checkbox ' + cantonNombre + ' no está seleccionado');
    }
}

  activarFiltro(tipoFiltro: string, filtrar: string): void {
    this.pasarDatosService.setTipoFiltro(tipoFiltro);
    this.pasarDatosService.setDatoFiltrar(filtrar);

    let estado = filtrar !== '';
    console.log("estado: " + estado);
    console.log("tipoFiltro en activar filtro: " + tipoFiltro);
    console.log("dato: " + filtrar);

    if (!this.isEmptyOrWhitespace(filtrar)) {
      console.log("entramos a activar filtos");
      if (tipoFiltro == 'autor') {
        this.estadoFiltroAutor = estado;
        this.pasarDatosService.setEstadoFiltroAutor(this.estadoFiltroAutor);
      }
      if (tipoFiltro == 'titulo') {
        this.estadoFiltroTitulo = estado;
        this.pasarDatosService.setEstadoFiltroTitulo(this.estadoFiltroTitulo);
      }
      if (tipoFiltro == 'provincia') {
        this.provinciaGuardada = filtrar;
        console.log("entrooooo provincia");
        this.estadoFiltradoProvincia = estado;
        this.pasarDatosService.setEstadoFiltroProvincia(this.estadoFiltradoProvincia);
      }

      if (tipoFiltro == 'canton') {
        console.log("entrooooo canton");
        console.log("Estado provincia:");
        console.log(this.pasarDatosService.getEstadoFiltroProvincia());
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
        this.provinciaGuardada = '';
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

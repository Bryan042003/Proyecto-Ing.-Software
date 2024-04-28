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
  public checkbox: boolean = false;

  public provinciaGuardada: string = '';

  cantones: any[] = [];
  PROVI: any[] = [];
  provinciaList: any[] = [];
  cantonList: any[] = [];
  proviSeleccionadas: any[] = [];
  checkboxes = [];


  isEmptyOrWhitespace(str: string): boolean {
    return !str || !str.trim();
  }

  verificandoProvinciaEsSeleccionada(){
    if (this.provinciaSanJose && !this.provinciaList.includes("San José")){
      this.provinciaList.push("San José");
      this.proviSeleccionadas.push("1");
    } else if (!this.provinciaSanJose) {
      const index = this.provinciaList.indexOf("San José");
      if (index > -1) {
        this.provinciaList.splice(index, 1);
      }
      const indexC = this.proviSeleccionadas.indexOf("1");
      if (index > -1) {
        this.proviSeleccionadas.splice(index, 1);
      }
    }
    if (this.provinciaAlajuela && !this.provinciaList.includes("Alajuela")){
      this.provinciaList.push("Alajuela");
      this.proviSeleccionadas.push("2");
    } else if (!this.provinciaAlajuela) {
      const index = this.provinciaList.indexOf("Alajuela");
      if (index > -1) {
        this.provinciaList.splice(index, 1);
      }
      const indexC = this.proviSeleccionadas.indexOf("2");
      if (index > -1) {
        this.proviSeleccionadas.splice(index, 1);
      }
    }
    if (this.provinciaGuanacaste && !this.provinciaList.includes("Guanacaste")){
      this.provinciaList.push("Guanacaste");
      this.proviSeleccionadas.push("5");
    } else if (!this.provinciaGuanacaste) {
      const index = this.provinciaList.indexOf("Guanacaste");
      if (index > -1) {
        this.provinciaList.splice(index, 1);
      }
      const indexC = this.proviSeleccionadas.indexOf("5");
      if (index > -1) {
        this.proviSeleccionadas.splice(index, 1);
      }
    }
    if (this.provinciaLimon && !this.provinciaList.includes("Limón")){
      this.provinciaList.push("Limón");
      this.proviSeleccionadas.push("7");
    } else if (!this.provinciaLimon) {
      const index = this.provinciaList.indexOf("Limón");
      if (index > -1) {
        this.provinciaList.splice(index, 1);
      }
      const indexC = this.proviSeleccionadas.indexOf("7");
      if (index > -1) {
        this.proviSeleccionadas.splice(index, 1);
      }
    }
    if (this.provinciaHeredia && !this.provinciaList.includes("Heredia")){
      this.provinciaList.push("Heredia");
      this.proviSeleccionadas.push("4");
    } else if (!this.provinciaHeredia) {
      const index = this.provinciaList.indexOf("Heredia");
      if (index > -1) {
        this.provinciaList.splice(index, 1);
      }
      const indexC = this.proviSeleccionadas.indexOf("4");
      if (index > -1) {
        this.proviSeleccionadas.splice(index, 1);
      }
    }
    if (this.provinciaPuntarenas && !this.provinciaList.includes("Puntarenas")){
      this.provinciaList.push("Puntarenas");
      this.proviSeleccionadas.push("6");
    } else if (!this.provinciaPuntarenas) {
      const index = this.provinciaList.indexOf("Puntarenas");
      if (index > -1) {
        this.provinciaList.splice(index, 1);
      }
      const indexC = this.proviSeleccionadas.indexOf("6");
      if (index > -1) {
        this.proviSeleccionadas.splice(index, 1);
      }
    }
    if (this.provinciaCartago && !this.provinciaList.includes("Cartago")){
      this.provinciaList.push("Cartago");
      this.proviSeleccionadas.push("3");
    } else if (!this.provinciaCartago) {
      const index = this.provinciaList.indexOf("Cartago");
      if (index > -1) {
        this.provinciaList.splice(index, 1);
      }
      const indexC = this.proviSeleccionadas.indexOf("3");
      if (index > -1) {
        this.proviSeleccionadas.splice(index, 1);
      }
    }

  }

  verificandoCantonEsSeleccionada(filtrar: string){
    if (this.estadoFiltradoCanton && !this.cantonList.includes(filtrar)) {
      this.cantonList.push(filtrar);
    } else {
      const index = this.cantonList.indexOf(filtrar);
      if (index > -1) {
        this.cantonList.splice(index, 1);
      }
    }
    this.pasarDatosService.setCantonList(this.cantonList);

  }

  activarFiltro(tipoFiltro: string, filtrar: string): void {
    this.verificandoProvinciaEsSeleccionada();
    this.pasarDatosService.setProvinciaList(this.provinciaList);
    this.pasarDatosService.setTipoFiltro(tipoFiltro);
    this.pasarDatosService.setDatoFiltrar(filtrar);

    let estado = filtrar !== '';

    if (!this.isEmptyOrWhitespace(filtrar)) {
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
        this.estadoFiltradoProvincia = estado;
        this.pasarDatosService.setEstadoFiltroProvincia(this.estadoFiltradoProvincia);
      }
      if (tipoFiltro == 'canton') {
        this.estadoFiltradoCanton = estado;
        this.pasarDatosService.setEstadoFiltroCanton(this.estadoFiltradoCanton);
        this.verificandoCantonEsSeleccionada(filtrar);
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
          if(this.pasarDatosService.getProvinciaList().length == 1){
            this.estadoFiltradoCanton = true;
            this.verificandoCantonEsSeleccionada(filtrar);
          } else {
            this.estadoFiltradoCanton = false;
          }
          this.pasarDatosService.setEstadoFiltroCanton(this.estadoFiltradoCanton);
      }
      if (tipoFiltro == 'provincia') {
        this.provinciaGuardada = '';
        if(this.pasarDatosService.getProvinciaList().length > 0){
          this.estadoFiltradoProvincia = true;
        } else {
          this.estadoFiltradoProvincia = false;
          this.estadoFiltradoCanton = false;
         }
        this.pasarDatosService.setEstadoFiltroProvincia(this.estadoFiltradoProvincia);
      }
    }

    if (this.estadoFiltradoProvincia || this.estadoFiltradoCanton || this.estadoFiltroAutor || this.estadoFiltroTitulo) {
      this.pasarDatosService.setEstadoFiltro(true);
    } else {
      this.pasarDatosService.setEstadoFiltro(false);
    }

    this.cargarCantones(this.proviSeleccionadas[0]);
  }

  cargarCantones(idProvincia: string) {
    this.pasarDatosService.getCantones(idProvincia).subscribe(
        (res: any) => {
          this.cantones = res;
        }
    );
  }
}

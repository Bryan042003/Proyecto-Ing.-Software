import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Audio } from '../models/Audio.model';
import { FormCrearAudioComponent } from '../form-crear-audio/form-crear-audio.component';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent implements OnInit {
  audios: Audio[] = [];

  audiosFilter: Audio[] = [];
  audiosFiltradosProvincia: Audio[] = [];
  audiosFiltradosCanton: Audio[] = [];
  audiosFiltradosAutor: Audio[] = [];
  audiosFiltradosTitulo: Audio[] = [];

  estadoFiltro: boolean = false;
  opcionElegida: string = 'Ordenar por:';

  constructor(public pasarDatosService: PasarDatosService) { }

  ngOnInit() {
    this.cargarAudios();

    this.pasarDatosService.getEstadoFiltro().subscribe(estadoFiltro => {
      this.estadoFiltro = estadoFiltro;
      this.limpiarFiltros();
      this.filtros();

    });


  }

  private cargarAudios() {
    this.pasarDatosService.getAudios().subscribe(
      (res: any) => {
        this.audios = res;
      }
    );
  }


  limpiarFiltros(){
    
    if(this.pasarDatosService.getEstadoFiltroAutor()){
      this.audiosFiltradosAutor = [];
    }
    if(this.pasarDatosService.getEstadoFiltroProvincia()){
      this.audiosFiltradosProvincia = [];
    }
    if(this.pasarDatosService.getEstadoFiltroCanton()){
      this.audiosFiltradosCanton = [];
    }
    if(this.pasarDatosService.getEstadoFiltroTitulo()){
      this.audiosFiltradosTitulo = [];
    }
  }

  filtros(): void {
    const tipoFiltro = this.pasarDatosService.getTipoFiltro();
    const datoFiltrar = this.pasarDatosService.getDatoFiltrar();



    switch (tipoFiltro) {
      case 'provincia':
        this.audiosFiltradosProvincia =[];
        this.audiosFiltradosProvincia = this.audios.filter(audio => audio.provincia.toLowerCase().includes(datoFiltrar.toLowerCase()));

        break;

      case 'autor':
        this.audiosFiltradosAutor =[];
        this.audiosFiltradosAutor= this.audios.filter(audio => audio.autor.toLowerCase().includes(datoFiltrar.toLowerCase()));

        break;

      case 'titulo':
        this.audiosFiltradosTitulo =[];
        this.audiosFiltradosTitulo = this.audios.filter(audio => audio.titulo.toLowerCase().includes(datoFiltrar.toLowerCase()));

        break;

      case 'canton':
        this.audiosFiltradosCanton =[];
        this.audiosFiltradosCanton = this.audios.filter(audio => audio.canton.toLowerCase().includes(datoFiltrar.toLowerCase()));

        break;

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
    // Hacer un match de todas las listas de filtros
    const allFilteredAudios = [this.audiosFiltradosProvincia, this.audiosFiltradosAutor, this.audiosFiltradosTitulo, this.audiosFiltradosCanton];
    this.audiosFilter = this.audios.filter(audio => allFilteredAudios.every(filteredAudios => filteredAudios.length === 0 || filteredAudios.some(filteredAudio => filteredAudio.id === audio.id)));
    this.pasarDatosService.setListaAudios(this.audiosFilter);

    console.log("-------------------------------------------------------------");

    console.log("audios filtradosProvincia");
    console.log(this.audiosFiltradosProvincia);
    console.log("audios filtradosCanton");
    console.log(this.audiosFiltradosCanton);
    console.log("audios filtradosAutor");
    console.log(this.audiosFiltradosAutor);
    console.log("audios filtradosTitulo");
    console.log(this.audiosFiltradosTitulo);
    console.log("audios filtrados");
    console.log(this.audiosFilter);


    console.log("-------------------------------------------------------------");

  }

  filtrando(tipoFiltrar: string) {
    this.opcionElegida = tipoFiltrar;
    this.pasarDatosService.setTipoFiltro(tipoFiltrar);
    this.filtros();
  }

}


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

  pList: any[] = [];
  estadoFiltro: boolean = false;
  opcionElegida: string = 'Ordenar por:';

  constructor(public pasarDatosService: PasarDatosService) { }

  ngOnInit() {
    this.cargarAudios();

    this.pasarDatosService.getEstadoFiltro().subscribe(estadoFiltro => {
      this.estadoFiltro = estadoFiltro;
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

  filtros(): void {
    const tipoFiltro = this.pasarDatosService.getTipoFiltro();
    const datoFiltrar = this.pasarDatosService.getDatoFiltrar();

    switch (tipoFiltro) {
      case 'canton':
        this.pasarDatosService.getEstadoFiltroCanton().subscribe(estadoFiltroCanton => {
          if (estadoFiltroCanton === false) {
            this.audiosFiltradosCanton = [];
          } else {
            this.audiosFiltradosCanton = this.audios.filter(audio => audio.canton.toLowerCase().includes(datoFiltrar.toLowerCase()));
          }
        });
        break;

      case 'provincia':
        this.pasarDatosService.getEstadoFiltroProvincia().subscribe(estadoFiltroProvincia => {
          this.pList = this.pasarDatosService.getProvinciaList();
          if (this.pList.length === 0) {
            this.audiosFiltradosProvincia = [];
          } else {
            this.audiosFiltradosCanton = [];

            this.pList.forEach((provincia) => {
              let nuevosAudiosFiltrados = this.audios.filter(audio => audio.provincia.toLowerCase().includes(provincia.toLowerCase()));
              this.audiosFiltradosProvincia = this.audiosFiltradosProvincia.concat(nuevosAudiosFiltrados);
            });

            this.audiosFiltradosProvincia = this.audiosFiltradosProvincia.filter(audio => {
              return this.pList.some(provincia => provincia.toLowerCase() === audio.provincia.toLowerCase());
            });

          }
        });
        break;

      case 'autor':
        this.pasarDatosService.getEstadoFiltroAutor().subscribe(estadoFiltroAutor => {
          if (estadoFiltroAutor === false) {
            this.audiosFiltradosAutor = [];
          } else {
            this.audiosFiltradosAutor = this.audios.filter(audio => audio.autor.toLowerCase().includes(datoFiltrar.toLowerCase()));
          }
        });
        break;

      case 'titulo':
        this.pasarDatosService.getEstadoFiltroTitulo().subscribe(estadoFiltroTitulo => {
          if (estadoFiltroTitulo === false) {
            this.audiosFiltradosTitulo = [];
          } else {
            this.audiosFiltradosTitulo = this.audios.filter(audio => audio.titulo.toLowerCase().includes(datoFiltrar.toLowerCase()));
          }
        });
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
  }

  filtrando(tipoFiltrar: string) {
    this.opcionElegida = tipoFiltrar;
    this.pasarDatosService.setTipoFiltro(tipoFiltrar);
    this.filtros();
  }

}


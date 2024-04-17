import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Audio } from '../models/Audio.model';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent implements OnInit {
  audios:Audio[] = [];

  audiosFilter: Audio[] = [];
  estadoFiltro:boolean = false;

  constructor(public pasarDatosService: PasarDatosService) {}

  ngOnInit() {
    this.cargarAudios();

    this.pasarDatosService.getEstadoFiltro().subscribe(estadoFiltro => {
      this.estadoFiltro = estadoFiltro;
      this.filtros();
    });
  

  }

  private cargarAudios(){
    this.pasarDatosService.getAudios().subscribe(
      (res:any) => {
        console.log(res);
        this.audios = res;
      }
    );
  }
  

  filtros():void {
    this.audiosFilter = [];
    const tipoFiltro = this.pasarDatosService.getTipoFiltro();
    const  datoFiltrar = this.pasarDatosService.getDatoFiltrar();

    switch (tipoFiltro) {
      case 'provincia':
        this.audiosFilter = this.audios.filter(audio => audio.provincia.toLowerCase().includes(datoFiltrar.toLowerCase()));
        this.pasarDatosService.setListaAudios(this.audiosFilter);
        break;

      case 'autor':
        this.audiosFilter = this.audios.filter(audio => audio.autor.toLowerCase().includes(datoFiltrar.toLowerCase())); 
        this.pasarDatosService.setListaAudios(this.audiosFilter);
        break;

      case 'titulo':
        this.audiosFilter = this.audios.filter(audio => audio.titulo.toLowerCase().includes(datoFiltrar.toLowerCase()));
        this.pasarDatosService.setListaAudios(this.audiosFilter);
        break;

      case 'canton':
        this.audiosFilter = this.audios.filter(audio => audio.canton.toLowerCase().includes(datoFiltrar.toLowerCase()));
        this.pasarDatosService.setListaAudios(this.audiosFilter);
        break;

      default:
        break;
    }
  }

}


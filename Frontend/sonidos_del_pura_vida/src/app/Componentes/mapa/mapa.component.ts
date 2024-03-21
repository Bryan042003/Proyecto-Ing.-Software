import { Component } from '@angular/core';
import { Map, tileLayer, Marker } from 'leaflet';
import { PasarDatosService } from '../../services/pasar-datos.service';
import { Audio } from '../../models/Audio.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements OnInit {
  audios: Audio[] = [];
  constructor(private pasarDatosService: PasarDatosService) { }

  private cargarAudios() {
    this.pasarDatosService.getAudios().subscribe(
      (res: any) => {
        this.audios = res;
        console.log("cargando audios");
        console.log(res);
        this.cargarMapa();
      }
    );
  }

  private cargarMapa() {
    console.log("En cargando mapa");
    console.log(this.audios);

    const map = new Map('map').setView([9.9634, -84.1003], 9);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    this.audios.forEach(audio => {
      console.log(audio.latitud, audio.longitud);
      let latitud = parseFloat(audio.latitud);
      let longitud = parseFloat(audio.longitud);
      const marker = new Marker([latitud, longitud]).addTo(map);
      marker.bindPopup("<b>Titulo: " + audio.titulo + "</b><br>Autor: " + audio.autor);
    });
  }

  ngOnInit(): void {
    console.log("antes de cargar audios");
    console.log(this.audios);
    this.cargarAudios();
    console.log("despues de cargar audios");
    console.log(this.audios);
  }

}

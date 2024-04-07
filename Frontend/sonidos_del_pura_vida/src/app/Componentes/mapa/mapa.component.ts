import { Component } from '@angular/core';
import { Map, tileLayer, Marker, MarkerClusterGroup } from 'leaflet';
import * as L from 'leaflet';
import 'leaflet.markercluster';

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
        this.cargarMapa();
      }
    );
  }

  private cargarMapa() {

    const map = new Map('map').setView([9.9634, -84.1003], 9);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

const markers = new  window.L.MarkerClusterGroup();

this.audios.forEach(audio => {
  let latitud = parseFloat(audio.latitud);
  let longitud = parseFloat(audio.longitud);

  const marker = new Marker([latitud, longitud]).
    bindPopup(`
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 200px; height: 300px; margin-bottom: 10px;">
        <h5 style="margin-top: 10px;"><strong>${audio.titulo}</strong></h5>
        <p><strong>Autor</strong> ${audio.autor}</p>
        <img src="${audio.ruta_imagen}" alt="" style="width: 100px; height: 30%; margin-bottom: 10px;">
        <audio controls src="${audio.ruta_audio}" style="border-radius: 0%; width: 100%; margin-bottom: 15px;" height: 50%></audio>
        <button data-bs-toggle="modal" data-bs-target="#verinfoaudios" style="border:none; background: transparent; text-align: start; color: #4D7DEA ">Leer más</button>
      </div>
    `);
  markers.addLayer(marker);
});

map.addLayer(markers);
  }

  ngOnInit(): void {
    this.cargarAudios();
  }

}
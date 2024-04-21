import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, Marker, MarkerClusterGroup } from 'leaflet';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { PasarDatosService } from '../../services/pasar-datos.service';
import { Audio } from '../../models/Audio.model';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  audios: Audio[] = [];
  estadoFiltro: boolean = false;
  private map!: Map;
  private markers!: MarkerClusterGroup;
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
    if (!this.map) {
      this.map = new Map('map').setView([9.9634, -84.1003], 9);
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);
    }
    this.markers = new window.L.MarkerClusterGroup();

    if (this.estadoFiltro) {
      this.pasarDatosService.getListaAudios().forEach(audio => {
        let latitud = parseFloat(audio.latitud);
        let longitud = parseFloat(audio.longitud);

        const marker = new Marker([latitud, longitud])
          .bindPopup(`
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 200px; height: 300px; margin-bottom: 10px;">
          <h5 style="margin-top: 10px;"><strong>${audio.titulo}</strong></h5>
          <p><strong>Autor</strong> ${audio.autor}</p>
          <p><strong>Provincia</strong> ${audio.provincia}</p>
          <img src="${audio.ruta_imagen}" alt="" style="width: 100px; height: 30%; margin-bottom: 10px;">
          <audio controls src="${audio.ruta_audio}" style="border-radius: 0%; width: 100%; margin-bottom: 15px;" height: 50%></audio>
          <button id="leerMas-${audio.id}" data-bs-toggle="modal" data-bs-target="#verinfoaudios" style="border:none; background: transparent; text-align: start; color: #4D7DEA">Leer más</button>
        </div>
      `);
        this.markers.addLayer(marker);

      });

    } else {
      console.log("filtro en false: " + this.estadoFiltro);
      this.audios.forEach(audio => {
        let latitud = parseFloat(audio.latitud);
        let longitud = parseFloat(audio.longitud);

        const marker = new Marker([latitud, longitud])
          .bindPopup(`
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 200px; height: 300px; margin-bottom: 10px;">
          <h5 style="margin-top: 10px;"><strong>${audio.titulo}</strong></h5>
          <p><strong>Autor</strong> ${audio.autor}</p>
          <p><strong>Provincia</strong> ${audio.provincia}</p>
          <img src="${audio.ruta_imagen}" alt="" style="width: 100px; height: 30%; margin-bottom: 10px;">
          <audio controls src="${audio.ruta_audio}" style="border-radius: 0%; width: 100%; margin-bottom: 15px;" height: 50%></audio>
          <button id="leerMas-${audio.id}" data-bs-toggle="modal" data-bs-target="#verinfoaudios" style="border:none; background: transparent; text-align: start; color: #4D7DEA">Leer más</button>
        </div>
      `);

        this.markers.addLayer(marker);

        marker.on('popupopen', () => {
          let leerMasButton = document.getElementById(`leerMas-${audio.id}`);
          if (leerMasButton) {
            leerMasButton.addEventListener('click', () => {
              this.pasarDatosService.setAudio(audio);
            });
          }
        });
      });
    }

    this.map.addLayer(this.markers);
  }


  private actualizarMapa() {
    if (this.markers) {
    this.map.removeLayer(this.markers);
    }
    this.cargarMapa();
  }

  ngOnInit(): void {
    this.cargarAudios();
    this.pasarDatosService.getEstadoFiltro().subscribe(estadoFiltro => {
      this.estadoFiltro = estadoFiltro;
      this.actualizarMapa();
    });
  }
}

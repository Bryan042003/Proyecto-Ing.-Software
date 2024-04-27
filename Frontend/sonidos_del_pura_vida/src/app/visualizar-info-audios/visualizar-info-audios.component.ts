import { Component, ViewChild, ElementRef } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Audio } from '../models/Audio.model';
import { Map, tileLayer, Marker } from 'leaflet'
import * as L from 'leaflet';


@Component({
  selector: 'app-visualizar-info-audios',
  templateUrl: './visualizar-info-audios.component.html',
  styleUrl: './visualizar-info-audios.component.css'
})
export class VisualizarInfoAudiosComponent {
  constructor(public pasarDatosService: PasarDatosService) { }
  @ViewChild('visualizarInfoAudios', { static: false }) visualizarInfoAudios!: ElementRef;
  private map: any;
  private marker: any;
  private markers: L.Marker[] = [];
  private varMarcador: boolean = true;

  private cargarMapa2(): void {
    if (!this.map) {
      this.map = L.map('mapU', {
        center: [parseFloat(this.pasarDatosService.getAudio().latitud), parseFloat(this.pasarDatosService.getAudio().longitud)],
        zoom: 10
      });
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map);
    }
    this.marker = new Marker([parseFloat(this.pasarDatosService.getAudio().latitud), parseFloat(this.pasarDatosService.getAudio().longitud)]);
    this.map.addLayer(this.marker);
    this.markers.push(this.marker);
  }

  onModalShown() {
    //this.map.removeLayer(this.marker);
    this.cargarMapa2();
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 200);

  }

  onModalHidden() {
    this.map.removeLayer(this.marker);
  }

}

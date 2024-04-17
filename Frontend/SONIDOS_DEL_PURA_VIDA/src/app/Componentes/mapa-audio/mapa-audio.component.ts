import { Component } from '@angular/core';
import { Map, tileLayer, Marker, MarkerClusterGroup } from 'leaflet'
import { PasarDatosService } from '../../services/pasar-datos.service';
import { Audio } from '../../models/Audio.model';

@Component({
  selector: 'app-mapa-audio',
  templateUrl: './mapa-audio.component.html',
  styleUrl: './mapa-audio.component.css'
})
export class MapaAudioComponent{
  static map: any;
  constructor(private pasarDatosService: PasarDatosService) {}


  static cargarMapa2(audio:Audio) {

    console.log('cargarMapa2');
   
    if (this.map) {
      this.map.remove();
    }
   
    this.map = new Map('mapU').setView([parseFloat(audio.latitud), parseFloat(audio.longitud)], 15);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    let latitud = parseFloat(audio.latitud);
    let longitud = parseFloat(audio.longitud);

    const marker = new Marker([latitud, longitud]);
    marker.addTo(this.map);
  }

}

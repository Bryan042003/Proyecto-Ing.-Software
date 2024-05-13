import { Component, Input,OnInit } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Audio } from '../models/Audio.model';
import { Map, tileLayer, Marker } from 'leaflet'
import * as L from 'leaflet';

@Component({
  selector: 'app-editar-audio',
  templateUrl: './editar-audio.component.html',
  styleUrl: './editar-audio.component.css'
})
export class EditarAudioComponent  implements OnInit {
  @Input() audio!: Audio;
  private map: any;
  private marker: any;
  private markers: L.Marker[] = [];
  private varMarcador: boolean = true;


  ngOnInit() {
    this.mostrarMapa();
  }

  private cargarMapa2(): void {
    if (!this.map) {
      this.map = L.map('mapU', {
        center: [parseFloat(this.audio?.latitud), parseFloat(this.audio.longitud)],
        zoom: 10
      });
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map);
    } else {
      this.map.setView([parseFloat(this.audio?.latitud), parseFloat(this.audio.longitud)], 10);
    }

    this.marker = new Marker([parseFloat(this.audio?.latitud), parseFloat(this.audio.longitud)]);
    this.map.addLayer(this.marker);
    this.markers.push(this.marker);
  }

  mostrarMapa() {
    this.cargarMapa2();
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 200);
  }

  editarAudio(){
    
  }

  cerrarEditar(){
    
  }

}
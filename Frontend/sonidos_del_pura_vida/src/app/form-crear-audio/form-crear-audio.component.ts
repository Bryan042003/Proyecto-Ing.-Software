import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';



import * as L from 'leaflet';


@Component({
  selector: 'app-form-crear-audio',
  templateUrl: './form-crear-audio.component.html',
  styleUrl: './form-crear-audio.component.css'
})
export class FormCrearAudioComponent {
  @ViewChild('crearAudios', { static: false }) crearAudios!: ElementRef;
  private map: any;
  private marker: any;

  constructor(private fb: FormBuilder) { }


  private initMap(): void {

    if (!this.map) {
      this.map = L.map('mapid', {
        center: [9.9634, -84.1003],
        zoom: 10
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map);
    }
    this.map.on('click', (e: any) => {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
      this.form.controls.latitud.setValue(e.latlng.lat);
      this.form.controls.longitud.setValue(e.latlng.lng);
    });
  }



  form = this.fb.group({
    titulo: ['', Validators.required],
    autor: ['', Validators.required],
    comentarios: [''],
    AudioFile: ['', Validators.required],
    imagen: [''],
    latitud: ['', Validators.required],
    longitud: ['', Validators.required],
    canton: ['', Validators.required],
    provincia: ['', Validators.required]

  });
  onSubmit() {

  }

  onModalShown() {
    this.initMap();
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }


    }, 200);
  }




}

import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, viewChild } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';
import { PasarDatosService } from '../services/pasar-datos.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


import * as L from 'leaflet';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-crear-audio',
  templateUrl: './form-crear-audio.component.html',
  styleUrl: './form-crear-audio.component.css'
})
export class FormCrearAudioComponent {
  @ViewChild('crearAudios', { static: false }) crearAudios!: ElementRef;
  @ViewChild('audioTag') audioTag!: ElementRef<HTMLAudioElement>;
  @ViewChild('audioInput') audioInput!: ElementRef;
  private map: any;
  private marker: any;
  imageSrc!: string | ArrayBuffer;
  audioSrc!: string | ArrayBuffer;
  sitekey = environment.sitekeyCaptcha;
  invalidSizeAudio = false;
  invalidSizeImage = false;
  puntoInvalido = false;
  audioFile!: File;
  imagenFile!: File;

  constructor(private fb: FormBuilder,public pasarDatosService: PasarDatosService) { }


  form = this.fb.group({
    titulo: ['', [Validators.required, Validators.maxLength(50)]],
    autor: ['', [Validators.required, Validators.maxLength(50)]],
    comentarios: ['',Validators.maxLength(255)],
    AudioFile: ['', Validators.required],
    imagen: [''],
    latitud: ['', Validators.required],
    longitud: ['', Validators.required],
    canton: [''],
    provincia: [''],
    terminos: ['', Validators.requiredTrue],
    recaptcha: ['', Validators.required]

  });


  private initMap(): void {

    if (!this.map) {
      const bounds = L.latLngBounds([5.5, -87.1], [11.2, -82.6]);

      this.map = L.map('mapid', {
        center: [9.9634, -84.1003],
        zoom: 8,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0

      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 7
      }).addTo(this.map);
    }
    this.map.on('click', (e: any) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
    
      if (lat >= 8 && lat <= 11.15 && lng >= -86 && lng <= -82) {
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
        this.marker = L.marker([lat, lng]).addTo(this.map);
        this.form.controls.latitud.setValue(lat);
        this.form.controls.longitud.setValue(lng);
      } else {
        alert('Por favor, selecciona un punto dentro de Costa Rica');
      }
    });
  }

  encontrarUbicacion() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        this.map.setView([latitud, longitud], 15);
        if(this.marker){
          this.map.removeLayer(this.marker);
        }
        this.marker = L.marker([latitud, longitud]).addTo(this.map);
        this.form.controls.latitud.setValue(latitud.toString());
        this.form.controls.longitud.setValue(longitud.toString());
      });
    }
    else{
      alert('No se pudo obtener la ubicación');
    }
  }


  onImagechange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      if (file.size > 50000000) {
        file.value = '';
        this.imageSrc = '';
        this.form.controls.imagen.setValue('');
        this.invalidSizeImage = true;
        this.imagenFile = new File([], '');
        return;
      }
      this.invalidSizeImage = false;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagenFile = file;
        this.imageSrc = reader.result as string;
        this.form.controls.imagen.setValue(file);
      };
    }

  }

  onAudiochange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      if (file.size > 50000000) {
        file.value = '';
        this.audioSrc = '';
        this.form.controls.AudioFile.setValue('');
        this.reloadAudio();
        this.invalidSizeAudio = true;
        this.audioFile = new File([], '');
        return;
      }
      this.invalidSizeAudio = false;
      reader.onload = () => {
        this.audioFile = file;
        this.audioSrc = reader.result as string;
        this.form.controls.AudioFile.setValue(file);
        this.reloadAudio();
      };
      reader.readAsDataURL(file);
    }

  }

  reloadAudio() {
    if (this.audioTag) {
      this.audioTag.nativeElement.load();
    }
  }

  onDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.onImagechange({ target: { files: files } });
    }
  }

  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  onDragLeave(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  quitarImagen() {
    this.imageSrc = '';
    this.form.controls.imagen.setValue('');
  
  }

  obtenerCantonProvincia():Promise<void> {
    const lat = this.form.controls.latitud.value;
    const lng = this.form.controls.longitud.value;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        let canton = data.address.county;
        let provincia = data.address.province;
        if(canton === undefined || provincia === undefined){
          this.puntoInvalido = true;
          return;
        }
        canton = canton.replace('Cantón ', '');
        provincia = provincia.replace('Provincia ', '');
        provincia = provincia.replace('de ', '');
        this.form.controls.canton.setValue(canton);
        this.form.controls.provincia.setValue(provincia);
        
        this.puntoInvalido = false;
      })
      .catch(error => {
       
        this.puntoInvalido = true;
      });
    
      
  }

  async onSubmit() {

    if (this.form.valid) {
      await this.obtenerCantonProvincia();
      if(!this.puntoInvalido){
       
        const audio = new FormData();
        audio.append('titulo', this.form.get('titulo')?.value || '');
        audio.append('autor', this.form.get('autor')?.value || '');
        audio.append('comentarios', this.form.get('comentarios')?.value || '');
        audio.append('latitud', this.form.get('latitud')?.value || '');
        audio.append('longitud', this.form.get('longitud')?.value || '');
        audio.append('canton', this.form.get('canton')?.value || '');
        audio.append('provincia', this.form.get('provincia')?.value || '');

        if(this.audioFile)
          audio.append('AudioFile', this.audioFile, this.audioFile.name);

        if(this.imagenFile)
          audio.append('imagen', this.imagenFile, this.imagenFile.name);

        this.pasarDatosService.addAudio(audio).subscribe(
          (res) => {
            this.showAlertSuccess();
            this.form.reset();
            this.imageSrc = '';
            this.audioSrc = '';
            this.reloadAudio();
            this.map.removeLayer(this.marker);
            this.marker = null;
            this.form.untouched;
          
          },
          (error) => {
            this.showAlertError();
          }
        );

      }
    }
    else{
      this.showAlertInvalid();
      this.form.markAllAsTouched();
      
    }
  }

  onModalShown() {
    this.initMap();
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }


    }, 200);
  }

  onCloseModal() {
    this.form.reset();
    this.imageSrc = '';
    this.audioSrc = '';
    this.reloadAudio();
    if(this.marker){
      this.map.removeLayer(this.marker);
      this.marker = null;
    }
    this.puntoInvalido = false;
    this.audioInput.nativeElement.value = '';
    this.form.untouched;

  }
  showAlertSuccess() {
    Swal.fire({
      title: 'Audio guardado',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    }).then(() => {
      window.location.reload();
    });
  }

  showAlertError() {
    Swal.fire({
      title: 'Error al guardar el audio',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }

  showAlertInvalid(){
    Swal.fire({
      title: 'Campos inválidos',
      text: 'Por favor, revise los campos del formulario',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }


}

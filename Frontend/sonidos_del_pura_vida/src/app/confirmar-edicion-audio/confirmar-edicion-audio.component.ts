import { Component,Input, OnChanges, SimpleChanges, AfterViewInit, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Audio } from '../models/Audio.model';
import { PasarDatosService } from '../services/pasar-datos.service';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import * as L from 'leaflet';



@Component({
  selector: 'app-confirmar-edicion-audio',
  templateUrl: './confirmar-edicion-audio.component.html',
  styleUrl: './confirmar-edicion-audio.component.css'
})
export class ConfirmarEdicionAudioComponent{
  @Input() audio!: Audio;
  private idAdmin: number = Number(this.pasarDatosService.getAdminFromToken().id);

  @ViewChild('crearAudios', { static: false }) crearAudios!: ElementRef;
  @ViewChild('audioTag') audioTag!: ElementRef<HTMLAudioElement>;
  @ViewChild('audioInput') audioInput!: ElementRef;
  private map: any;
  private marker: any;
  imageSrc!: string | ArrayBuffer;
  audioSrc!: string | ArrayBuffer;
    invalidSizeAudio = false;
  invalidSizeImage = false;
  puntoInvalido = false;
  audioFile!: File;
  imagenFile!: File;

  constructor(private fb: FormBuilder, public pasarDatosService: PasarDatosService) { }


  form = this.fb.group({
    id_audio: [''],
    titulo: ['', [Validators.required, Validators.maxLength(50)]],
    autor: ['', [Validators.required, Validators.maxLength(50)]],
    comentarios: ['', Validators.maxLength(255)],
    AudioFile: ['', Validators.required],
    imagen: [''],
    latitud: ['', Validators.required],
    longitud: ['', Validators.required],
    canton: [''],
    provincia: [''],
    id_administrador: [''],
    motivo: ['', [Validators.required, Validators.maxLength(255)]],
  });


  private initMap(): void {

    if (!this.map) {
      const bounds = L.latLngBounds([5.5, -87.1], [11.2, -82.6]);

      this.map = L.map('mapid', {
        center: [Number(this.audio.latitud), Number(this.audio.longitud)],
        zoom: 8,
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 3
      }).addTo(this.map);

      this.marker = L.marker([Number(this.audio.latitud), Number(this.audio.longitud)]).addTo(this.map);
    }
    this.map.on('click', (e: any) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;


      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker([lat, lng]).addTo(this.map);
      this.form.controls.latitud.setValue(lat);
      this.form.controls.longitud.setValue(lng);

    });
  }

  desactivarEdicionDatosAudio(){
    this.pasarDatosService.setFlagEditarDatosAudio(false);
  }

  encontrarUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        this.map.setView([latitud, longitud], 15);
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
        this.marker = L.marker([latitud, longitud]).addTo(this.map);
        this.form.controls.latitud.setValue(latitud.toString());
        this.form.controls.longitud.setValue(longitud.toString());
      });
    }
    else {
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

  obtenerCantonProvincia(): Promise<void> {
    const lat = this.form.controls.latitud.value;
    const lng = this.form.controls.longitud.value;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        let canton = data.address.county;
        let provincia = data.address.province;

        if(provincia === undefined ){
          provincia = 'Indefinido';
        }
        if(canton === undefined){
          canton = 'Indefinido';
        }

        canton = canton.replace('Cantón ', '');
        provincia = provincia.replace('Provincia ', '');
        provincia = provincia.replace('de ', '');

        if (provincia !== 'San José' &&
          provincia !== 'Alajuela' &&
          provincia !== 'Cartago' && provincia !== 'Heredia' &&
          provincia !== 'Guanacaste' && provincia !== 'Puntarenas' && provincia !== 'Limón') {
          provincia = "Indefinido";
          canton = "Indefinido";

        }
        this.form.controls.canton.setValue(canton);
        this.form.controls.provincia.setValue(provincia);

        this.puntoInvalido = false;
      })
      .catch(error => {
        this.form.controls.canton.setValue("Indefinido");
        this.form.controls.provincia.setValue("Indefinido");
      });


  }

  async onSubmit() {

    if (this.form.valid) {
      await this.obtenerCantonProvincia();
      if (!this.puntoInvalido) {

        const audio = new FormData();
        audio.append('id_audio', this.audio.id.toString());
        audio.append('titulo', this.form.get('titulo')?.value || '');
        audio.append('autor', this.form.get('autor')?.value || '');
        audio.append('comentarios', this.form.get('comentarios')?.value || '');
        audio.append('latitud', this.form.get('latitud')?.value || '');
        audio.append('longitud', this.form.get('longitud')?.value || '');
        audio.append('canton', this.form.get('canton')?.value || '');
        audio.append('provincia', this.form.get('provincia')?.value || '');
        audio.append('id_administrador', this.idAdmin.toString());
        audio.append('motivo', this.form.get('motivo')?.value || '');
        
        if (this.audioFile)
          audio.append('AudioFile', this.audioFile, this.audioFile.name);

        if (this.imagenFile)
          audio.append('imagen', this.imagenFile, this.imagenFile.name);

        this.showAlertLoad();
        console.log("estoy en confirmacion de edicion de audio");
        audio.forEach((value, key) => {
          console.log(key, value);
        });
        this.pasarDatosService.getEditarAudio(audio).subscribe(
          (res) => {
            Swal.close();
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
            console.log(error);
            Swal.close();
            this.showAlertError();
          }
        );

      }
    }
    else {
      this.showAlertInvalid();
      this.form.markAllAsTouched();

    }
  }

  ngOnInit() {
    this.initMap();
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 200);
  
    this.audioSrc = this.audio.ruta_audio;
    this.imageSrc = this.audio.ruta_imagen;

    this.form.controls.titulo.setValue(this.audio.titulo);
    this.form.controls.autor.setValue(this.audio.autor);
    this.form.controls.comentarios.setValue(this.audio.comentarios);
    this.form.controls.AudioFile.setValue(this.audio.ruta_audio);
    this.form.controls.latitud.setValue(this.audio.latitud);
    this.form.controls.longitud.setValue(this.audio.longitud);
    this.form.controls.canton.setValue(this.audio.canton);
    this.form.controls.provincia.setValue(this.audio.provincia);

  }

  showAlertSuccess() {
    Swal.fire({
      title: 'Edición de Audio guardado',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    }).then(() => {
      window.location.reload();
    });
  }

  showAlertError() {
    Swal.fire({
      title: 'Error al editar el audio',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }

  showAlertInvalid() {
    Swal.fire({
      title: 'Campos inválidos',
      text: 'Por favor, revise los campos del formulario',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }

  showAlertLoad() {
    Swal.fire({
      title: 'Cargando...',
      text: 'Espere un momento por favor',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,

    });
    Swal.showLoading();
  }

}

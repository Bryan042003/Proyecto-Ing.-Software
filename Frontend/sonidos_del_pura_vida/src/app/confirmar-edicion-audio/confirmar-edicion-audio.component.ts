import { Component,Input, OnChanges, SimpleChanges } from '@angular/core';
import { Audio } from '../models/Audio.model';
import { PasarDatosService } from '../services/pasar-datos.service';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-confirmar-edicion-audio',
  templateUrl: './confirmar-edicion-audio.component.html',
  styleUrl: './confirmar-edicion-audio.component.css'
})
export class ConfirmarEdicionAudioComponent implements OnChanges{
  @Input() audio!: Audio;
  private idAdmin: number = 2;

  autor: string = '';
  titulo: string = '';
  comentarios: string = '';
  ruta_audio: string = '';
  ruta_imagen: string = '';
  constructor(private fb: FormBuilder, public pasarDatosService: PasarDatosService) { }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['audio']) {
      this.autor = this.audio.autor;
      this.titulo = this.audio.titulo;
      this.comentarios = this.audio.comentarios;
      this.ruta_audio = this.audio.ruta_audio;
      this.ruta_imagen = this.audio.ruta_imagen;
    }
  }


  quitarImagen() {


  }


  desactivarEdicionDatosAudio(){
    this.pasarDatosService.setFlagEditarDatosAudio(false);
  }

  
  form = this.fb.group({
    titulo: ['', [Validators.required, Validators.maxLength(255)]],
    autor: ['', [Validators.required]],
    comentarios: ['', [Validators.required]],
    ruta_audio: ['', [Validators.required]],
    ruta_imagen: ['', [Validators.required]]
});

  async onSubmit() {
    console.log("estoy en confirmacion de eliminacion de audio");
    console.log(this.audio);


    if (this.form.valid) {
      const motivo = this.form.get('motivo')?.value || '';
      console.log(motivo);


      this.showAlertLoad();
      this.pasarDatosService.getEliminarAudio(this.audio.id, this.idAdmin, motivo).subscribe(
        (res) => {
          Swal.close();
          this.showAlertSuccess();
          this.form.reset();
          this.form.untouched;

        },
        (error) => {
          console.log(error);
          Swal.close();
          this.showAlertError();
        }
      );
    } else {
      this.showAlertInvalid();
      this.form.markAllAsTouched();
    }
  }

  showAlertSuccess() {
    Swal.fire({
      title: 'Audio Eliminado',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    }).then(() => {
      window.location.reload();
    });
  }

  showAlertError() {
    Swal.fire({
      title: 'Error al eliminar el audio',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#001148'
    });
  }

  showAlertInvalid() {
    Swal.fire({
      title: 'Campos inválidos',
      text: 'Por favor, revise los campos de motivo',
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

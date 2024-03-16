import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Audio } from '../models/Audio.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasarDatosService {
  //ver como hacer para que la url sea dinamica
  private urlAudios = 'http://localhost/sonidosPV/controladores/Audios/';

  constructor(private http:HttpClient) {}

  getAudios():Observable<Audio>{
    return this.http.get<Audio>(this.urlAudios +  'obtenerAudios');
  }
/*
  getAudio(id:number):Observable<Audio>{
    return this.http.get<Audio>(this.urlAudio + id);
  }

  deleteAudio(id:number):Observable<Audio>{
    return this.http.delete<Audio>(this.urlRemoverAudio + id);
  }
  */
}

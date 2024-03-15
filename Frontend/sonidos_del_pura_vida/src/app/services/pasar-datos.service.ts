import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Audio } from '../models/Audio.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasarDatosService {
  private urlAudios = 'http://localhost/sonidosPV/controladores/Audios/obtenerAudios.php';
  private urlAudio = 'http://localhost/sonidosPV/controladores/Audios/obtenerAudioById.php?id=';
  private urlRemoverAudio = 'http://localhost/sonidosPV/controladores/Audios/removerAudio.php?id=';

  constructor(private http:HttpClient) { }

  getAudios():Observable<Audio[]>{
    return this.http.get<Audio[]>(this.urlAudios);
  }

  getAudio(id:number):Observable<Audio>{
    return this.http.get<Audio>(this.urlAudio + id);
  }

  deleteAudio(id:number):Observable<Audio>{
    return this.http.delete<Audio>(this.urlRemoverAudio + id);
  }
}

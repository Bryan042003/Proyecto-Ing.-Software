import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Audio } from '../models/Audio.model';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PasarDatosService {
  
  private urlBase = environment.baseUrl;
  private urlAudios = this.urlBase + 'controladores/Audios/';

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

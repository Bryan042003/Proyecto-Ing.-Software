import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Audio } from '../models/Audio.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class PasarDatosService {

  private urlBase = environment.baseUrl;
  private urlAudios = this.urlBase + 'controladores/Audios/';

  public tipoFiltro: string = '';
  public datoFiltrar: string = '';
  private estadoFiltro = new BehaviorSubject<boolean>(false);
  public listaAudios:Audio[] = [];
  public AudioGuardar: any;

  constructor(private http:HttpClient) {}

  getAudios():Observable<Audio>{
    return this.http.get<Audio>(this.urlAudios +  'obtenerAudios.php');
  }

  setAudio(audio:any){
    this.AudioGuardar = audio;
  }

  getAudio(){
    return this.AudioGuardar;
  }

  getTipoFiltro(){  
    return this.tipoFiltro;
  }
  setTipoFiltro(tipoFiltro:string):void{
    this.tipoFiltro = tipoFiltro;
  }
  getDatoFiltrar(){
    return this.datoFiltrar;
  }
  setDatoFiltrar(datoFiltrar:string):void{
    console.log(datoFiltrar);
    this.datoFiltrar = datoFiltrar;
  }
  setEstadoFiltro(estado:boolean):void{
    this.estadoFiltro.next(estado);
  }
  getEstadoFiltro(){
    return this.estadoFiltro.asObservable();
  }

  getListaAudios(){
    return this.listaAudios;
  }
  setListaAudios(listaAudios:Audio[]){

    this.listaAudios = listaAudios;
  }

}

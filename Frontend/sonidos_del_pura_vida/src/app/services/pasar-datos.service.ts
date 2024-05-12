import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Audio } from '../models/Audio.model';
import { Admin } from '../models/Admin.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class PasarDatosService {

  private urlBase = environment.baseUrl;
  private urlAudios = this.urlBase + 'controladores/Audios/';
  private urlAdmin = this.urlBase + 'controladores/Administradores/';

  public tipoFiltro: string = '';
  public datoFiltrar: string = '';
  private estadoFiltro = new BehaviorSubject<boolean>(false);


  public listaAudios: Audio[] = [];
  public listaAdmins: Admin[] = [];

  public AudioGuardar: any;
  public AdminGuardar: any;

  public filtroProvincia: Audio[] = [];

  private estadoFiltroAutor = new BehaviorSubject<boolean>(false);
  private estadoFiltroProvincia = new BehaviorSubject<boolean>(false);
  private estadoFiltroCanton= new BehaviorSubject<boolean>(false);
  private estadoFiltroTitulo = new BehaviorSubject<boolean>(false);

  provinciaList: any[] = [];
  cantonList: any[] = [];

  constructor(private http: HttpClient) { }

  getAudios(): Observable<Audio> {
    return this.http.get<Audio>(this.urlAudios + 'obtenerAudios.php');
  }

  setAudio(audio: any) {
    this.AudioGuardar = audio;
  }

  getCantones(idProvincia:string): Observable<any> {
    return this.http.get(this.urlAudios + 'obtenerCantonByProvincia.php?id_provincia='+idProvincia);
  }

  getAudio() {
    return this.AudioGuardar;
  }

  addAudio(audio: FormData): Observable<any> {

    return this.http.post(this.urlAudios + 'agregarAudio.php', audio);
  }

  getTipoFiltro() {
    return this.tipoFiltro;
  }
  setTipoFiltro(tipoFiltro: string): void {
    this.tipoFiltro = tipoFiltro;
  }
  getDatoFiltrar() {
    return this.datoFiltrar;
  }
  setDatoFiltrar(datoFiltrar: string): void {
    this.datoFiltrar = datoFiltrar;
  }
  setEstadoFiltro(estado: boolean): void {
    this.estadoFiltro.next(estado);
  }
  getEstadoFiltro() {
    return this.estadoFiltro.asObservable();
  }

  getListaAudios() {
    return this.listaAudios;
  }
  setListaAudios(listaAudios: Audio[]) {
    this.listaAudios = listaAudios;
  }

  setEstadoFiltroAutor(estado: boolean): void {
    this.estadoFiltroAutor.next(estado);
  }
  getEstadoFiltroAutor() {
    return this.estadoFiltroAutor.asObservable();
  }
  setEstadoFiltroProvincia(estado: boolean): void {
    this.estadoFiltroProvincia.next(estado);
  }
  getEstadoFiltroProvincia() {
    return this.estadoFiltroProvincia.asObservable();
  }
  setEstadoFiltroCanton(estado: boolean): void {
    this.estadoFiltroCanton.next(estado);
  }
  getEstadoFiltroCanton() {
    return this.estadoFiltroCanton.asObservable();
  }
  setEstadoFiltroTitulo(estado: boolean): void {
    this.estadoFiltroTitulo.next(estado);
  }
  getEstadoFiltroTitulo() {
    return this.estadoFiltroTitulo.asObservable();
  }

  setProvinciaList(listP: any[]) {
    this.provinciaList = listP;
  }

  getProvinciaList() {
    return this.provinciaList;
  }

  setCantonList(listC: any[]) {
    this.cantonList = listC;
  }
  getCantonList() {
    return this.cantonList;
  }

  addAdmin(admin: FormData): Observable<any> {
    return this.http.post(this.urlAdmin + 'agregarAdmin.php', admin);
  }

  getAdmins(): Observable<any> {
    return this.http.get(this.urlAdmin + 'obtenerAdmins.php');
  }

  setAdmin(admin: any) {
    this.AdminGuardar = admin;
  }

  getAdmin() {
    return this.AdminGuardar;
  }

  deleteAdministrador(id: string){
    return this.http.delete(this.urlAdmin + 'removerAdministrador?id='+id);
  }

}

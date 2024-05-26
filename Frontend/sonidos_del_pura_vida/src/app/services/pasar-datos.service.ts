import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Audio } from '../models/Audio.model';
import { Admin } from '../models/Admin.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from "jwt-decode";
import { Historial } from '../models/Historial.model';

@Injectable({
  providedIn: 'root'
})


export class PasarDatosService {

  private urlBase = environment.baseUrl;
  private urlAudios = this.urlBase + 'controladores/Audios/';
  private urlAdmin = this.urlBase + 'controladores/Administradores/';
  private urlHistorial = this.urlBase + 'controladores/Historial/';

  public tipoFiltro: string = '';
  public datoFiltrar: string = '';
  private estadoFiltro = new BehaviorSubject<boolean>(false);

  private flagEditarAudio = new BehaviorSubject<boolean>(false);
  private flagConfirmarEliminacion = new BehaviorSubject<boolean>(false);
  private flagEditarDatosAudio = new BehaviorSubject<boolean>(false);

  private flagEditarAdmin = new BehaviorSubject<boolean>(false);
  private flagEditarDatosAdmin = new BehaviorSubject<boolean>(false);
  private flagConfirmarEliminacionAdmin = new BehaviorSubject<boolean>(false);


  private EliminarAdmin = new BehaviorSubject<boolean>(false);
  private EditarAdmin = new BehaviorSubject<boolean>(false);


  public listaAudios: Audio[] = [];
  public listaAdmins: Admin[] = [];

  public AudioGuardar: any;
  public AdminGuardar: any;

  public filtroProvincia: Audio[] = [];

  private estadoFiltroAutor = new BehaviorSubject<boolean>(false);
  private estadoFiltroProvincia = new BehaviorSubject<boolean>(false);
  private estadoFiltroCanton = new BehaviorSubject<boolean>(false);
  private estadoFiltroTitulo = new BehaviorSubject<boolean>(false);

  provinciaList: any[] = [];
  cantonList: any[] = [];

  constructor(private http: HttpClient) { }

  authAdmin(admin: any): Observable<any> {
    return this.http.post(this.urlAdmin + 'inicioSesionAdmin.php', admin);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = this.getDecodedAccessToken(token);
    if (decodedToken) {
      return decodedToken.exp < Date.now() / 1000;
    }
    return true;
  }

  getAdminFromToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      return this.getDecodedAccessToken(token);
    }
    return null;
  }

  getAudios(): Observable<Audio> {
    return this.http.get<Audio>(this.urlAudios + 'obtenerAudios.php');
  }

  getHistorial(): Observable<Historial> {
    return this.http.get<Historial>(this.urlHistorial + 'obtenerHistorial.php');
  }

  setAudio(audio: any) {
    this.AudioGuardar = audio;
  }

  getCantones(idProvincia: string): Observable<any> {
    return this.http.get(this.urlAudios + 'obtenerCantonByProvincia.php?id_provincia=' + idProvincia);
  }

  getEliminarAudio(idAudio: number, idAdministrador: number, Motivo: string): Observable<any> {
    return this.http.get(this.urlAudios + 'removerAudio.php?id=' + idAudio + '&id_administrador=' + idAdministrador + '&motivo=' + Motivo);
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

  deleteAdministrador(id: string) {
    return this.http.delete(this.urlAdmin + 'removerAdministrador?id=' + id);
  }


  setFlagEditarAudio(flag: boolean) {
    this.flagEditarAudio.next(flag);
  }

  getFlagEditarAudio(): Observable<boolean> {
    return this.flagEditarAudio.asObservable();
  }


  setFlagEditarAdmin(flag: boolean) {
    this.flagEditarAdmin.next(flag);
  }

  getFlagEditarAdmin(): Observable<boolean> {
    return this.flagEditarAdmin.asObservable();
  }




  //--------------------Confirmar Eliminacion Audios--------------------

  setFlagConfirmarEliminacion(flag: boolean) {
    this.flagConfirmarEliminacion.next(flag);
  }
  getFlagConfirmarEliminacion(): Observable<boolean> {
    return this.flagConfirmarEliminacion.asObservable();

  }

  //--------------------Confirmar Eliminacion Admin--------------------

  setFlagConfirmarEliminacionAdmin(flag: boolean) {
    this.flagConfirmarEliminacionAdmin.next(flag);
  }
  getFlagConfirmarEliminacionAdmin(): Observable<boolean> {
    return this.flagConfirmarEliminacionAdmin.asObservable();
  }

  //--------------------Confirmar Editar Datos Audios--------------------
  setFlagEditarDatosAudio(flag: boolean) {
    this.flagEditarDatosAudio.next(flag);
  }
  getFlagEditarDatosAudio(): Observable<boolean> {
    return this.flagEditarDatosAudio.asObservable();
  }

  //--------------------Confirmar Editar Datos Admin--------------------
  setFlagEditarDatosAdmin(flag: boolean) {
    this.flagEditarDatosAdmin.next(flag);
  }
  getFlagEditarDatosAdmin(): Observable<boolean> {
    return this.flagEditarDatosAdmin.asObservable();
  }

  //----------------------------------------------------


  setEliminarAdmin(flag: boolean) {
    this.EliminarAdmin.next(flag);
  }

  getEliminarAdmin(): Observable<boolean> {
    return this.EliminarAdmin.asObservable();
  }

  setEditarAdmin(flag: boolean) {
    this.EditarAdmin.next(flag);
  }

  getEditarAdmin(): Observable<boolean> {
    return this.EditarAdmin.asObservable();
  }






}

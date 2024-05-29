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
  private flagEliminacionAdmin = new BehaviorSubject<boolean>(false);


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

  private originalVistaAdmin =  new BehaviorSubject<boolean>(true);
  private originalInformacionAdmin = new BehaviorSubject<boolean>(false);

  private nombreAdminPerfil: string = '';
  private contraAdminPerfil: string = '';

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

  getEditarAudio(audio: FormData): Observable<any> {
    return this.http.post(this.urlAudios + 'editarAudio.php', audio);
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

  getAdminById(id: string): Observable<any> {
    return this.http.get(this.urlAdmin + 'obtenerAdminById.php?id=' + id);
  }

  deleteAdministrador(id: string) {
    return this.http.delete(this.urlAdmin + 'removerAdministrador.php?id=' + id);
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


//----------------------------Audios--------------------------

//--------------------Confirmar Eliminacion Audios--------------------

setFlagConfirmarEliminacion(flag: boolean) {
  this.flagConfirmarEliminacion.next(flag);
}

getFlagConfirmarEliminacion(): Observable<boolean> {
  return this.flagConfirmarEliminacion.asObservable();
}

//--------------------Confirmar Editar Datos Audios--------------------
setFlagEditarDatosAudio(flag: boolean) {
  this.flagEditarDatosAudio.next(flag);
}

getFlagEditarDatosAudio(): Observable<boolean> {
  return this.flagEditarDatosAudio.asObservable();
}

////--------------------Admins--------------------

//--------------------Confirmar Eliminacion Admin--------------------

setFlagEliminarAdmin(flag: boolean) {
  this.flagEliminacionAdmin.next(flag);
}
getFlagEliminarAdmin(): Observable<boolean> {
  return this.flagEliminacionAdmin.asObservable();
}

//--------------------Confirmar Editar Datos Admin--------------------
setFlagEditarDatosAdmin(flag: boolean) {
  this.flagEditarDatosAdmin.next(flag);
}
getFlagEditarDatosAdmin(): Observable<boolean> {
  return this.flagEditarDatosAdmin.asObservable();
}

setActivarOriginalVistaAdmin(flag: boolean) {
  this.originalVistaAdmin.next(flag);
}
getActivarOriginalVistaAdmin(): Observable<boolean> {
  return this.originalVistaAdmin.asObservable();
}

// InformacionAdmin
setActivarInformacionAdmin(flag: boolean) {
  this.originalInformacionAdmin.next(flag);
}

getActivarInformacionAdmin(): Observable<boolean> {
  return this.originalInformacionAdmin.asObservable();
}

editarNombreAdminPerfil(admin: FormData): Observable<any> {
  return this.http.post(this.urlAdmin + 'editarAdminNombrePerfil.php', admin);
}

editarContraAdminPerfil(admin: FormData): Observable<any> {
  return this.http.post(this.urlAdmin + 'editarAdminContraPerfil.php', admin);
}

getEditarAdmin(admin: FormData): Observable<any> {
  return this.http.post(this.urlAdmin + 'editarAdmin.php', admin);
}

getEditarContraAdmin(admin: FormData): Observable<any> {
  return this.http.post(this.urlAdmin + 'editarAdminContraPerfil.php', admin);
}

setNombreAdminPerfil(nombre: string) {
  this.nombreAdminPerfil = nombre;
}

getNombreAdminPerfil() {
  return this.nombreAdminPerfil;
}

setContraAdminPerfil(contra: string) {
  console.log("Entramos a guardar contraseña pasardatos 1")
  console.log(contra)
  console.log("Entramos a guardar contraseña pasardatos 2")
  this.contraAdminPerfil = contra;
}

getContraAdminPerfil() {
  return this.contraAdminPerfil;
}

}

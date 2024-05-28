import { Component,OnInit } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit{

  constructor(public pasarDatosService: PasarDatosService,private route:Router) { }
  admin: any;
  flagPerfil: boolean = true;
  flagGestionDeAudios: boolean = false;
  flagGestionDeAdministrador: boolean = false;
  flagHistorial: boolean = false;
  sidebarActive = false;

  obteniendoContraseña = '';

  admin1 = this.pasarDatosService.getAdminFromToken();

  guardando = this.pasarDatosService.setNombreAdminPerfil(this.admin1.nombre);

  seleccionarEspacio(espacioSeleccionado: string) {
    console.log("Contra admin guardada")
    console.log(this.pasarDatosService.getContraAdminPerfil())

    switch (espacioSeleccionado) {
      case 'perfil':
        this.flagPerfil = true;
        this.flagGestionDeAudios = false;
        this.flagGestionDeAdministrador = false;
        this.flagHistorial = false;
        break;
      case 'gestionDeAudios':
        this.flagPerfil = false;
        this.flagGestionDeAudios = true;
        this.flagGestionDeAdministrador = false;
        this.flagHistorial = false;
        break;
      case 'gestionDeAdministradores':
        this.flagPerfil = false;
        this.flagGestionDeAudios = false;
        this.flagGestionDeAdministrador = true;
        this.flagHistorial = false;
        break;
      case 'historial':
        this.flagPerfil = false;
        this.flagGestionDeAudios = false;
        this.flagGestionDeAdministrador = false;
        this.flagHistorial = true;
        break;
    }
  }

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
    console.log(this.sidebarActive);
  }

  cerrarSesion() {
    localStorage.removeItem('jwt');
    this.route.navigate(['/admin']);
  }

  ngOnInit(): void {
    this.admin = this.pasarDatosService.getAdminFromToken();
    this.obteniendoContraseña = this.pasarDatosService.getContraAdminPerfil();
    this.pasarDatosService.setContraAdminPerfil(this.obteniendoContraseña);
    console.log("Estamos en dashboard")
    console.log(this.obteniendoContraseña)

  }




}

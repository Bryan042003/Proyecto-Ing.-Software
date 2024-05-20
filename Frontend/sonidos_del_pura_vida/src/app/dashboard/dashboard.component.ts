import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  flagPerfil: boolean = false;
  flagGestionDeAudios: boolean = true;
  flagGestionDeAdministrador: boolean = false;
  flagHistorial: boolean = false;
  sidebarActive = false;

  seleccionarEspacio(espacioSeleccionado: string) {
    
    console.log(this.sidebarActive);
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



}

import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  flagPerfil: boolean = false;
  flagGestionDeAudios: boolean = false;
  flagGestionDeAdministrador: boolean = true;
  flagHistorial: boolean = false;



  seleccionarEspacio(espacioSeleccionado: string) {

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

}

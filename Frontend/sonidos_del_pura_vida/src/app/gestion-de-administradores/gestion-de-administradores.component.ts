import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-de-administradores',
  templateUrl: './gestion-de-administradores.component.html',
  styleUrl: './gestion-de-administradores.component.css'
})
export class GestionDeAdministradoresComponent {

tocoBotonAnadir: boolean = false;

  botonAnadir(){
    this.tocoBotonAnadir = !this.tocoBotonAnadir;
  }

}


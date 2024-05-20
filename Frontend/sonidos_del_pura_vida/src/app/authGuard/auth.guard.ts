import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { PasarDatosService } from '../services/pasar-datos.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  constructor(private pasarDatosService:PasarDatosService,private route:Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('jwt');
    if (token && !this.pasarDatosService.isTokenExpired(token)) {
      return true;
    }
    this.route.navigate(['/admin']);
    return false;
  }
}


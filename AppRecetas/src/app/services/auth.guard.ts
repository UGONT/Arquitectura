import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root', // Angular maneja la instancia
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const idToken = localStorage.getItem('idToken');

    // Si existe el token, permite el acceso; de lo contrario, redirige al login
    return idToken ? true : this.router.createUrlTree(['/login']);
  }
}
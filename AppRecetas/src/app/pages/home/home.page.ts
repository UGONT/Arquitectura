import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiControllerService } from 'src/app/services/api-controller.service';
import { AuthentificatorService } from 'src/app/services/authentificator.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private api: ApiControllerService,
    private router:Router,
    private auth:AuthentificatorService,
  ) {}

  users: any[] = [];
  
  cargarUsuarios() {
    this.api.obtenerUsuarios().subscribe(
      (data) => {
        this.users = data
        console.log(this.users)
      },
      (error) => {
        console.log("ERROR en la llamada", error)
      }
    )
  }

  logoutUser() {
    try {
      this.auth.logoutUser()
      this.router.navigate(['/home'],);
      
      // Redirigir al usuario a otra página o guardar tokens en el almacenamiento local
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      
    }
  }
}

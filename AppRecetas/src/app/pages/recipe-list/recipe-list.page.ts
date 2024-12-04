import { Component, OnInit } from '@angular/core';
import { AuthentificatorService } from 'src/app/services/authentificator.service';
import { Router } from '@angular/router';
import { ApiControllerService } from 'src/app/services/api-controller.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
})
export class RecipeListPage implements OnInit {

  recetas: any[] = []; // Almacena las recetas
  constructor(
    private api : ApiControllerService,
    private auth:AuthentificatorService,
    private router:Router
  ) { }

  ngOnInit() {
    this.obtenerRecetas();
  }

  obtenerRecetas() {
    this.api.getRecetas().subscribe(
      (data) => {
        this.recetas = data; // Asigna los datos recibidos al array de recetas
      },
      (error) => {
        console.error('Error al obtener recetas:', error);
      }
    );
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

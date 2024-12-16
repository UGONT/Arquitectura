import { Component, OnInit } from '@angular/core';
import { AuthentificatorService } from 'src/app/services/authentificator.service';
import { Router } from '@angular/router';
import { ApiControllerService } from 'src/app/services/api-controller.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
})
export class RecipeListPage implements OnInit {

  recetas: any[] = []; // Almacena las recetas

  constructor(
    private api: ApiControllerService,
    private auth: AuthentificatorService,
    private router: Router,
    private toastController: ToastController
  ) {}

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

  async logoutUser() {
    try {
      this.auth.logoutUser(); // Llama al método para cerrar sesión

      // Muestra el toast de éxito
      await this.presentToast('Sesión cerrada correctamente', 'success');

      // Redirige a la página de inicio
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);

      // Muestra el toast de error
      await this.presentToast('Hubo un problema al cerrar sesión', 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000, // Duración en milisegundos
      color,
      position: 'top', // Posición del toast
    });
    await toast.present();
  }

  recargarRecetas() {
    this.obtenerRecetas();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiControllerService } from 'src/app/services/api-controller.service';
import { ToastController } from '@ionic/angular'; // Importar ToastController

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.page.html',
  styleUrls: ['./delete-recipe.page.scss'],
})
export class DeleteRecipePage implements OnInit {

  recipeForm: FormGroup;

  receta = {
    "id": "",
    "nombre": ""
  };

  constructor(
    private fb: FormBuilder,
    private api: ApiControllerService,
    private router: Router,
    private toastController: ToastController // Inyectar ToastController
  ) {
    this.recipeForm = this.fb.group({
      id: ['', [Validators.required]], // Validación para que el campo sea obligatorio
    });
  }

  ngOnInit() {}

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración en milisegundos
      color: color, // Color del toast (success, danger, etc.)
      position: 'top', // Posición (top, middle, bottom)
    });
    await toast.present();
  }

  borrarReceta() {
    if (this.recipeForm.valid) {
      this.api.deleteReceta(this.recipeForm.value.id).subscribe(
        (response) => {
          console.log('Receta eliminada:', response);

          // Mostrar popup de éxito
          this.presentToast('¡Receta eliminada exitosamente!', 'success');

          // Redirigir a la lista de recetas
          this.router.navigate(['/recipe-list']);
        },
        (error) => {
          console.error('Error al eliminar receta:', error);

          // Mostrar popup de error
          this.presentToast('Error al eliminar la receta. Inténtalo nuevamente.', 'danger');
        }
      );
    } else {
      // Validar si el formulario no es válido
      this.presentToast('Por favor, ingresa un ID válido.', 'warning');
    }
  }
}

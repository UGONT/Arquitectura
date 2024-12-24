import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiControllerService } from 'src/app/services/api-controller.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.page.html',
  styleUrls: ['./update-recipe.page.scss'],
})
export class UpdateRecipePage implements OnInit {

  formularioReceta: FormGroup;

  receta = {
    "id": "",
    "nombre": "",
    "descripcion": "",
    "dificultad": "",
    "tiempoPreparacion": ""
  };

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiControllerService,
    private toastController: ToastController,
    private router: Router
  ) { 
    this.formularioReceta = this.formBuilder.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      dificultad: ['', [Validators.required]],
      tiempoPreparacion: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000, // Duración en milisegundos
      color,
      position: 'top', // Posición del toast
    });
    await toast.present();
  }

  modificarReceta() {
    if (this.formularioReceta.valid) {
      this.receta = {
        id: this.formularioReceta.value.id,
        nombre: this.formularioReceta.value.nombre,
        descripcion: this.formularioReceta.value.descripcion,
        dificultad: this.formularioReceta.value.dificultad,
        tiempoPreparacion: this.formularioReceta.value.tiempoPreparacion
      };

      this.api.updateReceta(this.receta).subscribe(
        (response) => {
          console.log('Receta actualizada:', response);

          // Mostrar popup de éxito
          this.presentToast('¡Receta actualizada exitosamente!', 'success');

          // Redirigir a la lista de recetas
          this.router.navigate(['/tabs/misRecetas']);
        },
        (error) => {
          console.error('Error al actualizar receta:', error);

          // Mostrar popup de error
          this.presentToast('Error al actualizar la receta. Inténtalo nuevamente.', 'danger');
        }
      );
    } else {
      // Validar si el formulario no es válido
      this.presentToast('Por favor, completa todos los campos correctamente.', 'warning');
    }
  }
}

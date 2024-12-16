import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiControllerService } from 'src/app/services/api-controller.service';
import { ToastController } from '@ionic/angular'; // Importar ToastController

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.page.html',
  styleUrls: ['./crear-receta.page.scss'],
})
export class CrearRecetaPage implements OnInit {

  recipeForm: FormGroup;

  receta = {
    "nombre": "",
    "descripcion": "",
    "dificultad": "",
    "tiempoPreparacion": ""
  }

  constructor(
    private fb: FormBuilder,
    private api: ApiControllerService,
    private router: Router,
    private toastController: ToastController // Inyectar ToastController
  ) {
    this.recipeForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      dificultad: ['', Validators.required],
      tiempoPreparacion: ['', [Validators.required, Validators.min(1)]],
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

  crearReceta() {
    if (this.recipeForm.valid) {

      this.receta = {
        nombre: this.recipeForm.value.nombre,
        descripcion: this.recipeForm.value.descripcion,
        dificultad: this.recipeForm.value.dificultad,
        tiempoPreparacion: this.recipeForm.value.tiempoPreparacion
      }

      console.log("la receta es: ", this.receta)
      this.api.postReceta(this.receta).subscribe(
        (response) => {
          console.log('Receta creada:', response);

          // Mostrar popup de éxito
          this.presentToast('¡Receta creada exitosamente!', 'success');

          // Redirigir a la lista de recetas
          this.router.navigate(['/recipe-list']);
        },
        (error) => {
          console.error('Error al crear receta:', error);

          // Mostrar popup de error
          this.presentToast('Error al crear la receta. Inténtalo nuevamente.', 'danger');
        }
      );
    }
  }
}

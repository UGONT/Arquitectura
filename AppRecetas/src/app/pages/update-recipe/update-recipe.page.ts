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
  }

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

  ngOnInit() {
  }

  modificarReceta() {
    if (this.formularioReceta.valid) {

      this.receta = {
        id:this.formularioReceta.value.id,
        nombre: this.formularioReceta.value.nombre,
        descripcion: this.formularioReceta.value.descripcion,
        dificultad: this.formularioReceta.value.dificultad,
        tiempoPreparacion: this.formularioReceta.value.tiempoPreparacion
      }

      
      this.api.updateReceta(this.receta).subscribe(
        (response) => {
          console.log('Receta creada:', response);
          this.router.navigate(['/recipe-list']); // Redirige a la lista de recetas
        },
        (error) => {
          console.error('Error al crear receta:', error);
        }
      );
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

}

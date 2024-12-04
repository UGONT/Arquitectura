import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiControllerService } from 'src/app/services/api-controller.service';

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
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      dificultad: ['', Validators.required],
      tiempoPreparacion: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {}

  crearReceta() {
    if (this.recipeForm.valid) {

      const nuevaReceta = this.recipeForm.value;
      this.api.postReceta(nuevaReceta).subscribe(
        (response) => {
          console.log('Receta creada:', response);
          this.router.navigate(['/list-recipes']); // Redirige a la lista de recetas
        },
        (error) => {
          console.error('Error al crear receta:', error);
        }
      );
    }
  }

}

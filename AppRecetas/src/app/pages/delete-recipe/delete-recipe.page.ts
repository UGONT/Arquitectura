import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiControllerService } from 'src/app/services/api-controller.service';

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
  }
  constructor(
    private fb: FormBuilder,
    private api: ApiControllerService,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      id: ['', [Validators.required]],
    });
   }

  ngOnInit() {
  }

  borrarReceta() {
    if (this.recipeForm.valid) {

      
      this.api.deleteReceta(this.recipeForm.value.id).subscribe(
        (response) => {
          console.log('Receta eliminada:', response);
          this.router.navigate(['/recipe-list']); // Redirige a la lista de recetas
        },
        (error) => {
          console.error('Error al eliminar receta:', error);
        }
      );
    }
  }
}

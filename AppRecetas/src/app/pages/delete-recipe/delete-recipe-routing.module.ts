import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteRecipePage } from './delete-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteRecipePageRoutingModule {}

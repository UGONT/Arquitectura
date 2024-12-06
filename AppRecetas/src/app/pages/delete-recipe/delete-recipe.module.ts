import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteRecipePageRoutingModule } from './delete-recipe-routing.module';

import { DeleteRecipePage } from './delete-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    DeleteRecipePageRoutingModule
  ],
  declarations: [DeleteRecipePage]
})
export class DeleteRecipePageModule {}

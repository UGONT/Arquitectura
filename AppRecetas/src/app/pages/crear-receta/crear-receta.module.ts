import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearRecetaPageRoutingModule } from './crear-receta-routing.module';

import { CrearRecetaPage } from './crear-receta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CrearRecetaPageRoutingModule
  ],
  declarations: [CrearRecetaPage]
})
export class CrearRecetaPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarRecetasThemealbdPageRoutingModule } from './buscar-recetas-themealbd-routing.module';

import { BuscarRecetasThemealbdPage } from './buscar-recetas-themealbd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarRecetasThemealbdPageRoutingModule
  ],
  declarations: [BuscarRecetasThemealbdPage]
})
export class BuscarRecetasThemealbdPageModule {}

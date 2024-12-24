import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarRecetasThemealbdPage } from './buscar-recetas-themealbd.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarRecetasThemealbdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarRecetasThemealbdPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'principal',
        loadChildren: () => import('../principal/principal-routing.module').then(m => m.PrincipalPageRoutingModule)
      },
      {
        path: 'mealbd',
        loadChildren: () => import('../buscar-recetas-themealbd/buscar-recetas-themealbd-routing.module').then(m => m.BuscarRecetasThemealbdPageRoutingModule)
      },
      {
        path: 'misRecetas',
        loadChildren: () => import('../recipe-list/recipe-list-routing.module').then(m => m.RecipeListPageRoutingModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil-routing.module').then(m => m.PerfilPageRoutingModule)
      },
      
      {
        path: '',
        redirectTo: '/tabs/principal',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

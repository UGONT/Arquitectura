import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'recipe-list',
    loadChildren: () => import('./pages/recipe-list/recipe-list.module').then( m => m.RecipeListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'crear-receta',
    loadChildren: () => import('./pages/crear-receta/crear-receta.module').then( m => m.CrearRecetaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'verify',
    loadChildren: () => import('./pages/auth/verify/verify.module').then( m => m.VerifyPageModule)
  },
  {
    path: 'update-recipe',
    loadChildren: () => import('./pages/update-recipe/update-recipe.module').then( m => m.UpdateRecipePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'delete-recipe',
    loadChildren: () => import('./pages/delete-recipe/delete-recipe.module').then( m => m.DeleteRecipePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'buscar-recetas-themealbd',
    loadChildren: () => import('./pages/buscar-recetas-themealbd/buscar-recetas-themealbd.module').then( m => m.BuscarRecetasThemealbdPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule),
    canActivate : [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

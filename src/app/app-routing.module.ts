import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'alumno-create',
    loadChildren: () => import('./pages/alumnos/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'contacto-create',
    loadChildren: () => import('./pages/contactos/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'alumno-edit/:id',
    loadChildren: () => import('./pages/alumnos/edit/edit.module').then( m => m.EditPageModule)
  },

  {
    path: 'alumno-inicio',
    loadChildren: () => import('./pages/alumnos/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'contacto-edit/:id',
    loadChildren: () => import('./pages/contactos/edit/edit.module').then( m => m.EditPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

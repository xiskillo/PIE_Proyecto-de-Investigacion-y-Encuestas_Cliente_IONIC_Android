import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },  
  { path: 'inicio', loadChildren: './pages/inicio/inicio.module#InicioPageModule' },
  { path: 'qr', loadChildren: './pages/qr/qr.module#QrPageModule' },
  { path: 'ver-encuestas', loadChildren: './pages/ver-encuestas/ver-encuestas.module#VerEncuestasPageModule' },
  { path: 'test', loadChildren: './pages/test/test.module#TestPageModule' },
  { path: 'testing', loadChildren: './pages/testing/testing.module#TestingPageModule' },
  { path: 'bienvenida', loadChildren: './pages/bienvenida/bienvenida.module#BienvenidaPageModule' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

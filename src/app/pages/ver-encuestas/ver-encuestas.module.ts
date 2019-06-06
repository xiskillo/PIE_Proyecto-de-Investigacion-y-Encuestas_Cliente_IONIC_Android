import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerEncuestasPage } from './ver-encuestas.page';
import { ComponentsModule } from '../../components/components.module';
import { InstruccionesEncuestasComponent } from '../../components/instrucciones-encuestas/instrucciones-encuestas.component';
import { GraciasEncuestasComponent } from '../../components/gracias-encuestas/gracias-encuestas.component';


const routes: Routes = [
  {
    path: '',
    component: VerEncuestasPage
  }
];

@NgModule({
  entryComponents: [
    InstruccionesEncuestasComponent, GraciasEncuestasComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  declarations: [VerEncuestasPage]
})
export class VerEncuestasPageModule {}

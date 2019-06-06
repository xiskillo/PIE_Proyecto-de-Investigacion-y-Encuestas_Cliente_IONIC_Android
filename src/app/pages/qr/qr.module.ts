import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QrPage } from './qr.page';
import { ComponentsModule } from '../../components/components.module';
import { InstruccionesQRComponent } from '../../components/instrucciones-qr/instrucciones-qr.component';


const routes: Routes = [
  {
    path: '',
    component: QrPage
  }
];

@NgModule({
  entryComponents: [
    InstruccionesQRComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  declarations: [QrPage]
})
export class QrPageModule {}

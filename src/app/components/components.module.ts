import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { InstruccionesQRComponent } from './instrucciones-qr/instrucciones-qr.component';
import { InstruccionesInicioComponent } from './instrucciones-inicio/instrucciones-inicio.component';
import { InstruccionesEncuestasComponent } from './instrucciones-encuestas/instrucciones-encuestas.component';
import { GraciasEncuestasComponent } from './gracias-encuestas/gracias-encuestas.component';


@NgModule({
  declarations: [HeaderComponent,InstruccionesQRComponent, InstruccionesInicioComponent, 
    InstruccionesEncuestasComponent, GraciasEncuestasComponent ],
  exports: [
    HeaderComponent,
    InstruccionesQRComponent,
    InstruccionesInicioComponent,
    InstruccionesEncuestasComponent,
    GraciasEncuestasComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }

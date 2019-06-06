import { Component, OnInit, ApplicationRef } from '@angular/core';
import { PushService } from '../../services/push.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { InstruccionesInicioComponent } from '../../components/instrucciones-inicio/instrucciones-inicio.component';
import { PopoverController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  notificaciones: OSNotificationPayload[] = []

  constructor( private pushService: PushService, private applicationRef: ApplicationRef,
     private popoverController: PopoverController, private emailComposer: EmailComposer) { }

  ngOnInit() {

    this.pushService.emitir.subscribe( n => {

      this.notificaciones.unshift(n);
      this.applicationRef.tick(); // REINICIA EL CICLO DE REFRESCO EN ANGULAR POR SI NO REFRESCA LAS NOTIFICACIOENS EN LA PAGE

    })

  }
async borrarNoticiasIndividual(i){
  
  await this.pushService.borrarNoticiasIndividual(i);
  this.notificaciones.splice(i,1);
}

  async borrarNoticias(){
    await this.pushService.borrarNoticias();
    this.notificaciones = [];
  }

  async ionViewWillEnter(){

   console.log('SE CARGA EL ION VIEW WILL ENTER CON EL GET NOTIFICACIONES')
   this.notificaciones = await this.pushService.getNotificaciones();

  }

  

  async instruccionesInicio(){
    const popover = await this.popoverController.create({
      component: InstruccionesInicioComponent,
      mode: 'md',
      translucent: true
    });
    return await popover.present();

  }


contactar(){
this.emailComposer.isAvailable().then((available: boolean) =>{
if(available) {
 
}
});

let email = {
  to: 'xiskillo@gmail.com',
  subject: 'PROYECTO DE INVESTIGACIÓN Y ENCUESTAS',
  body: 'Escriba aquí su mensaje de contacto para el Administrador..',
  isHtml: true
}


this.emailComposer.open(email);

}

  


}

import { Component, OnInit, ApplicationRef } from '@angular/core';
import { PushService } from '../../services/push.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  notificaciones: OSNotificationPayload[] = []

  constructor( private pushService: PushService, private applicationRef: ApplicationRef) { }

  ngOnInit() {

    this.pushService.emitir.subscribe( n => {

      this.notificaciones.unshift(n);
      this.applicationRef.tick(); // REINICIA EL CICLO DE REFRESCO EN ANGULAR POR SI NO REFRESCA LAS NOTIFICACIOENS EN LA PAGE

    })

  }

  async ionViewWillEnter(){

   console.log('SE CARGA EL ION VIEW WILL ENTER CON EL GET NOTIFICACIONES')
   this.notificaciones = await this.pushService.getNotificaciones();

  }


}

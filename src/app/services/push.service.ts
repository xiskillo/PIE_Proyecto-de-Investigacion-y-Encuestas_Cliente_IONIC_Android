import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }


  inicializar(){


      this.oneSignal.startInit('0a094478-26f7-4064-8d31-1c4a23e16402', '18440637178');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe((n) => {
      // do something when notification is received

      console.log( 'OK NOTIFICACIÓN RECIBIDA' , n);
      });

      this.oneSignal.handleNotificationOpened().subscribe((n) => {
        // do something when a notification is opened
        console.log( 'OK NOTIFICACIÓN ABIERTA' , n);
      });

      this.oneSignal.endInit();
        }
}

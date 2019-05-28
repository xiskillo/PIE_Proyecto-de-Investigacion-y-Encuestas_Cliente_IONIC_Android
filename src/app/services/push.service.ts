import { Injectable, EventEmitter } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class PushService {

  identificadorDispositivo: string;

  notificaciones: OSNotificationPayload[] = [
    //{
      // titulo: "Titulo Push",
      // contenido: "Cuerpo del push",
      // date: new Date()
   // }
  ];


  emitir = new EventEmitter<OSNotificationPayload>(); // OBSERVABLE QUE CADA VEZ QUE ES LLAMADO EMITE UN OSNPAYLOAD

  constructor(private oneSignal: OneSignal, private storage: Storage) {

    this.leerNotificaciones();
   }



  async getNotificaciones(){

    await this.leerNotificaciones();
    return [...this.notificaciones];
    // SI BORRO EL ARREGLO LO QUE HACE ESTO POR SI ACASO CON EL OPERADOR ... SON SEPARADOS LOS ARREGLOS COMO OBJETOS NUEVOS
  }


  inicializar(){


      this.oneSignal.startInit('0a094478-26f7-4064-8d31-1c4a23e16402', '18440637178');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification); //TIPO DE NOTIFICACION EN EL DISPOSITIVO

      this.oneSignal.handleNotificationReceived().subscribe((n) => {
      // ACCIONES EN CUANTO SE RECIBE UNA PUSH

      console.log( 'OK NOTIFICACIÓN RECIBIDA' , n);

      this.comprobarNotificacion(n);
      });

      this.oneSignal.handleNotificationOpened().subscribe((n) => {
        // do something when a notification is opened
        console.log( 'OK NOTIFICACIÓN ABIERTA' , n);
      });


      this.oneSignal.getIds().then( x =>{
        this.identificadorDispositivo = x.userId;
        console.log(this.identificadorDispositivo);
      });

      this.oneSignal.endInit();
        }

  
  async comprobarNotificacion(n: OSNotification){

    await this.leerNotificaciones();

    const payload = n.payload;

    const validar = this.notificaciones.find(x => x.notificationID === payload.notificationID);

    if (validar){
      return;
    }

    this.notificaciones.unshift(payload);
    this.emitir.emit(payload);
    
    this.guardarNotificaciones();

  
  }

  guardarNotificaciones(){
    this.storage.set('notificaciones', this.notificaciones);

  }

  async leerNotificaciones(){

   this.notificaciones = await this.storage.get('notificaciones') || []; // POR QUE PUEDE DEVOLVER NULL SI NO EXISTE

    
  }



}

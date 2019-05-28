import { Injectable } from '@angular/core';
import { RegistrosQR } from '../models/registros.models';
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  registrosQR: RegistrosQR[] = [];

  constructor( private storage: Storage) { 

    this.storage.get('registrosQRLocal').then( x => {

      this.registrosQR = x || [];
    })
  }



  guardarRegistroQR( format: string, text: string){

    const qr = new RegistrosQR( format, text);
    this.registrosQR.unshift (qr);
    console.log(this.registrosQR);
    this.storage.set('registrosQRLocal', this.registrosQR);
  }
}




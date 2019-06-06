import { Injectable } from '@angular/core';
import { RegistrosQR } from '../models/registros.models';
import { Storage } from '@ionic/storage';
import { ApiService } from './api.service';



@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  registrosQR: RegistrosQR[] = [];
  
  
 

  constructor( private storage: Storage, private apiService: ApiService) { 

    // this.storage.get('registrosQRLocal').then( x => {
    //   this.registrosQR = x || [];
    // });

    
    this.leerRegistrosQRInicio();
    
  

  }



  guardarRegistroQR( codificado: string, descodificado: string){

    const qr = new RegistrosQR( codificado, descodificado);
    this.registrosQR.unshift (qr);
    console.log(this.registrosQR);
    this.storage.set('registrosQRLocal', this.registrosQR);
  }




  async leerRegistrosQRInicio(){
    this.registrosQR = await this.storage.get('registrosQRLocal') || []; // POR QUE PUEDE DEVOLVER NULL SI NO EXISTE
    console.log("LEER REGISTROS QR INICIO");
    console.log(this.registrosQR);
    this.apiService.NUHSA = this.registrosQR[0].descodificado;
    this.apiService.getUsuarioNuhsa();
    }





}







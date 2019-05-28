import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';
import { ApiService } from '../../services/api.service';
import { AlertController } from '@ionic/angular';
import { PushService } from '../../services/push.service';




@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})

export class QrPage implements OnInit {

  nuhsaQR: string;
  nuhsaQRcodificado: string;
  nuhsaManual: string;
  nuhsaManualCodificado: string;
  codigoRegistroUnificado: string;


  
  


  constructor(public alertController: AlertController, private barcodeScanner: BarcodeScanner, 
    private dataLocal: DataLocalService, public apiService: ApiService, pushService: PushService) { }

  ngOnInit() {
  }



  escanearQR(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (!barcodeData.cancelled){
        this.nuhsaQRcodificado = barcodeData.text;
        this.nuhsaQR = atob(this.nuhsaQRcodificado);
        this.apiService.NUHSA = this.nuhsaQR;
        this.codigoRegistroUnificado = this.nuhsaQR;
        this.dataLocal.guardarRegistroQR( barcodeData.format, barcodeData.text);
        this.apiService.getUsuarioNuhsa();

      }
      
     }).catch(err => {
         console.log('Error', err);
         this.dataLocal.guardarRegistroQR( 'ERROR FORMAT QR', 'ERROR TEXTO QR');
     });

     
  }



  async registrarNuhsa() {
    const alert = await this.alertController.create({
      header: 'REGISTRO MANUAL',
      inputs: [
        {
          name: 'codigo',
          type: 'text',
          placeholder: 'Introduce tu código de registro personal..'
        },
        
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'OK',
          handler: (x) => {
            console.log('Confirm Ok');
            this.nuhsaManualCodificado=x.codigo;
            this.nuhsaManual=atob(x.codigo);            
            this.apiService.NUHSA = this.nuhsaManual;
            this.codigoRegistroUnificado = this.nuhsaManual;
            this.apiService.getUsuarioNuhsa();
            
          
          }
        }
      ]
    });
  
    await alert.present();
  }


  

  registrarUsuario(){
    
    
    this.apiService.registrarUsuario();
    this.alertaRegistroSi();
    
  }
  

  async alertaRegistroSi() {
    const alert = await this.alertController.create({
      header: 'REGISTRO CORRECTO',
      message: 'Ha sido registrado correctamente',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}

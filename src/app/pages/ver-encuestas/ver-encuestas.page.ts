import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-ver-encuestas',
  templateUrl: './ver-encuestas.page.html',
  styleUrls: ['./ver-encuestas.page.scss'],
})
export class VerEncuestasPage implements OnInit {

  codigo: string;
 

  componentes: Componente[] = [
  {
    icon: 'appstore',
    name: 'Pepelo',
    redirectTo: '/inicio'
  },
  {
    icon: 'appstore',
    name: 'Ray',
    redirectTo: '/inicio'
  }
];

constructor(public alertController: AlertController) { }

ngOnInit() {
}

async codigoEncuesta() {
  const alert = await this.alertController.create({
    header: 'CODIGO DE ENCUESTA',
    inputs: [
      {
        name: 'codigo',
        type: 'text',
        placeholder: 'Introduce código de encuesta'
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
          this.codigo=x.codigo;
        
        }
      }
    ]
  });

  await alert.present();
}



}


interface Componente {

icon: string;
name: string;
redirectTo: string;
}
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { Subscriber } from 'rxjs';
import { PushService } from '../../services/push.service';


@Component({
  selector: 'app-ver-encuestas',
  templateUrl: './ver-encuestas.page.html',
  styleUrls: ['./ver-encuestas.page.scss'],
})
export class VerEncuestasPage implements OnInit {

  codigo: any;

  test: any[]=[];
  procedimientos: any[]=[];
  encuestas: any[]=[];

  nuhsa: any = 4;
  encuestas_filtradas: any[]=[]



constructor(public alertController: AlertController, public apiService: ApiService, public pushService: PushService ) { }

ngOnInit() {

  this.apiService.getTest().subscribe((data: any[]) => {
    this.test=data;
    console.log('DJANGO GET TEST')
    console.log(data);
  });
  
  this.apiService.getProcedimientos().subscribe((data: any[]) => {
    this.procedimientos=data;
    console.log('DJANGO GET PROCEDIMIENTOS')
    console.log(data);
  });

  
  this.apiService.getEncuestas().subscribe((x: any[]) => {
    this.encuestas = x;
  });

}


// getPreguntas(nuhsa: number){
//   console.log("AHORA EMPIEZA EL BUCLE CON PREGUNTAS DE PACIENTE 4")
//     for ( var i = 0 ; i < this.encuestas.length ; i++){
//       if (this.encuestas[i].paciente==nuhsa){
//         console.log(this.encuestas[i].pregunta);
//       }
//     }
//     console.log("AHORA TERMIMA EL BUCLE CON PREGUNTAS DE PACIENTE 4")
// }


async contestarPregunta(id, pregunta) {
  const alert = await this.alertController.create({
    header: 'CODIGO DE ENCUESTA',
    inputs: [
      {
        name: 'pregunta',
        type: 'text',
        placeholder: pregunta
      },
      {
        name: 'respuesta',
        type: 'text',
        placeholder: "Conteste aqui.."
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
          console.log('PREGUNTA');
          console.log(pregunta);
          console.log('ID');
          console.log(id);
          this.apiService.putEncuestas(id, x.respuesta);
        
        }
      }
    ]
  });

  await alert.present();
}




}



import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { Subscriber } from 'rxjs';
import { PushService } from '../../services/push.service';
import { InstruccionesEncuestasComponent } from '../../components/instrucciones-encuestas/instrucciones-encuestas.component';
import { Router } from '@angular/router';
import { GraciasEncuestasComponent } from '../../components/gracias-encuestas/gracias-encuestas.component';


@Component({
  selector: 'app-ver-encuestas',
  templateUrl: './ver-encuestas.page.html',
  styleUrls: ['./ver-encuestas.page.scss'],
})
export class VerEncuestasPage implements OnInit {
  
  encuestas: any[]=[];
  encuestas_contestadas: any[]=[];


  aux: any;
  test: any[]=[];
  procedimientos: any[]=[];
  codigo: any; 
  



constructor(public alertController: AlertController, public apiService: ApiService, public pushService: PushService, private popoverController: PopoverController, private router: Router  ) {


 
 }

ngOnInit() {

  // this.apiService.getTest().subscribe((data: any[]) => {
  //   this.test=data;
  //   console.log('DJANGO GET TEST')
  //   console.log(data);
  // });
  
  // this.apiService.getProcedimientos().subscribe((data: any[]) => {
  //   this.procedimientos=data;
  //   console.log('DJANGO GET PROCEDIMIENTOS')
  //   console.log(data);
  // });

  
   this.getEncuestas();

  

}

async getEncuestas(){

  await this.apiService.getEncuestas().subscribe((x: any[]) => {
    this.encuestas = x;
    this.encuestasContestadas();
  });

}




encuestasContestadas(){
 
  this.encuestas_contestadas = [];
  for ( var i = 0 ; i < this.encuestas.length ; i++){
          if (this.encuestas[i].contestacion=='NO'){
            this.encuestas_contestadas.push(this.encuestas[i]);
          }
        }
}











async contestarPregunta(id, pregunta) {
  const alert = await this.alertController.create({
    header: 'Responda:',
    inputs: [
      // {
      //   name: 'pregunta',
      //   type: 'text',
      //   placeholder: pregunta
      // },
      {
        name: 'respuesta',
        type: 'text',
        placeholder: "Escriba aqui.."
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
          this.aux=this.apiService.putEncuestas(id, x.respuesta);
          this.gracias();
          console.log(this.aux);
          setTimeout(() => {
            this.getEncuestas();
            
          }, 500);
          
         
         
        
        }
      }
    ]
  });

  await alert.present();
}




async instruccionesEncuestas(){
  const popover = await this.popoverController.create({
    component: InstruccionesEncuestasComponent,
    mode: 'md',
    translucent: true,
   
  });
  return await popover.present();

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




async gracias(){
  
    const popover = await this.popoverController.create({
      component: GraciasEncuestasComponent,
      mode: 'md',
      translucent: true,      
    });

    
    return await popover.present();
  
  

}





}



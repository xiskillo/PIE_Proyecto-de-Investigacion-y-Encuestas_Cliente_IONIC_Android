import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { PushService } from './push.service';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  STATIC_URL: string = "http://192.168.0.200:8000";
  NUHSA: string;
  PACIENTE_NUHSA: any[];

  constructor( private http:HttpClient, private httptest:HttpClient, private httpProcedimientos:HttpClient,
     public pushService : PushService ) { }

  getEncuestas() { return this.http.get(this.STATIC_URL + '/api/encuestas/?paciente=' + this.NUHSA); }

  // CAPTURA EL JSON UNICO DEL NUHSA PASADO DESDE LA PAGINA QR

  getPacienteNuhsa() { return this.http.get(this.STATIC_URL + '/api/pacientes/?nuhsa=' + this.NUHSA); }

  getRandomUser() { return this.http.get('https://randomuser.me/api/?results=25'); }

  getTest(){ return this.httptest.get(this.STATIC_URL+'/apitesting/tickets/'); }

  getProcedimientos() { return this.http.get(this.STATIC_URL+'/api/procedimientos/'); }


  registrarUsuario(){

    

    let id: number;
    let error : [];

    
    
    // for ( var i = 0 ; i < this.PACIENTE_NUHSA.length ; i++){
    //   if (this.PACIENTE_NUHSA[i].nuhsa==this.NUHSA){
        id = this.PACIENTE_NUHSA[0].id;
    //   }
    // }

    this.putRegistroUsuario(id,this.pushService.identificadorDispositivo);


    



   }


  getUsuarioNuhsa(){
    this.getPacienteNuhsa().subscribe((x: any[]) => {
      this.PACIENTE_NUHSA = x;
    });

  }

  postProcedimientos() {
    let body = {
      "nombre" : "OLE LAS PRUEBAS DE PROCEDIMIENTOS",
      "descripcion" : "descipcion de pruena desde ionic"
    }  
    this.http.post(this.STATIC_URL+"/api/procedimientos/", body )
      .subscribe(x => {
        console.log (x);
        console.log("MIRA POST IONIC");
        console.log(x['_body']);
       }, error => {
        console.log(error);
      });
  }

  putProcedimientos(id: any) {
    let body = {
      "nombre" : "PUT reNUEVO",
      "descripcion" : "descipcion de pruena desde ionic"
    }  
    this.http.put(this.STATIC_URL+"/api/procedimientos/" + id + "/" , body )
      .subscribe(x => {
        console.log (x);
        console.log("MIRA POST IONIC");
        console.log(x['_body']);
       }, error => {
        console.log(error);
      });
  }


  putEncuestas(id: any, r: string) {
    let body = {      
      "respuesta" : r
    }
  
    this.http.put(this.STATIC_URL+"/api/encuestas/" + id + "/" , body )
      .subscribe(x => {
        
        console.log("PUT ENCUESTAS");
        console.log(x['_body']);
       }, error => {
        console.log(error);
      });
   

  }

  putRegistroUsuario(id: any, android: string) {
    let body = {      
      "id_android" : android,
      "nuhsa" : this.NUHSA
    }
  
    this.http.put(this.STATIC_URL+"/api/pacientes/" + id + "/" , body )
      .subscribe(x => {
        
        console.log("PUT REGISTRO USUARIO");        
       }, error => {
        console.log(error);
        
      });
   

  }


  putPreguntas(idPaciente: any) {
    let body = {
      "nombre" : "PUT reNUEVO",
      "descripcion" : "descipcion de pruena desde ionic"
      
    }
  
    this.http.put(this.STATIC_URL+"/api/encuestas/" + idPaciente + "/" , body )
      .subscribe(x => {
        console.log (x);
        console.log("MIRA POST IONIC");
        console.log(x['_body']);
       }, error => {
        console.log(error);
      });
   

  }




}

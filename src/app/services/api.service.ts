import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PushService } from './push.service';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  STATIC_URL: string = "http://proyectodeinvestigacionyencuestas.franjoacva.website";

  NUHSA: string;
  PACIENTE_NUHSA: any[];

  TOKEN: any;
  ACCESS_TOKEN: string;
  REFRESH_TOKEN: string;


  // postregreso: any;



  constructor( private http: HttpClient, private httptest: HttpClient, private httpProcedimientos: HttpClient,
               public pushService : PushService ) {  
                // CONSTRUCTOR
     }

  
  
getEncuestas() {
  let head ={'Authorization': 'Bearer ' + this.ACCESS_TOKEN, };
  return this.http.get(this.STATIC_URL + '/api/encuestas/?paciente=' + this.NUHSA , { headers : head } );
}

  // CAPTURA EL JSON UNICO DEL NUHSA PASADO DESDE LA PAGINA QR

getPacienteNuhsa() { 
  let head ={'Authorization': 'Bearer ' + this.ACCESS_TOKEN, };
  return this.http.get(this.STATIC_URL + '/api/pacientes/?nuhsa=' + this.NUHSA, { headers : head } );
}


getUsuarioNuhsa(){
  this.getPacienteNuhsa().subscribe((x: any[]) => {
    this.PACIENTE_NUHSA = x;
  });

}

registrarUsuario(){
  let id: number;
  // for ( var i = 0 ; i < this.PACIENTE_NUHSA.length ; i++){
  //   if (this.PACIENTE_NUHSA[i].nuhsa==this.NUHSA){
  id = this.PACIENTE_NUHSA[0].id;
  //   }
  // }

  this.putRegistroUsuario(id, this.pushService.identificadorDispositivo);
}


async putEncuestas(id: any, r: string) {
  let head ={ 'Authorization': 'Bearer ' + this.ACCESS_TOKEN, };
  let body = { "respuesta" : r , "contestacion" : "SI" };

  await this.http.put(this.STATIC_URL + "/api/encuestas/" + id + "/" , body , { headers : head } )
    .subscribe(x => {
      console.log("PUT ENCUESTAS");

      }, error => {
      console.log(error);
    });
}

putRegistroUsuario(id: any, android: string) {
  let head ={'Authorization': 'Bearer ' + this.ACCESS_TOKEN, };
  let body = { "id_android" : android, "nuhsa" : this.NUHSA};

  this.http.put(this.STATIC_URL + "/api/pacientes/" + id + "/" , body, { headers : head }  )
    .subscribe(x => {
      console.log("PUT REGISTRO USUARIO");
      }, error => {
      console.log(error);
    });
}


  

async getTokenPost() {
  let body = {
    "username" : "admin",
    "password" : "proyectointegrado"
  };
  await this.http.post(this.STATIC_URL + "/api/token/", body )
    .subscribe(x => {
      console.log (x);
      this.TOKEN = x;
      this.ACCESS_TOKEN = this.TOKEN.access;
      this.REFRESH_TOKEN = this.TOKEN.refresh;
      console.log("GET TOKEN CON POST");
      console.log(this.TOKEN);
      console.log("GET ACCESS TOKEN CON POST");
      console.log(this.ACCESS_TOKEN);
      console.log("GET REFRESH TOKEN CON POST");
      console.log(this.REFRESH_TOKEN);

      }, error => {
      console.log(error);
    });
}


verAccessToken(){
  console.log("EL ACCESS TOKEN ES");
  console.log(this.ACCESS_TOKEN);
  console.log("EL REFRESH TOKEN ES");
  console.log(this.REFRESH_TOKEN);
}



  // getRandomUser() { return this.http.get('https://randomuser.me/api/?results=25'); }

  // getTest(){ return this.httptest.get(this.STATIC_URL + '/apitesting/tickets/'); }


  // getProcedimientos() { 

  //   let head = {
  //       'Authorization': 'Bearer ' + this.ACCESS_TOKEN,

  //     };
    
    
  //   return this.http.get(this.STATIC_URL + '/api/procedimientos/', {headers : head }); 

  // }


  // postProcedimientos() {
  //   let body = {
  //     "nombre" : "OLE LAS PRUEBAS DE PROCEDIMIENTOS",
  //     "descripcion" : "descipcion de pruena desde ionic"
  //   }  
  //   this.http.post(this.STATIC_URL+"/api/procedimientos/", body )
  //     .subscribe(x => {
  //       console.log (x);
  //       this.postregreso=x;
  //       console.log("MIRA POST IONIC");
  //       console.log(this.postregreso);
  //       console.log(x['_body']);
  //      }, error => {
  //       console.log(error);
  //     });
  // }

  // putPreguntas(idPaciente: any) {
  //   let body = {
  //     "nombre" : "PUT reNUEVO",
  //     "descripcion" : "descipcion de pruena desde ionic"
      
  //   }
  
  //   this.http.put(this.STATIC_URL + "/api/encuestas/" + idPaciente + "/" , body )
  //     .subscribe(x => {
  //       console.log (x);
  //       console.log("MIRA POST IONIC");
  //       console.log(x['_body']);
  //      }, error => {
  //       console.log(error);
  //     });
   

  // }
 

  putProcedimientos(id: any) {
  
  let head ={
    'Authorization': 'Bearer ' + this.ACCESS_TOKEN,

  }

  let body = {
      'nombre' : 'PUT reNUEVO' ,
      'descripcion' : 'descipcion de pruena desde ionic'
    };
    
  this.http.put(this.STATIC_URL+"/api/procedimientos/" + id + "/" , body, {headers : head } ).subscribe(x => {
        console.log (x);
        console.log("MIRA POST IONIC");
        console.log(x['_body']);
       }, error => {
        console.log(error);
      });
  }




}

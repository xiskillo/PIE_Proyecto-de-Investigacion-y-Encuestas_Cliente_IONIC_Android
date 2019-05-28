import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {

  randomUser: any[]=[];


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

  constructor( public apiService: ApiService) { }

  ngOnInit() {



    this.apiService.getRandomUser().subscribe((data: any[]) => {
      this.randomUser=data['results'];
      console.log(data);
      console.log('TEST DE RANDOMUSER.COM')});


  }

}


interface Componente {
  icon: string;
  name: string;
  redirectTo: string;
}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-encuestas',
  templateUrl: './ver-encuestas.page.html',
  styleUrls: ['./ver-encuestas.page.scss'],
})
export class VerEncuestasPage implements OnInit {

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

constructor() { }

ngOnInit() {
}

}


interface Componente {

icon: string;
name: string;
redirectTo: string;
}
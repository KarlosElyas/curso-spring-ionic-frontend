import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage() // isso fara que o nome dessa classe seja obtido como String
@Component({
  selector: 'page-home',
  templateUrl: 'home.html' // html que esta sendo controlado por este Controller
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}

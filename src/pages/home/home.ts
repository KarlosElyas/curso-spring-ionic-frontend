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
  
  // por padrão o método é público
  login() {
    this.navCtrl.setRoot('CategoriasPage');
    // ao utilizar PUSH(empilhar pagina emcima) é adicionado a aba VOLTAR automaticamente
  }

}

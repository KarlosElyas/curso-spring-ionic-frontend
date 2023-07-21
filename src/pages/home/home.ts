import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage() // isso fara que o nome dessa classe seja obtido como String
@Component({
  selector: 'page-home',
  templateUrl: 'home.html' // html que esta sendo controlado por este Controller
})
export class HomePage {

                  // injeção de dependencia de navCtrl automatica
  constructor(public navCtrl: NavController, public menu:MenuController) {

  }
  
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  // por padrão o método é público
  login() {
    this.navCtrl.setRoot('CategoriasPage');
    // ao utilizar PUSH(empilhar pagina emcima) é adicionado a aba VOLTAR automaticamente
  }

}

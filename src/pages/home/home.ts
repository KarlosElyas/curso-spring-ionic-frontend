import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.services';

@IonicPage() // isso fara que o nome dessa classe seja obtido como String
@Component({
  selector: 'page-home',
  templateUrl: 'home.html' // html que esta sendo controlado por este Controller
})
export class HomePage {

  creds : CredenciaisDTO = {email : "", senha : ""}
                  // injeção de dependencia de navCtrl automatica
  constructor(public navCtrl: NavController, 
    public menu:MenuController,
    public auth: AuthService) {

  }
  
  ionViewWillEnter(){
    this.menu.swipeEnable(false); // esconde a barrinha lateral de MENU na home de login
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken().subscribe(
      response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {}
    );
  }

  // por padrão o método é público
  // se o campo estiver VAZIO nem deveria chamar esse metodo para evitar SOBRECARGA do backend
  login() {
    this.auth.authenticate(this.creds).subscribe(
      response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {}
    );
    // ao utilizar PUSH(empilhar pagina emcima) é adicionado a aba VOLTAR automaticamente
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

}

/* SUGESTÕES
  - No login inicial chegar se campos estão Preenchidos antes de acessar o backend
  - Ao buscar cidades no REGISTRAR guardalas como cache pra evitar REQUISIÇÕES DESNECESSARIAS
  - Verificar se email ja está cadastrado
  - PREENCHER ENDEREÇO de acordo com CEP informado 
*/

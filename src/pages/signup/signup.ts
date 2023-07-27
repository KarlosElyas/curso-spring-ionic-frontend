import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService
    ) {
      this.formGroup = this.formBuilder.group({
        nome: ['Joaquim Barbosa', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        // SUGESTÃO: Email ja está cadastrado?
        email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
        tipo : ['1', [Validators.required]],
        // a validação verdadeira do CPF é feita no backend
        cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha : ['123', [Validators.required]],
        logradouro : ['Rua Via', [Validators.required]],
        numero : ['25', [Validators.required]],
        complemento : ['Apto 3', []],
        bairro : ['Copacabana', []],
        cep : ['10828333', [Validators.required]],
        telefone1 : ['977261827', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]]
      })
  }
  
  ionViewDidLoad() { // assim que carregar já busca no banco as cidade e deixa a primeira SELECIONADA
    this.estadoService.findAll().subscribe(
      response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id); // deixa o estado 0 já selecionado
        this.updateCidades();
      },
      error => {}
    );
  }

  // acessar o banco todas vez que muda o estado SOBRECARREGA O BACKEND
  updateCidades() { 
    let estado_id = this.formGroup.value.estadoId; // pega o estado selecionado no html
    this.cidadeService.findAll(estado_id).subscribe(
      response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null); // pra desmarcar a cidade que estiver selecionada
      },
      error => {}
    );
  }

  signupUser() {
    console.log('signupUser');
  }

}

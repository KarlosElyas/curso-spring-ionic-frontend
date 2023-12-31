import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService
    ) {
  }

  // recebendo o PARAMETRO de categorias.ts
  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id'); // pega o paremetro do id
    this.produtoService.findByCategoria(categoria_id).subscribe(
      response => {
        this.items = response['content']; // recebe apenas o content da paginação
        this.loadImageUrls();
      },
      error => {}
    );
  }

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(
        response => { // se a imagem existir então a URL dela é setada no item atual
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {}
      );      
    }
  }

  // passando PARAMETROS de uma página pra outra VIA BODY
  showDetail(produto_id : string) {
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  }
}

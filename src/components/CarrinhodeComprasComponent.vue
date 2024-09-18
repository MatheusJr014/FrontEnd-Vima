<template>
  <div class="container container-fluid container-sm">
    <div class="card border-card mb-3">
      <h5 class="card-title">Carrinho de Compras</h5>
      <div class="card-body text-dark">
        <div class="card-body">
          <div class="table-responsive-sm">
            <table class="table">
              <thead>
                <tr>
                  <th class="colunas" scope="col">#</th>
                  <th class="colunas" scope="col">Produto</th>
                  <th class="colunas" scope="col">Preço</th>
                  <th class="colunas" scope="col">Quantidade</th>
                  <th class="colunas" scope="col">-</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(produto, index) in produtos" :key="produto.id">
                  <th scope="row">
                    <center><img :src="produto.imagemURL" class="card-img-top" alt="..."></center>
                  </th>
                  <td><center>{{ produto.product }}</center></td>
                  <td><center>{{ formatPrice(produto.preco) }}</center></td>
                  <td>
                    <div class="input-groupe">
                      <div class="input-quant">
                        <center>
                          <button @click="aumentaQuantidade(produto.id)" class="btn" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
                            <i class="pi pi-arrow-up" style="font-size: 1.0rem"></i>
                          </button>

                          <input v-model="produto.quantidade" @input="atualizaQuantidade(produto)" class="text-input" style="width: 70px;" type="number" min="1">

                          <button @click="diminuiQuantidade(produto.id)" class="btn " style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
                            <i class="pi pi-arrow-down" style="font-size: 1.0rem"></i>
                          </button>
                        </center>
                      </div>
                    </div>
                  </td>
                  <td>
                    <center>
                      <button @click="removerProduto(produto.id)" type="button" class="btn btn-danger"
                        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
                        <i class="pi pi-trash" style="font-size: 1.0rem"></i>
                      </button>
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="position-cards">
      <div class="card text-bg-secondary mb-3" style="max-width: 28rem; color: black !important;">
        <div class="card-title" style="font-size: 1.5rem; color: green;">Resumo da compra</div>
        <hr />
        <div class="card-body" style="color: white;">
          <div class="table-responsive-sm">
            <table class="table">
              <thead>
                <tr>
                  <th class="text-buy" scope="col">Total</th>
                  <th class="text-buy" scope="col">{{ formatPrice(total) }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="text-buy" scope="col">Desconto</th>
                  <th class="text-buy" scope="col">{{ desconto }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-responsive-sm">
            <table class="table">
              <thead>
                <tr>
                  <th class="text-buy" scope="col">Calcular Frete</th>
                </tr>
              </thead>
            </table>
          </div>
          <tbody class="table-group-divider">
            <tr>
              <th scope="row"></th>
              <th class="text-buy2" scope="col">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="_____-___" aria-label="Recipient's username"
                    aria-describedby="button-addon2">
                  <button class="btn btn-success" type="button" id="button-addon2">Calcular</button>
                </div>
              </th>
            </tr>
          </tbody>
          <router-link><a style="color: green;">Adicionar Cupom</a></router-link>
          <center><a href="#" class="btn btn-success" style="width: 20rem; margin-top: 80px;">Finalizar Compra</a></center>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpdateCarrinhoDataService from '../services/UpdateCarrinhoDataService.js';
import ProductCarrinhoDataService from '../services/ProductCarrinhoDataService.js';
import DeleteProductFromCarrinhoDataService from '../services/DeleteProductFromCarrinhoDataService.js';

export default {
  name: 'CarrinhodeComprasComponent',
  data() {
    return {
      produtos: [],
      total: 0,
      desconto: '0%'
    };
  },
  methods: {
    fetchProdutos() {
      ProductCarrinhoDataService.get()
        .then(response => {
          this.produtos = response.data;
          this.calculateTotal();
        })
        .catch(error => {
          console.error(error);
        });
    },
    removerProduto(idProduct) {
      DeleteProductFromCarrinhoDataService.delete(idProduct)
        .then(response => {
          console.log("Produto removido com sucesso:", response.data);
          this.fetchProdutos();
        })
        .catch(error => {
          console.error("Erro ao remover produto:", error);
        });
    },
    aumentaQuantidade(idProduct) {
      const produto = this.produtos.find(produto => produto.id === idProduct);
      produto.quantidade++;
      this.updateProduct(produto);
    },
    diminuiQuantidade(idProduct) {
      const produto = this.produtos.find(produto => produto.id === idProduct);
      if (produto.quantidade > 1) {
        produto.quantidade--;
        this.updateProduct(produto);
      }
    },
    atualizaQuantidade(produto) {
      if (produto.quantidade < 1) {
        produto.quantidade = 1;
      }
      this.updateProduct(produto);
    },
    updateProduct(produto) {
      UpdateCarrinhoDataService.update(produto.id, { quantidade: produto.quantidade })
        .then(response => {
          console.log("Produto atualizado com sucesso:", response.data);
          this.calculateTotal();
        })
        .catch(error => {
          console.error("Erro ao atualizar produto:", error);
        });
    },
    calculateTotal() {
      let total = 0;
      let desconto = '0%';

      this.produtos.forEach(produto => {
        const precoTotal = produto.preco * produto.quantidade;
        total += precoTotal;
      });

      // Aplicando descontos progressivos
      if (this.produtos.length >= 2 && this.produtos.length < 3) {
        desconto = '5%';
        total = total - (total * 0.05);
      } else if (this.produtos.length >= 3 && this.produtos.length < 4) {
        desconto = '10%';
        total = total - (total * 0.10);
      } else if (this.produtos.length >= 4 && this.produtos.length < 5) {
        desconto = '15%';
        total = total - (total * 0.15);
      } else if (this.produtos.length >= 5) {
        desconto = '20%';
        total = total - (total * 0.20);
      }

      this.total = total;
      this.desconto = desconto;
    },
    formatPrice(price) {
      return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
  },
  mounted() {
    this.fetchProdutos();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  border: none;
}
.img-main {
  background-color: rgba(19, 35, 47, 0.9);
  justify-content: center;
}
.card {
  justify-content: center;
  width: 80rem;
  border-color: #eeeeee;
  box-sizing: border-box;
  border-radius: 1.3rem;
}
b {
  color: #34e7f8;
}
.card-title {
  color: #34e7f8;
  text-align: center;
  font-size: 2rem;
  background-color: white;
  border-radius: 20px;
}
.text-bg-secondary {
  background-color: white !important;
}
.card-text {
  color: #34e7f8;
}
.card.border-card.mb-3 {
  width: 50rem;
}
.position-cards .card {
  display: flex;
  flex-wrap: wrap;
  width: auto;
  position: static;
  padding: 12px;
  border: none;
}
.card-img-top {
  width: 50px;
}
.card.text-bg-secondary.mb-3 {
  left: 50px;
}
body {
  background-color: white;
}
.colunas {
  text-align: center;
}
.text-input {
  text-align: center;
  border-radius: 10px;
  border-color: #dee2e6;
  border-style: solid;
}
.text-buy {
  text-align: center;  
  color: black;
}

</style>

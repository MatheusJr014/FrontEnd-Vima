<template>
    <div class="container" id="app">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <form class="product-form" @submit.prevent="updateProduct">
            <div class="mb-3">
              <label for="formGroupExampleId" class="form-label">ID do Produto</label>
              <input v-model="productId" type="number" class="form-control" id="formGroupExampleId" placeholder="Insira o ID do produto"/>
            </div>
            <div class="mb-3">
              <label for="formGroupExampleName" class="form-label">Nome</label>
              <input v-model="userData.nome" type="text" class="form-control" id="formGroupExampleName" placeholder="Insira nome do Produto para Cadastro"/>
            </div>
            <div class="mb-3">
              <label for="formGroupExampleDescription" class="form-label">Descrição</label>
              <input type="text" v-model="userData.descricao" class="form-control" id="formGroupExampleDescription" placeholder="Insira a descrição do produto"/>
            </div>
            <div class="mb-3">
              <label for="formGroupExamplePreco" class="form-label">Valor</label>
              <input type="number" v-model="userData.preco" class="form-control" id="formGroupExamplePreco" placeholder="R$"/>
            </div>
            <div class="mb-3">
              <label for="formGroupExampleEstoque" class="form-label">Estoque</label>
              <input type="number" v-model="userData.estoque" class="form-control" id="formGroupExampleEstoque" placeholder="Insira a quantidade disponivel em estoque"/>
            </div>
            <div class="mb-3">
              <label for="formGroupExampleTamanhos" class="form-label">Tamanhos</label>
              <textarea class="form-control" id="formGroupExampleTamanhos" v-model="userData.tamanhosInput" placeholder="Insira os tamanhos separados por vírgula"></textarea>
            </div>
            <div class="mb-3">
              <label for="formGroupExampleImageURL" class="form-label">Imagem do Produto</label>
              <input type="text" class="form-control" id="formGroupExampleImageURL" v-model="userData.imageURL" placeholder="Insira a URL da imagem"/>
            </div>
            <button type="submit" class="btn btn-primary">Atualizar produto</button>
          </form>
        </div>
      </div>
    </div>
    </template>
    
    <script>
    import UpdateDataService from '../services/UpdateDataService';
    
    export default {
      name: 'upProduct',
      data() {
        return {
          userData: {
            nome: "",
            preco: 0,
            descricao: "",
            estoque: 0,
            tamanhos: [],
            tamanhosInput: "",
            imagens: [""],
            imageURL: ""
          },
          productId: null // Adicione uma propriedade para o ID do produto
        };
      },
      methods: {
        updateProduct() {
          // Converte a string de tamanhos para um array
          this.userData.tamanhos = this.userData.tamanhosInput.split(',').map(tamanho => tamanho.trim());
    
          // Verifica se o ID do produto está definido
          if (this.productId === null) {
            console.log("ID do produto não definido");
            return;
          }
    
          // Chama o método update do serviço
          UpdateDataService.update(this.productId, this.userData)
            .then(response => {
              console.log(response.data);
              this.submitted = true;
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    }
    </script>
    
    <style scoped>
    .cardteste {
      margin-top: 20px;
      display: flex;
      justify-content: center; /* Centraliza horizontalmente */
    }
    .card {
      border-radius: 5px;
    }
    .card-body {
      background-color: #fff;
      color: #000;
    }
    .card-text {
      text-align: center;
    }
    </style>
    
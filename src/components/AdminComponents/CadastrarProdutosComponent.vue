<template>
<div class="container" id="app">
  <div class="row">
    <div class="col-md-6 mx-auto">
      <form class="product-form" @submit.prevent="saveProduct">
        <div class="mb-3">
          <label for="formGroupExampleDescription" class="form-label">Nome</label>
          <input v-model="userData.nome" type="text" class="form-control" id="formGroupExampleName" placeholder="Insira nome do Produto para Cadastro"/>
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">Descrição</label>
          <input type="text" v-model="userData.descricao"  class="form-control" id="formGroupExampleDescription" placeholder="Insira a descrição do produto"/>
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">Valor</label>
          <input type="number" v-model="userData.preco" class="form-control" id="formGroupExampleInput2"  placeholder="R$"/>
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">Estoque</label>
          <input type="number" v-model="userData.estoque" class="form-control" id="formGroupExampleInput2" placeholder="Insira a quantidade disponivel em estoque"/>
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">Tamanhos</label>
          <textarea class="form-control" id="formGroupExampleInput2" v-model="userData.tamanhosInput" placeholder="Insira os tamanhos separados por vírgula"></textarea>
        </div>
        <div class="mb-3">
        <label for="formGroupExampleFile" class="form-label">Imagem do Produto</label>
        <input type="text" class="form-control" id="formGroupExampleInput2" v-model="userData.imageURL" placeholder="Insira a imagem do produto"/>
      </div>
      <button @click="submit" class="btn btn-primary">Cadastrar produto</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import ProdutoDataService from '@/services/ProdutoDataService.js'

export default {
    name: 'newCriar', 
    data() {
        return {
            userData: {
                nome: "",
                preco: 0,
                descricao: "",
                estoque: 50,
                tamanhos: [],
                tamanhosInput: "",
                imagens: [""],
                imageURL: ""
            }
        };
    },
    methods: {
        saveProduct() {
            this.userData.tamanhos = this.userData.tamanhosInput.split(',').map(tamanho => tamanho.trim());
            ProdutoDataService.create(this.userData)
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

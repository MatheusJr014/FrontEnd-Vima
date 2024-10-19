<template>
    <div class="modal fade show" tabindex="-1" style="display: block;" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Produto</h5>
            <button type="button" class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateProduct">
              <div class="mb-3">
                <label>ID do Produto</label>
                <input v-model="product.id" type="text" class="form-control" readonly />
              </div>
              <div class="mb-3">
                <label>Nome</label>
                <input v-model="product.nome" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label>Descrição</label>
                <input v-model="product.descricao" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label>Preço</label>
                <input v-model="product.preco" type="number" class="form-control" />
              </div>
              <div class="mb-3">
                <label>Estoque</label>
                <input v-model="product.estoque" type="number" class="form-control" />
              </div>
              <button type="submit" class="btn btn-primary">Salvar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import UpdateDataService from '@/services/UpdateDataService';
  import '@/assets/styles/Admin/EditarProdutoModal.css';
  
  export default {
    name: 'upProduct',
    props: ['product'],
    data() {
      return {
        showModal: false,
        userData: {
          tamanhosInput: ""
        },
        productId: null
      };
    },
    methods: {
      updateProduct() {
        const updatedData = {
          nome: this.product.nome,
          descricao: this.product.descricao,
          preco: this.product.preco,
          estoque: this.product.estoque,
          tamanhos: this.userData.tamanhosInput.split(',').map(tamanho => tamanho.trim())
        };
  
        if (!this.product.id) {
          console.log("ID do produto não definido");
          return;
        }
  
        UpdateDataService.update(this.product.id, updatedData)
          .then(response => {
            console.log(response.data);
            this.$emit('close');
          })
          .catch(error => {
            console.log(error);
          });
      },
      closeModal() {
        this.$emit('close');
      }
    }
  }
  </script>
  
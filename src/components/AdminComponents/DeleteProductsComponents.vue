<template>
    <div class="container" id="app">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <form @submit.prevent="deleteProduct">
            <div class="mb-3">
              <label for="productId" class="form-label">ID do Produto</label>
              <input v-model="userData.productId" type="number" class="form-control" id="productId" placeholder="Insira o ID do produto">
            </div>
            <button type="submit" class="btn btn-danger">Excluir Produto</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import DeleteProductDataService from '@/services/DeleteProductDataService';
 
  export default {
    name: 'deleteProduct',
    data() {
      return {
        userData: {
          productId: null
        },
        submitted: false
      };
    },
    methods: {
      deleteProduct() {
        if (!this.userData.productId) {
          console.log("ID do produto não definido");
          return;
        }
  
        DeleteProductDataService.delete(this.userData.productId)
          .then(response => {
            console.log("Produto excluído com sucesso:", response.data);
            this.submitted = true;
          })
          .catch(error => {
            console.error("Erro ao excluir produto:", error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos opcionais para o componente */
  </style>
  
<template>
    <div v-if="modalAberto" class="modal fade show" style="display: block;" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmação de Exclusão</h5>
            <button type="button" class="close close-button" @click="fecharModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <p>Deseja realmente excluir o produto <strong>{{ produtoNome }}</strong>?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="fecharModal">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="confirmarExclusao">Sim</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ExcluirProdutoModal',
    props: {
      produtoId: {
        type: Number,
        required: true
      },
      produtoNome: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        modalAberto: true
      };
    },
    methods: {
      fecharModal() {
        this.$emit('close');
      },
      confirmarExclusao() {
        axios.delete(`https://localhost:7077/api/admin/product/${this.produtoId}`)
          .then(response => {
            console.log("Produto excluído com sucesso:", response.data);
            this.fecharModal();
            this.$emit('produtoExcluido'); // Emite evento para atualizar a lista de produtos no componente pai
          })
          .catch(error => {
            console.error("Erro ao excluir produto:", error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-dialog {
    max-width: 500px;
  }
  </style>
  
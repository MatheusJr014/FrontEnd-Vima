<template>
  <div>
    <!-- Botão para abrir o modal de cadastro -->
    <button type="button" class="btn btn-primary" @click="showModal = true">
      Cadastrar Produto
    </button>

    <!-- Modal de Cadastro de Produto -->
    <div class="modal fade" :class="{ show: showModal }" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true" v-show="showModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Cadastrar Produto</h5>
            <button type="button" class="close close-button" @click="closeModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <!-- Formulário de Cadastro de Produto -->
            <form @submit.prevent="saveProduct">
              <div class="mb-3">
                <label for="nome" class="form-label">Nome</label>
                <input v-model="userData.nome" type="text" class="form-control" id="nome" placeholder="Nome do Produto" required />
              </div>
              <div class="mb-3">
                <label for="descricao" class="form-label">Descrição</label>
                <input v-model="userData.descricao" type="text" class="form-control" id="descricao" placeholder="Descrição" required />
              </div>
              <div class="mb-3">
                <label for="preco" class="form-label">Preço</label>
                <input v-model="userData.preco" type="number" class="form-control" id="preco" placeholder="R$" required />
              </div>
              <div class="mb-3">
                <label for="estoque" class="form-label">Estoque</label>
                <input v-model="userData.estoque" type="number" class="form-control" id="estoque" placeholder="Quantidade em Estoque" required />
              </div>
              <div class="mb-3">
                <label for="tamanhos" class="form-label">Tamanhos</label>
                <textarea v-model="userData.tamanhosInput" class="form-control" id="tamanhos" placeholder="Tamanhos separados por vírgula" required></textarea>
              </div>
              <div class="mb-3">
                <label for="imagem" class="form-label">Imagem do Produto</label>
                <input v-model="userData.imageURL" type="text" class="form-control" id="imagem" placeholder="URL da Imagem" required />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Fechar</button>
            <button type="button" class="btn btn-primary" @click="saveProduct">Cadastrar Produto</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Sucesso Personalizado -->
    <div class="notifications-container" v-show="showSuccessMessage">
      <div class="success">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="succes-svg">
              <path clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fill-rule="evenodd"></path>
            </svg>
          </div>
          <div class="success-prompt-wrap">
            <p class="success-prompt-heading">Produto cadastrado com sucesso!</p>
            <div class="success-prompt-prompt">
              <p>O produto foi adicionado ao inventário com sucesso.</p>
            </div>
            <div class="success-button-container">
              <button class="success-button-main" type="button" @click="showSuccessMessage = false">Fechar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProdutoDataService from '@/services/AdminService/ProdutoDataService.js';
import '@/assets/styles/Admin/CadastrarProdutoModal.css';

export default {
  data() {
    return {
      showModal: false,
      showSuccessMessage: false,
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
          this.showSuccessMessage = true; // Exibe o modal de sucesso
          this.closeModal();

          // Esconde o modal de sucesso após 3 segundos
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        })
        .catch(error => {
          console.error("Erro ao salvar o produto:", error);
        });
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>



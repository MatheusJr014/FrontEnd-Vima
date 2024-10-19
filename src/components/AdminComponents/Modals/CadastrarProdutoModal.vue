<template>
  <div>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" @click="showModal = true">
      Cadastrar Produto
    </button>

    <!-- Modal -->
    <div class="modal fade" :class="{ show: showModal }" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" v-show="showModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Cadastrar Produto</h5>
            <button type="button" class="close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
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
  </div>
</template>

<script>
import ProdutoDataService from '@/services/ProdutoDataService.js';
import '@/assets/styles/Admin/CadastrarProdutoModal.css';
export default {
  data() {
    return {
      showModal: false,
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
      // Transformar o input de tamanhos em um array
      this.userData.tamanhos = this.userData.tamanhosInput.split(',').map(tamanho => tamanho.trim());

      // Enviar os dados para o serviço
      ProdutoDataService.create(this.userData)
        .then(response => {
          console.log(response.data); 
          this.closeModal(); // Fechar modal após salvar com sucesso
        })
        .catch(error => {
          console.error("Erro ao salvar o produto:", error);
        });
    },
    closeModal() {
      this.showModal = false; // Fechar o modal
    }
  }
};
</script>


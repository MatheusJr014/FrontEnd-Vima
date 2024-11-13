<template>
  <div class="modal fade show" tabindex="-1" style="display: block;" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar Produto</h5>
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
              <input v-model="product.preco" type="number" step="0.01" class="form-control" />
            </div>
            <div class="mb-3">
              <label>Estoque</label>
              <input v-model="product.estoque" type="number" class="form-control" />
            </div>
            <div class="mb-3">
              <label>Tamanhos (separados por vírgula)</label>
              <input v-model="product.tamanhosInput" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label>Imagem URL</label>
              <input v-model="product.imageURL" type="text" class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'upProduct',
  props: ['product'],
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    async updateProduct() {
      const updatedData = {
        id: this.product.id,
        nome: this.product.nome,
        descricao: this.product.descricao,
        preco: parseFloat(this.product.preco), // garante que seja numérico
        estoque: parseInt(this.product.estoque, 10), // converte para inteiro
        tamanhos: this.product.tamanhosInput
          ? this.product.tamanhosInput.split(',').map(tamanho => tamanho.trim())
          : [],
        imageURL: this.product.imageURL
      };

      if (!this.product.id) {
        console.error("ID do produto não definido");
        return;
      }

      try {
        const response = await axios.put(`https://localhost:7077/api/Produtos/update/${this.product.id}`, updatedData, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log('Produto atualizado:', response.data);
        this.$emit('close'); // Emite evento para fechar o modal após a atualização
      } catch (error) {
        console.error('Erro ao atualizar o produto:', error.response?.data || error.message);
      }
    },
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

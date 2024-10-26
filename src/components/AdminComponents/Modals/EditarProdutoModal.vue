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

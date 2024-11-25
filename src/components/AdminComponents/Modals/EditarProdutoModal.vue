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
              <input v-model="editableProduct.id" type="text" class="form-control" readonly />
            </div>
            <div class="mb-3">
              <label>Nome</label>
              <input v-model="editableProduct.nome" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Descrição</label>
              <input v-model="editableProduct.descricao" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Preço</label>
              <input v-model="editableProduct.preco" type="number" step="0.01" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Estoque</label>
              <input v-model="editableProduct.estoque" type="number" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Tamanhos (separados por vírgula)</label>
              <input v-model="editableProduct.tamanhosInput" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label>Imagem URL</label>
              <input v-model="editableProduct.imageURL" type="text" class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/http-common";

export default {
  name: "UpdateProductModal",
  props: ["product"],
  data() {
    return {
      editableProduct: {
        ...this.product,
        tamanhosInput: this.product.tamanhos ? this.product.tamanhos.join(", ") : "",
      },
    };
  },
  methods: {
    async updateProduct() {
      const updatedData = {
        id: this.editableProduct.id,
        nome: this.editableProduct.nome,
        descricao: this.editableProduct.descricao,
        preco: parseFloat(this.editableProduct.preco),
        estoque: parseInt(this.editableProduct.estoque, 10),
        tamanhos: this.editableProduct.tamanhosInput
          ? this.editableProduct.tamanhosInput.split(",").map((tamanho) => tamanho.trim())
          : [],
        imageURL: this.editableProduct.imageURL,
      };

      try {
        const response = await api.put(`/api/admin/product/${updatedData.id}`, updatedData);
        console.log("Produto atualizado com sucesso:", response.data);
        this.$emit("updateSuccess", response.data);
        this.closeModal();
      } catch (error) {
        console.error("Erro ao atualizar o produto:", error.response?.data || error.message);
        alert("Erro ao atualizar o produto. Por favor, tente novamente.");
      }
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <SideBarAdminComponent />
    <!-- Main Content -->
    <div class="container-fluid main-container">
      <center>
        <h1 class="admin-title mt-4">Gerenciamento de Produtos</h1>
        <div class="d-flex gap-3 mb-4" style="justify-content: center;">
          <!-- Importando e usando o componente CadastrarProduto -->
          <CadastrarProdutoModal />
        </div>
      </center>
      <!-- Lista de Produtos -->
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead class="thead-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
              <th scope="col">Preço</th>
              <th scope="col">Estoque</th>
              <th scope="col">Tamanhos</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.nome }}</td>
              <td>{{ product.descricao }}</td>
              <td>R$ {{ product.preco }}</td>
              <td>{{ product.estoque }}</td>
              <td>{{ product.tamanhos.join(', ') }}</td>
              <td>
                <!-- Botão Editar -->
                <button class="btn btn-outline-primary btn-sm me-2" @click="openEditModal(product)"
                  title="Editar Produto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-pencil" viewBox="0 0 16 16">
                    <path
                      d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                  </svg>
                </button>

                <!-- Botão Apagar -->
                <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(product)" title="Excluir Produto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path
                      d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal de Exclusão -->
      <ExcluirProdutoModal v-if="modalExcluirAberto" :produtoId="produtoId" :produtoNome="produtoNome"
        @close="modalExcluirAberto = false" @produtoExcluido="atualizarListaDeProdutos" />

      <!-- Modal de Edição -->
      <EditarProdutoModal v-if="showEditModal" :product="selectedProduct" @close="showEditModal = false" />
    </div>
  </div>
</template>

<script setup>
import SideBarAdminComponent from '../AdminComponents/SideBarAdminComponent.vue';
import CadastrarProdutoModal from './Modals/CadastrarProdutoModal.vue';
import ExcluirProdutoModal from './Modals/ExcluirProdutoModal.vue';
import EditarProdutoModal from './Modals/EditarProdutoModal.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const products = ref([]);
const showEditModal = ref(false);
const modalExcluirAberto = ref(false);
const produtoId = ref(null);
const produtoNome = ref('');
const selectedProduct = ref(null);

// Função para abrir o modal de exclusão
const openDeleteModal = (product) => {
  produtoId.value = product.id;
  produtoNome.value = product.nome;
  modalExcluirAberto.value = true;
};

// Função para abrir o modal de edição
const openEditModal = (product) => {
  selectedProduct.value = product;
  showEditModal.value = true;
};

const fetchProducts = async () => {
  try {
    const response = await axios.get('https://localhost:7077/api/Produtos/');
    products.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar os produtos:', error);
  }
};

const atualizarListaDeProdutos = () => {
  fetchProducts();
};

onMounted(() => {
  fetchProducts();
});
</script>

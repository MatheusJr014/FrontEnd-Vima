<template>
    <div class="d-flex">
      <!-- Sidebar -->
      <SideBarAdminComponent />
      <!-- Main Content -->
      <div class="container-fluid main-container">
        <center>
          <h1 class="admin-title mt-4">Gerenciamento de Produtos</h1>
          <div class="d-flex gap-3 mb-4" style="justify-content: center;">
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
                <td>{{ product.tamanhos }}</td>
                <td>
                  <button @click="openEditModal(product)">Editar</button>
                  <button @click="openDeleteModal(product)">Excluir</button>
                </td>
              </tr>
            </tbody>
            <EditarProdutoModal
              v-if="showEditModal"
              :product="selectedProduct"
              @close="showEditModal = false"
            />
            <ExcluirProdutoModal
              v-if="showDeleteModal"
              :produtoId="selectedProduct.id"
              :produtoNome="selectedProduct.nome"
              @close="showDeleteModal = false"
              @produtoExcluido="removeProdutoDaLista"
            />
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import SideBarAdminComponent from '../AdminComponents/SideBarAdminComponent.vue';
  import CadastrarProdutoModal from './Modals/CadastrarProdutoModal.vue';
  import EditarProdutoModal from './Modals/EditarProdutoModal.vue';
  import ExcluirProdutoModal from './Modals/ExcluirProdutoModal.vue';
  import '@/assets/styles/Admin/AdminComponents.css';
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const products = ref([]);
  const selectedProduct = ref(null);
  const showEditModal = ref(false);
  const showDeleteModal = ref(false);
  
  const openEditModal = (product) => {
    selectedProduct.value = product;
    showEditModal.value = true;
  };
  
  const openDeleteModal = (product) => {
    selectedProduct.value = product;
    showDeleteModal.value = true;
  };
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://localhost:7077/api/Produtos/');
      products.value = response.data.$values;
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error);
    }
  };
  
  // Remove o produto da lista após a exclusão
  const removeProdutoDaLista = (produtoId) => {
    products.value = products.value.filter(product => product.id !== produtoId);
  };
  
  onMounted(() => {
    fetchProducts();
  });
  </script>
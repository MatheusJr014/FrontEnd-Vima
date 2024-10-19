<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <SideBarAdminComponent />
    <!-- Main Content -->
    <div class="container-fluid main-container">
      <center><h1 class="admin-title mt-4">Gerenciamento de Produtos</h1>
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
              <td>R$ {{ product.preco.toFixed(2) }}</td>
              <td>{{ product.estoque }}</td>
              <td>{{ product.tamanhos }}</td>
              <td>
                <button @click="openEditModal(product)">Editar</button> 
                <router-link :to="{ name: 'deleteProduct', params: { id: product.id } }" class="text-danger">Excluir</router-link>
              </td>
            </tr>
          </tbody>
          <EditarProdutoModal v-if="showEditModal"
            :product="selectedProduct" 
            @close="showEditModal = false"
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
import '@/assets/styles/Admin/AdminComponents.css';
import { ref, onMounted } from 'vue';
import axios from 'axios';



const products = ref([]);
const selectedProduct = ref(null);
const showEditModal = ref(false);

const openEditModal = (product) => {
  selectedProduct.value = product;
  showEditModal.value = true;
};

const fetchProducts = async () => {
  try {
    const response = await axios.get('https://localhost:7077/produtos');
    products.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar os produtos:', error);
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

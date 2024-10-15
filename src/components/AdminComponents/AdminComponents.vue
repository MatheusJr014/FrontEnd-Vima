<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <SideBarAdminComponent />
    <!-- Main Content -->
    <div class="container-fluid main-container">
      <!-- Barra de Pesquisa e Sino de Notificação -->
      <div class="d-flex justify-content-between align-items-center p-3 shadow bg-light rounded mb-4">
        <div class="input-group" style="width: 50vh;">
          <input type="text" class="form-control" placeholder="Pesquisar produtos, clientes..." aria-label="Pesquisar produtos">
          <button class="btn btn-outline-primary" type="button">Buscar</button>
        </div>
      </div>
      <center><h1 class="admin-title mt-4">Gerenciamento de Produtos</h1>
        <div class="d-flex gap-3 mb-4">
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
                <router-link :to="{ name: 'editProduct', params: { id: product.id } }" class="text-primary">Editar</router-link> |
                <router-link :to="{ name: 'deleteProduct', params: { id: product.id } }" class="text-danger">Excluir</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideBarAdminComponent from '../AdminComponents/SideBarAdminComponent.vue';
import CadastrarProdutoModal from './Modals/CadastrarProdutoModal.vue';
import '@/assets/Styles/Admin/AdminComponents.css' 
import { ref, onMounted } from 'vue';
import axios from 'axios';


const products = ref([]);

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

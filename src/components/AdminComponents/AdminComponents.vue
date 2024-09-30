<script setup>
import SideBarAdminComponent from '../AdminComponents/SideBarAdminComponent.vue';
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

<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <SideBarAdminComponent />

    <!-- Main Content -->
    <div class="container-fluid main-container">
      <!-- Barra de Pesquisa e Sino de Notificação -->
      <div class="d-flex justify-content-between align-items-center p-3 shadow bg-light rounded mb-4">
        <!-- Barra de Pesquisa -->
        <div class="input-group" style="width: 50vh;"> <!-- Define a largura aqui -->
          <input type="text" class="form-control" placeholder="Pesquisar produtos, clientes..." aria-label="Pesquisar produtos">
          <button class="btn btn-outline-primary" type="button">Buscar</button>
        </div>
      </div>

      <!-- Título da Página -->
      <h1 class="admin-title mt-4">Gerenciamento de Produtos</h1>

      <!-- Botões de Ação -->
      <div class="d-flex gap-3 mb-4">
        <router-link to="/registerProduct">
          <button type="button" class="btn btn-primary">Cadastrar Produto</button>
        </router-link>
        <router-link to="/editProduct">
          <button type="button" class="btn btn-outline-secondary">Editar Produto</button>
        </router-link>
        <router-link to="/deleteProduct">
          <button type="button" class="btn btn-danger">Excluir Produto</button>
        </router-link>
      </div>

      <!-- Lista de Produtos -->
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead class="thead-light">
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
              <th scope="col">Preço</th>
              <th scope="col">Estoque</th>
              <th scope="col">Tamanhos</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id"> <!-- Usando v-for para iterar sobre produtos -->
              <td>{{ product.nome }}</td>
              <td>{{ product.descricao }}</td>
              <td>R$ {{ product.preco.toFixed(2) }}</td> <!-- Supondo que o preço seja um número -->
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

<style>
/* Estilos dos botões */
button {
  margin: 10px;
}

/* Estilo da Seção da Barra de Pesquisa e Notificações */
.shadow {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.bg-light {
  background-color: #f8f9fa !important;
}

.rounded {
  border-radius: 0.25rem;
}

/* Estilo do Container Principal */
.main-container {
  flex-grow: 1; /* Faz o container ocupar todo o espaço disponível */
  padding-left: 15px; /* Adiciona espaço entre a sidebar e o container */
}

.admin-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.table-responsive {
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.thead-light th {
  background-color: #f8f9fa;
  font-weight: bold;
}

/* Estilos do texto das ações */
.text-primary {
  color: #007bff !important;
}

.text-danger {
  color: #dc3545 !important;
}
</style>

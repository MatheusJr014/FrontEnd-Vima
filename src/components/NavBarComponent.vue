<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top" id="mainNav">
    <div class="container px-4 px-lg-5">
      <a class="navbar-brand" href="/">VIMASTORE</a>
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        Menu
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/contact">Contato</RouterLink>
          </li>
          <li class="nav-item position-relative">
            <RouterLink class="nav-link" to="/carrinho">
              <span class="material-symbols-outlined">shopping_cart</span>
              <!-- Exibindo o total de itens do carrinho -->
              <div class="cart-quantity" v-if="totalItems > 0">{{ totalItems }}</div>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/usuario"><span class="material-symbols-outlined">account_circle</span></RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      totalItems: 0  // Total de itens no carrinho
    };
  },
  mounted() {
    this.getCarrinho();
  },
  methods: {
    async getCarrinho() {
      try {
        const response = await axios.get('https://localhost:7077/api/Carrinho');
        const carrinho = response.data;
        
        this.calculateTotalItems(carrinho);  // Calcula o total de itens
      } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
      }
    },
    calculateTotalItems(carrinho) {
      this.totalItems = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    },
  }
};
</script>

<style scoped>
@import '@/assets/homestyles.css';

a.navbar-brand {
    color: black !important;
}

a.nav-link {
    color: black !important;
}

.nav-item.position-relative .cart-quantity {
  position: absolute;
  top: 20px;
  right: 14px;
  background-color: rgb(8, 8, 8);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 10px;
  font-weight: bold;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

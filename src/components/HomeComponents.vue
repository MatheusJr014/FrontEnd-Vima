<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Button from './ButtonComponents.vue';

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
  <div>
    <Navbar />
  </div>

  <div class="container">
    <div class="row">
      <img src="/src/assets/images/VIMA.png" alt="Imagem de login" class="login-image">
    </div>
  </div>

  <!-- <div class="divisor"></div> -->

  <div class="text-center">
    <p class="sub-title" style="margin-bottom: 1vh; margin-top: 8vh;"><b>PRODUTOS EM DESTAQUE</b></p>
  </div>

  <div class="container">
    <div class="row">
      <div v-for="product in products" :key="product.id" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="card">
          <span class="title"><b>{{ product.nome }}</b></span>
            <span class="price"><b>R$ {{ product.preco }}</b></span>
          <div class="image">
            <img :src="product.imageURL" alt="Imagem do produto" />
          </div>
          <div class="card-body">
            <!-- <router-link class="nav-link" aria-current="page" to="/testCart">
              <button class="custom-button mt-3">Ver Agora &#8594;</button>
            </router-link> -->
            <router-link :to="`/productSelecionado/${product.id}`" class="nav-link" aria-current="page">
             <button class="custom-button mt-3">Ver Agora &#8594;</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .card {
  position: relative;
  width: 100%;
  height: 35.5em;
  box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 120ms;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 0.5em;
  padding-bottom: 3.4em;
  overflow: hidden;
} */

.card {
  position: relative;
  width: 18.875em;
  height: 30.5em;
  box-shadow: 0px 1px 13px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 120ms;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 0.5em;
  padding-bottom: 3.4em;
  overflow: hidden; /* Garante que o conteúdo não ultrapasse os limites do card */
}

.custom-button {
  background-color: #00AC7C;
  color: #fff;
  border: none;
  padding: 10px 20px;
  text-transform: uppercase;
  font-weight: 600;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  transition: all 80ms;
  height: 5em;
  opacity: 1;
}

.card:active .custom-button {
  background-color: #007b63;
  transform: scale(1.1);
}

.card .title {
  
  font-size: 1.4em;
  position: absolute;
  bottom: 90%;
  font-weight: 400;
  text-align: center;
  color: #000;
}

.card .price {
  
  font-size: 1.1em;
  position: absolute;
  left: 10%;
  bottom: 23%;
  color: #000;
}

.image {
  background: rgb(255, 255, 255);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.container {
  background-color: rgba(0, 0, 0, 0);
  margin-top: 5vh;
  margin-bottom: 5vh;
}

.container img {
  height: 40vh;
}

.title-text {
  font-size: 10vh;
}

.sub-title {
  font-size: 4vh;
  margin-top: 3vh;
}

/* .divisor {
  background-color: #212529;
  height: 5vh;
  margin-top: 6cap;
  margin-bottom: 5vh;
} */
.container-banner{
  height: 100%;
}
</style>
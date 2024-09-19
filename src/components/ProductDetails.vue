<template>
    <div v-if="product">
      <h1>{{ product.nome }}</h1>
      <img :src="product.imageURL" alt="Imagem do produto" />
      <p>{{ product.descricao }}</p>
      <p>Preço: R$ {{ product.preco }}</p>
    </div>
    <div v-else>
      <p>Produto não encontrado.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ProductDetails',
    data() {
      return {
        product: null
      };
    },
    async mounted() {
      const productId = this.$route.params.id;
      try {
        const response = await axios.get(`https://localhost:7077/produto/${productId}`);
        this.product = response.data;
      } catch (error) {
        console.error('Erro ao buscar o produto:', error);
      }
    }
  };
  </script>
  
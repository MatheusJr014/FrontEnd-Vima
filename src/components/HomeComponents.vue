<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
// import Navbar from '@/components/Navbar.vue';
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
      <div class="col-md-8 col-sm-8 col-xs-8">
        <h2 class="title-text">DE UM NOVO ESTILO A VOCÊ</h2>
        <p class="description-text">
          Estilo sem limites, do básico ao extraordinário. Seu guarda-roupa online!
        </p>
        <div class="text-center">
          <Button />
        </div>
      </div>
      <div class="col-md-4 col-sm-4 col-xs-4">
        <img style="margin-top: 2vh; height: 40vh"
          src="https://i.pinimg.com/originals/f7/1c/5c/f71c5c1e89dbb27a7e840b6fb60932eb.png" alt="">
      </div>
    </div>
  </div>

  <div class="divisor"></div>

  <div class="text-center">
    <p class="sub-title" style="margin-bottom: 1vh;"><b>PRODUTOS EM DESTAQUE</b></p>
  </div>

  <div class="row">
    <div v-for="product in products" :key="product.id" class="col text-center">
      <div class="card">
        <div class="card-body">
          <img :src="product.imageURL" alt="" />
          <h6 class="card-title">{{ product.nome }}</h6>
          <p class="product-price"> <b>R$ {{ product.preco }}</b></p>
          <router-link :to="`/product`">
            <a style="background-color: #212529; border: none;" href="#" class="btn btn-primary">
              Adicionar ao carrinho
            </a>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <div class="estoque text-center">
    <div class="container text-center">
      <div class="row text-center">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <h2 class="estoque-text">QUEIMA DE ESTOQUE</h2>
          <Button/>
        </div>
      </div>
    </div>
  </div>

  <div class="page-inner-content">
    <div class="testimonials">
      <div class="testimonial">
        <p>"</p>
        <p><b>Navegação Simples e Rápida:</b> A experiência de navegação no site é intuitiva, permitindo que os usuários
          encontrem facilmente o que estão procurando.</p>
        <p class="rate">&#9733;&#9733;&#9733;&#9733;&#9733;</ p>
        <p>Nino Abravanel</p>
      </div>
      <div class="testimonial">
        <p>"</p>
        <p><b>Design Visual Atraente:</b> O site possui um design visualmente atraente que cativa os usuários desde o
          primeiro acesso.</p>
        <p class="rate">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
        <p>Mbappe da silva</p>
      </div>
      <div class="testimonial">
        <p>"</p>
        <p><b>Checkout Ágil:</b> O processo de checkout é rápido e descomplicado, proporcionando uma experiência de
          compra eficiente.</p>
        <p class="rate">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
        <p>Buzeira</p>
      </div>
    </div>
  </div>
  <!-- <Feedback /> -->

</template>

<style scoped>
.container {
  background-color: rgba(0, 0, 0, 0);
  margin-top: 5vh;
}

.botao_hover

.container img {
  height: 36vh;
}

.title-text {
  font-size: 10vh;
}

.sub-title {
  font-size: 4vh;
  margin-top: 3vh;
}

.description-text {
  font-size: 2.5vh;
}

.card {
  margin-bottom: 1vh;
  width: 18.5rem;
  border: none;
  transition: all 500ms;
}

.divisor {
  background-color: #212529;
  height: 5vh;
  margin-top: 6cap;
  margin-bottom: 5vh;
}

.btn:hover {
  background-color: #212529;
}

.card img {
  height: auto;
  max-width: 30vh;
  border-radius: 1vh;
  margin-bottom: 2vh;
  margin-top: 2vh;
}

.card img:hover {
  transition: all 400ms;
  margin-bottom: 3vh;
}

.estoque {
  background-color: #212529;
  padding-top: 0.2vw;
  padding-bottom: 1vw;
  width: 100%;
  margin-bottom: 5vh;
  margin-top: 10vh;
}

.estoque-text {
  font-size: 6vw;
  color: aliceblue;
  text-align: center;
}

.testimonials {
  display: flex;
  padding: 4rem 1rem;
  justify-content: space-evenly;
}

.testimonial {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-basis: 30%;
  text-align: center;
  box-shadow: 0 0 5px #afafaf;
  padding: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.testimonial:hover {
  transform: translateY(-5px);
}

.testimonial p {
  margin: 5px 0;
}

.testimonial p:first-child {
  font-weight: bold;
  font-size: 5rem;
  color: #34e7f8;
  margin-top: 3rem;
  line-height: 2rem;
}

.testimonial p:last-child {
  font-weight: bold;
}

/* Media Queries */
@media (max-width: 800px) {
  .testimonials {
    flex-direction: column;
  }

  .testimonial {
    margin-bottom: 1.2rem;
  }
}
</style>

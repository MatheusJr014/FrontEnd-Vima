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
// Navbar shrink function
const navbarShrink = () => {
  const navbarCollapsible = document.body.querySelector("#mainNav");
  if (!navbarCollapsible) return;

  window.scrollY === 0
    ? navbarCollapsible.classList.remove("navbar-shrink")
    : navbarCollapsible.classList.add("navbar-shrink");
};

// On DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  navbarShrink();
  document.addEventListener("scroll", navbarShrink);

  // Bootstrap scrollspy
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});
</script>
<template>
  <div>
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand" href="#page-top">VIMASTORE</a>
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
            <li class="nav-item">
              <RouterLink class="nav-link" to="/carrinho"><span class="material-symbols-outlined">shopping_cart</span></RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/login"><span class="material-symbols-outlined">account_circle</span></RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Masthead-->
    <header class="masthead">
      <div
        class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center"
      >
        <div class="d-flex justify-content-center">
          <div class="text-center">
            <h1 class="mx-auto my-0 text-uppercase">UM NOVO CONCEITO</h1>
            <h2 class="text-white-50 mx-auto mt-2 mb-5">
              
            </h2>
            <a class="btn btn-outline-light" href="#about">Ver Produtos</a>
            <!-- <button type="button" class="btn btn-outline-dark">Dark</button> -->
          </div>
        </div>
      </div>
    </header>
    
    <!-- About-->
    <!-- <section class="about-section text-center" id="about">
      <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-lg-8">
            <h2 class="text-white mb-4">Built with Bootstrap 5</h2>
            <p class="text-white-50">
              Grayscale is a free Bootstrap theme created by Start Bootstrap. It
              can be yours right now, simply download the template on
              <a href="https://startbootstrap.com/theme/grayscale/"
                >the preview page.</a
              >
              The theme is open source, and you can use it for any purpose,
              personal or commercial.
            </p>
          </div>
        </div>
        <img class="img-fluid" src="/src/assets/images/ipad.png" alt="iPad" />
      </div>
    </section> -->

    <!-- Projects-->
    <section class="projects-section bg-light" id="projects">
      
      <div class="container px-4 px-lg-5">
        <!-- Featured Project Row-->
        <div class="row gx-0 mb-4 mb-lg-5 align-items-center">
          <div class="col-xl-8 col-lg-7">
            <img
              class="img-fluid mb-3 mb-lg-0"
              src="/src/assets/images/minibanner1.png"
              alt="Masthead"
            />
          </div>
          <div class="col-xl-4 col-lg-5">
            <div class="featured-text text-center text-lg-left">
              <h4>Sobre</h4>
              <p class="text-black-50 mb-0">
                Com alicerces firmados numa brasilidade profunda e encarando a moda como veículo para reivindicar o esquecimento do ‘’olho europeu e americano’’, a BARRA®️ atua na apreciação e pesquisa das raízes de seu local de origem, apresentando um conceito que mescla a estética do streetwear com elementos que remetem ao imaginário de beira de praia brasileiro, criando assim, uma atmosfera única e autêntica.
              </p>
            </div>
          </div>
        </div>

        <!-- Project One Row-->
        <div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
          <div class="col-lg-6">
            <img
              class="img-fluid"
              src="/src/assets/images/minibanner2.jpg"
              alt="Project 1"
            />
          </div>
          <div class="col-lg-6">
            <div class="bg-black text-center h-100 project">
              <div class="d-flex h-100">
                <div class="project-text w-100 my-auto text-center text-lg-left">
                  <h4 class="text-white">Movimentos regionalistas</h4>
                  <p class="mb-0 text-white-50">
                    A cultura de roupas regionalistas preserva tradições locais, com trajes típicos usados em festividades e celebrações. Esses vestuários destacam a identidade e herança cultural de cada região.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        

        <!-- Project Two Row-->
        <div class="row gx-0 justify-content-center">
          <div class="col-lg-6">
            <img
              class="img-fluid"
              src="/src/assets/images/minibanner3.png"
              alt="Project 2"
            />
          </div>
          <div class="col-lg-6 order-lg-first">
            <div class="bg-black text-center h-100 project">
              <div class="d-flex h-100">
                <div
                  class="project-text w-100 my-auto text-center text-lg-right"
                >
                  <h4 class="text-white">Os Amantes</h4>
                  <p class="mb-0 text-white-50">
                    de René Magritte, é uma pintura surrealista que retrata um casal se beijando com os rostos cobertos por panos. A obra evoca sentimentos de mistério, isolamento e a impossibilidade de uma conexão emocional plena.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
      <div class="row">
          <div v-for="product in products" :key="product.id" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <router-link :to="`/productSelecionado/${product.id}`" class="card-link">
              <div class="card">
                <span class="title"><b>{{ product.nome }}</b></span>
                <span class="price"><b>R$ {{ product.preco }}</b></span>
                <div class="image">
                  <img :src="product.imageURL" alt="Imagem do produto" />
                </div>
                <div class="card-body">
                  <!-- O botão foi removido -->
                </div>
              </div>
            </router-link>
          </div>
      </div>
    </div>
    </section>


    <!-- Signup-->
    <section class="signup-section" id="signup">
      <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5">
          <div class="col-md-10 col-lg-8 mx-auto text-center">
            <i class="far fa-paper-plane fa-2x mb-2 text-white"></i>
            <h2 class="text-white mb-5">Se inscreva e receba novidades!</h2>
            <form class="form-signup" id="contactForm">
              <div class="row input-group-newsletter">
                <div class="col">
                  <input
                    class="form-control"
                    id="emailAddress"
                    type="email"
                    placeholder="Enter email address..."
                    aria-label="Enter email address..."
                  />
                </div>
                <div class="col-auto">
                  <button class="btn btn-primary" id="submitButton" type="submit">
                    Enviar!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    

    <!-- Contact-->
    <section class="contact-section bg-black">
      <div class="container px-4 px-lg-5">
        
        <div class="social d-flex justify-content-center">
          <p>&copy; 2024 Sua Empresa. Todos os direitos reservados.</p>
        </div>
      </div>
    </section>

    <!-- Footer-->
    <!-- <footer class="footer bg-black small text-center text-white-50">
      <div class="container px-4 px-lg-5">Copyright &copy; Your Website 2023</div>
    </footer> -->
  </div>

  
</template>



<style scoped>

@import '@/assets/homestyles.css';


</style>


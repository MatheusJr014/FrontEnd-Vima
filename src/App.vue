<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/"><h1 class="logo">VIMA<span>STORE</span></h1></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto me-auto central-nav">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/">Lançamentos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/">Ofertas</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/">Masculino</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/">Feminino</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/contact">Contato</router-link>
          </li>
        </ul>       
        <ul class="navbar-nav ms-auto">
          <form class="d-flex" role="search" style="height: 2rem; margin-top: 3.5px;">
            <button class="btn btn-light" type="submit" style="background-color: #212529; border-color: #212529;">
              <span class="material-symbols-outlined" style="color: #C7C8C9;">search</span>
            </button>
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" style="border-radius: 50rem; width: 170px; height: 40px; text-align: center; margin-top: -5px;">
          </form>
          <li class="nav-item nav-car ms-auto">
            <router-link class="nav-link" aria-current="page" to="/login"><span class="material-symbols-outlined">account_circle</span></router-link>
          </li>
          <li class="nav-item nav-car ms-auto">
            <router-link class="nav-link" aria-current="page" to="/cart"><span class="material-symbols-outlined">shopping_cart</span></router-link>
          </li>
          <!-- <li class="nav-item nav-car ms-auto">
            <router-link class="nav-link" aria-current="page" to="/cart"><img class="cart-img" src="/src/assets/images/cart.svg"></router-link>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
  
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let num = ref(0);
</script>
<script>

export default {
    name: "app"
  };

</script>
<style>
.logo {
  display: flex;
  align-items: center;
  color: var(--tex-color);
  font-size: 28px;
  font-weight: bold;
}
.navbar-nav.search{
  left: 50px;
}


.logo i {
  color: var(--main-color);
  font-size: 32px;
  margin-right: 5px;
}

.logo {
  color: #34e7f8;
}

.logo span {
  color: #fff;
}
.central-nav {
  display: flex;
  justify-content: center;
  flex: 1;
}

.navbar-nav .nav-item {
  margin-left: 10px;
  margin-right: 10px;
}

@media screen and (min-width: 1400px) {
  .navbar-options {
    margin-left: 250px; 
  } 
}
</style>

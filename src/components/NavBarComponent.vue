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
</template>

<script>
</script>

<style scoped>
@import '@/assets/homestyles.css';
a.navbar-brand {
    color: black !important;
}

a.nav-link {
    color: black !important;
}

</style>

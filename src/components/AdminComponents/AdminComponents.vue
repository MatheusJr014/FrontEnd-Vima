<script setup>
import SideBarAdminComponent from '../AdminComponents/SideBarAdminComponent.vue';
</script>

<template>
  <div class="d-flex">
    <SideBarAdminComponent />
    <div class="container">
      <h1 class="admin-title">Admin page</h1>
      <router-link to="/registerProduct">
        <button type="button" class="btn btn-success">Cadastrar produto</button>
      </router-link>
      <router-link to="/editProduct">
        <button type="button" class="btn btn-warning">Editar produto</button>
      </router-link>
      <router-link to="/deleteProduct">
        <button type="button" class="btn btn-danger">Excluir produto</button>
      </router-link>  
    </div>
  </div>

</template>


<style>

button {
  margin: 15px;
}


</style>
  
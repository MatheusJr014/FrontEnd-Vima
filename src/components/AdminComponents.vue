<template>
    <div class="container">
      <h1 class="admin-title">Admin page</h1>
      <router-link  aria-current="page" to="/registerProduct">
        <button type="button" class="btn btn-success">Cadastrar produto</button>
      </router-link>
      <router-link  aria-current="page" to="/editProduct">
        <button type="button" class="btn btn-warning">Editar produto</button>
      </router-link>
      <router-link  aria-current="page" to="/deleteProduct">
        <button type="button" class="btn btn-danger">Excluir produto</button>
      </router-link>
     
    </div>
  </template>
  
  <style>
  .admin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    text-align: center;
  }
  
  button {
    margin: 15px;
  }
  </style>
  
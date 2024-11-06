<template>
  <div class="container">
    <div class="forms">
      <div class="cadastro">
        <div style="text-align: left;"> <h1>Criar Conta</h1></div>
        <form id="signupForm">
          <label for="nome">Nome</label>
          <input type="text" v-model="userData.nome" id="nome" placeholder="Digite aqui" required>
          <label for="sobrenome">Sobrenome</label>
          <input type="text" v-model="userData.sobrenome" id="sobrenome" placeholder="Digite aqui" required>
          <label for="emailCadastro">Email</label>
          <input type="email" v-model="userData.email" id="emailCadastro" placeholder="Digite aqui" required>
          <label for="senhaCadastro">Senha</label>
          <input type="password" v-model="userData.senha" id="senhaCadastro" placeholder="Digite aqui" required>
          <label for="confirmarSenha">Confirme a senha</label>
          <input type="password" v-model="confirmPassword" id="confirmarSenha" placeholder="Digite aqui" required>
          <button type="button" @click="saveCadastro">CADASTRAR</button>
        </form>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import RegisterDataService from '../../../services/RegisterEloginService/RegisterDataService.js'
  
  export default {
   name: 'newSignin',
   data() {
     return {
       userData: {
         nome: '',
         sobrenome: '',
         email: '',
         senha: ''
       },
       confirmPassword: ''
     };
   }, 
   methods: {
     saveCadastro() {
       if (this.userData.senha !== this.confirmPassword) {
         alert("As senhas não coincidem.");
         return;
       }
       RegisterDataService.create(this.userData)
       .then(response => {
         console.log(response.data);
         this.submitted = true;
         this.$router.push('/');
       })
       .catch(error => {
         console.log(error);
       });
     }
   }
  }
  </script>
  
  <style scoped>
  @import '@/assets/Styles/Admin/LoginRegister.css';
  
    
  </style>
  
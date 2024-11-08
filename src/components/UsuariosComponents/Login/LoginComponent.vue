
<template >
  <div class="container">
    <div class="forms">
      <div class="login">
        <div style="text-align: left;"> <h1 >Faça Login</h1></div>
        <form id="loginForm">
          <label for="loginEmail">Email</label>
          <input type="email" v-model="email" id="loginEmail" placeholder="Digite aqui" required>
          <label for="loginPassword">Senha  </label>
          <input type="password" v-model="senha" id="loginPassword" placeholder="Digite aqui" required>
          <a href="#">Esqueci minha senha</a>
          <button type="button" @click="loginUser">ENTRAR</button>
        </form>
      </div>
    </div>
  </div>
  </template>
  
  
  <script>
  import httpCommon from '@/http-common';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        senha: ''
      };
    },
    methods: {
      loginUser() {
        console.log({email: this.email, senha: this.senha});
  
        // Faça uma solicitação ao backend para validar o login
        httpCommon.post('/api/auth/login', {
          email: this.email,
          senha: this.senha
        })
        
        .then(response => {
          // Se o login for bem-sucedido, você pode redirecionar o usuário para outra página
          alert('Login bem-sucedido:', response.data);

          window.localStorage.setItem("AUTH_TOKEN", response.data);
          
          this.$router.push('/'); // Redireciona para a página de dashboard
        })
        .catch(error => {
          console.error('Erro de login:', error);
          alert('Credenciais inválidas. Por favor, tente novamente.');
        });
      }
    }
  }
  </script>
  
  <style scoped>
  @import '@/assets/Styles/Admin/LoginRegister.css';
    container{
      display: block;
      justify-content: center;   
     }
  </style>
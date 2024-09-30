<template>
  <div class="container" id="app">
    <div class="Box-Login">
      <form class="login-form" @submit.prevent="loginUser">
        <img src="/src/assets/images/profile.svg" alt="Imagem de login" class="login-image">
        <h3 class="login-title">Login</h3>
        <input type="text" placeholder="Email" v-model="login" class="login-input">
        <input type="password" placeholder="Senha" v-model="senha" class="login-input">
        <button type="submit" class="login-button"><router-link to="/admin" >Entrar</router-link></button>

        <a href="#" class="forgot-password">Esqueceu a senha?</a>
        <p class="register-message">Você ainda não tem uma conta? <router-link to="/register" class="register-link">Crie uma agora!</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
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
      // Faça uma solicitação ao backend para validar o login
      axios.post('/api/login', {
        email: this.email,
        senha: this.senha
      })
      .then(response => {
        // Se o login for bem-sucedido, você pode redirecionar o usuário para outra página
        console.log('Login bem-sucedido:', response.data);
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
* {
    box-sizing: border-box;
}
  
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
}
  
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
  
.login-form {
  width: 320px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
  
.login-image {
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 auto 20px;
}

.login-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.login-input {
  width: 100%;
  height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.login-button {
  width: 100%;
  height: 40px;
  background-color: #34E7F8;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #125358;
}

.forgot-password {
  text-align: right;
  margin-top: 10px;
  color: #666;
  cursor: pointer;
}

.forgot-password:hover {
  color: #333;
}
  
.register-message {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #666;
}

.register-link {
    color: #34E7F8;
    text-decoration: none;
}

.register-link:hover {
    color: #0e97a3;
}

  
</style>
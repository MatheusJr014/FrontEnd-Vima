<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    setup() {
      const router = useRouter();
  
      return {
        router
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('https://seu-backend/api/auth/login', {
            username: this.username,
            password: this.password
          });
          localStorage.setItem('token', response.data.token);
          this.router.push('/dashboard');
        } catch (error) {
          console.error('Erro ao fazer login', error);
          alert('Login falhou');
        }
      }
    }
  };
  </script>
  
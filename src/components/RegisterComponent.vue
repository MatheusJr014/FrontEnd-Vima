<template>
  <div class="container" id="app">
       <div class="Box-Login">
           <form class="login-form" @submit.prevent="saveCadastro">
               <h3 class="login-title">Registrar</h3>
               <input type="text" v-model="userData.nome" placeholder="Nome" class="login-input">
               <input type="text" v-model="userData.sobrenome" placeholder="Sobrenome" class="login-input">
               <input type="email" v-model="userData.email" placeholder="Email" class="login-input">
               <input type="password" v-model="userData.senha" placeholder="Senha" class="login-input">
               <input type="password" v-model="confirmPassword" placeholder="Repita a Senha" class="login-input">
            
               <button type="submit" class="login-button">Cadastrar</button>
               
           </form>
       </div>
   </div>
</template>

<script>
import RegisterDataService from '../services/RegisterDataService.js'

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

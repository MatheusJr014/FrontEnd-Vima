<template>
    <main>
      <div class="container" id="app">
        <div class="row">
          <div class="col-md-6">
            <form class="contact-form" @submit.prevent="saveContato">
              <div class="title"><h1>Entre em contato conosco</h1></div>
              <hr class="line-title">
              <div v-if="showMessage" class="alert alert-success" role="alert">
                Mensagem enviada com sucesso! Entraremos em contato em breve.
              </div>
              <div class="mb-3">
                <label for="exampleFormFirstName" class="form-label">Primeiro Nome</label>
                <input type="text" v-model="userData.name" class="form-control" placeholder="Primeiro nome" aria-label="First name">
                <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
              </div>
              <div class="mb-3">
                <label for="exampleFormLastName" class="form-label">Sobrenome</label>
                <input type="text" v-model="userData.sobrenome" class="form-control" placeholder="Sobrenome" aria-label="Last name">
                <div v-if="errors.sobrenome" class="text-danger">{{ errors.sobrenome }}</div>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">E-mail</label>
                <input type="email" v-model="userData.email" class="form-control" id="exampleFormControlInput1" placeholder="nome@exemplo.com">
                <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
              </div>
              <div class="mb-3">
                <label for="exampleFormSelect" class="form-label">Assunto</label>
                <select class="form-select" v-model="userData.assunto" aria-label="Default select example">
                  <option selected>Assunto</option>
                  <option value="1">Reembolso</option>
                  <option value="2">Previsão de entrega</option>
                  <option value="3">Dúvidas/Reclamações</option>
                </select>
                <div v-if="errors.assunto" class="text-danger">{{ errors.assunto }}</div>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Mensagem</label>
                <textarea v-model="userData.description" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                <div v-if="errors.description" class="text-danger">{{ errors.description }}</div>
              </div>
              <button type="submit" class="btn btn-primary">Enviar</button>
            </form>
          </div>
          <div class="col-md-6">
            <img src="/src/assets/images/contact.svg" alt="" class="img-fluid">
            <div class="card mt-4" style="width: 23rem;">
              <div class="card-header"><b>Suporte por telefone</b></div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Telefone: (14) 998877665</li>
                <li class="list-group-item"><b>Horários de funcionamento:</b></li>
                <li class="list-group-item">Segunda a Sexta: 8:00 - 18:00</li>
                <li class="list-group-item">Sábado: 09:00 - 15:00</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script>
  import { reactive, ref } from 'vue';
  import ContatoDataService from '../services/ContatoDataService.js'
  
  export default {
    name: 'newContact',
    setup() {
      const userData = reactive({
        name: '',
        sobrenome: '',
        email: '',
        assunto: '',
        description: ''
      });
  
      const errors = reactive({
        name: null,
        sobrenome: null,
        email: null,
        assunto: null,
        description: null
      });
  
      const showMessage = ref(false);
  
      const validateForm = () => {
        let valid = true;
  
        if (!userData.name.trim()) {
          errors.name = "Por favor, insira seu primeiro nome";
          valid = false;
        } else {
          errors.name = null;
        }
  
        if (!userData.sobrenome.trim()) {
          errors.sobrenome = "Por favor, insira seu sobrenome";
          valid = false;
        } else {
          errors.sobrenome = null;
        }
  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!userData.email.trim() || !emailRegex.test(userData.email)) {
          errors.email = "Por favor, insira um endereço de e-mail válido";
          valid = false;
        } else {
          errors.email = null;
        }
  
        if (userData.assunto === '' || userData.assunto === 'Assunto') {
          errors.assunto = "Por favor, selecione um assunto";
          valid = false;
        } else {
          errors.assunto = null;
        }
  
        if (!userData.description.trim()) {
          errors.description = "Por favor, insira uma mensagem";
          valid = false;
        } else {
          errors.description = null;
        }
  
        return valid;
      };
  
      const saveContato = () => {
        if (validateForm()) {
          ContatoDataService.create(userData)
            .then(response => {
              console.log(response.data);
             
              clearForm();
              showMessage.value = true;
            })
            .catch(error => {
              console.error(error);
              alert("Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.");
            });
        } else {
          console.log("Formulário inválido");
        }
      };
  
      const clearForm = () => {
        userData.name = '';
        userData.sobrenome = '';
        userData.email = '';
        userData.assunto = '';
        userData.description = '';
      };
  
      return {
        userData,
        errors,
        showMessage,
        saveContato
      };
    }
  };
  </script>
  
  <style scoped>
  /* Adicione seu estilo aqui */
  </style>
  
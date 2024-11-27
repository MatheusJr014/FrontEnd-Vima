<template>
  <div class="container">
    <div class="forms">
      <div class="login">
        <div style="text-align: left;">
          <h1>Faça Login</h1>
        </div>
        <form id="loginForm" @submit.prevent="loginUser">
          <label for="loginEmail">Email</label>
          <input
            type="text"
            v-model="email"
            id="loginEmail"
            placeholder="Digite aqui"
            required
          />

          <label for="loginPassword">Senha</label>
          <input
            type="password"
            v-model="senha"
            id="loginPassword"
            placeholder="Digite aqui"
            required
          />
          <button type="submit">ENTRAR</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import httpCommon from "@/http-common";

export default {
  data() {
    return {
      email: "",
      senha: "",
      rememberMe: false, // Adicionando a opção "Lembrar de mim"
    };
  },
  methods: {
    async loginUser() {
      try {
        console.log("Tentativa de login:", { email: this.email, senha: this.senha });

        // Solicitação ao backend
        const response = await httpCommon.post("/api/auth/login", {
          email: this.email,
          senha: this.senha,
        });

        // Armazenar o token no localStorage ou sessionStorage
        const token = response.data?.token;

        if (token) {
          console.log("Token recebido:", token);

          if (this.rememberMe) {
            localStorage.setItem("token", token);
          } else {
            sessionStorage.setItem("token", token);
          }

          // Redirecionar para a página inicial
          this.$router.push("/perfil");
        } else {
          alert("Erro: Token não recebido. Verifique com o suporte.");
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert(
          "Credenciais inválidas ou erro no servidor. Por favor, tente novamente."
        );
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/Styles/Admin/LoginRegister.css";

container {
  display: flex;
  justify-content: center;
}
</style>

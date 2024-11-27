<template>
    <div class="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
        <div class="card shadow-lg" style="min-width: 450px; min-height: 500px;">
            <div class="card-body p-5">
                <h2 class="card-title text-center mb-4">Admin Login</h2>
                <form @submit.prevent="handleLogin">
                    <div class="mb-4">
                        <label for="email" class="form-label">Email</label>
                        <input
                            type="text"
                            class="form-control"
                            id="email"
                            v-model="email"
                            placeholder="Insira o email"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="password" class="form-label">Senha</label>
                        <input
                            type="password"
                            class="form-control"
                            id="password"
                            v-model="senha"
                            placeholder="Insira a senha"
                            required
                        />
                    </div>
                    <div class="d-grid gap-3">
                        <button type="submit" class="btn btn-primary btn-lg">
                           <h5>Acessar</h5>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/http-common"; // Importa o axios configurado
import { useRouter } from "vue-router";

const email = ref("");
const senha = ref(""); // Alterado para "password" para consistência com a API
const rememberMe = ref(false);
const router = useRouter();

const handleLogin = async () => {
    try {
        const response = await api.post("/api/Auth/login", {
            email: email.value,
            senha: senha.value,
        });

        const token = response.data.token;

        // Armazena o token localmente
        if (rememberMe.value) {
            localStorage.setItem("token", token);
        } else {
            sessionStorage.setItem("token", token);
        }

        // Redireciona para a página de admin
        router.push("/admin");
    } catch (error) {
        alert("Erro ao fazer login: " + (error.response?.data || error.message));
    }
};
</script>

<style>
.form-control {
    display: block;
    width: 100%;
    height: 50px;
    padding: 0.5rem 1rem; 
    font-size: 1.125rem; 
    font-weight: 400;
    line-height: 1.5;
    color: #6e707e;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #d1d3e2;
    border-radius: 10rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

button.btn.btn-primary.btn-lg {
    background: black;
    border-radius: 10rem;
    box-shadow: 2px 2px 2px 2px rgb(0 0 0 1 / 50%);
    border: none;
}

.card-body {
    padding: 3rem; 
}

button.btn-lg {
    padding: 1rem 2rem;
    font-size: 1.125rem; 
}

.mb-4 {
    margin-bottom: 1.5rem; 
}

.d-grid.gap-3 {
    gap: 1.5rem;
}
</style>

<template>
    <div class="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
        <div class="card shadow-lg" style="max-width: 400px;">
            <div class="card-body p-5">
                <h2 class="card-title text-center mb-4">Admin Login</h2>
                <form @submit.prevent="handleLogin">
                    <div class="mb-3">
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
                    <div class="mb-3">
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
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="rememberMe" v-model="rememberMe" />
                        <label class="form-check-label" for="rememberMe">Remember me</label>
                    </div>
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-lock-fill me-2"></i> Logar
                        </button>
                    </div>
                    <div class="text-center mt-3">
                        <a href="#" class="text-decoration-none">Forgot your password?</a>
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

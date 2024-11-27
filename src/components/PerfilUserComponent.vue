<template>
    <NavBarComponent></NavBarComponent>
    <div style="height: 30px"></div>
    <div class="perfil-container">
        <div v-if="carregando" class="loading">Carregando...</div>
        <div v-else-if="erro" class="erro">{{ erro }}</div>
        <div v-else class="perfil-card">
            <div class="perfil-header">
                <div class="avatar">
                    {{ iniciais }}
                </div>
                <h1>Perfil do Usuário</h1>
            </div>
            <div class="info-perfil">
                <div class="campo">
                    <UserIcon class="icon" />
                    <div>
                        <label>Nome</label>
                        <span>{{ perfil.Nome }} {{ perfil.Sobrenome }}</span>
                    </div>
                </div>
                <div class="campo">
                    <MailIcon class="icon" />
                    <div>
                        <label>Email</label>
                        <span>{{ perfil.Email }}</span>
                    </div>
                </div>
                <div class="campo">
                    <UserIcon class="icon" />
                    <div>
                        <label>Função</label>
                        <span>{{ perfil.Role }}</span>
                    </div>
                </div>
            </div>
            <div class="acoes">
                <button @click="logout" class="botao-sair">
                    <LogOutIcon class="icon-button" />
                    Sair da Conta
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'  
import { jwtDecode } from 'jwt-decode' // Importando a biblioteca jwt-decode
import { UserIcon, MailIcon, LogOutIcon } from 'lucide-vue-next'
import NavBarComponent from '@/components/NavBarComponent.vue'

const router = useRouter()  

const perfil = ref({
    Nome: '',
    Sobrenome: '',
    Email: '',
    Role: ''
})
const carregando = ref(true)
const erro = ref(null)

const carregarPerfil = () => {
    try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
            erro.value = 'Token não encontrado';
            return;
        }

        const decodedToken = jwtDecode(token);  // Decodifica o token JWT

        // Ajuste para usar os nomes corretos dos campos no token
        perfil.value.Nome = decodedToken.nome;  
        perfil.value.Sobrenome = decodedToken.sobrenome;  
        perfil.value.Email = decodedToken.unique_name;  
        perfil.value.Role = decodedToken.role;

    } catch (e) {
        erro.value = 'Erro ao processar o token.';
    } finally {
        carregando.value = false;
    }
}
const logout = () => {
    // Limpar o token armazenado
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Redirecionar para a página de login
    router.push('/usuario');  // Usando o roteador para redirecionar

    console.log('Usuário saiu da conta');
    alert('Você saiu da sua conta.');
}

onMounted(() => {
    carregarPerfil();
});
</script>

<style scoped>
.perfil-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f2f5;
    font-family: 'Arial', sans-serif;
}

.loading {
    font-size: 1.2rem;
    color: #666;
}

.erro {
    font-size: 1rem;
    color: red;
}

.perfil-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    width: 100%;
    max-width: 400px;
}

.perfil-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #000000;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

h1 {
    font-size: 1.5rem;
    color: #333;
    margin: 0;
}

.info-perfil {
    margin-bottom: 2rem;
}

.campo {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.icon {
    width: 24px;
    height: 24px;
    margin-right: 1rem;
    color: #000000;
}

label {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 0.25rem;
    display: block;
}

span {
    font-size: 1rem;
    color: #333;
    font-weight: 500;
}

.acoes {
    display: flex;
    justify-content: center;
}

.botao-sair {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #9c9a9a;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.botao-sair:hover {
    background-color: #000000;
}

.icon-button {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
}

@media (max-width: 480px) {
    .perfil-card {
        padding: 1.5rem;
    }

    .avatar {
        width: 60px;
        height: 60px;
        font-size: 1.5rem;
    }

    h1 {
        font-size: 1.25rem;
    }
}
</style>

import axios from "axios";

// Criação da instância do Axios
const api = axios.create({
    baseURL: "https://localhost:7077/",
    headers: {
        "Content-type": "application/json",
    },
    method: {
        post: "POST",
        get: "GET",
        put: "PUT",
        delete: "DELETE",
    },
});

// Interceptor para incluir o token no cabeçalho Authorization
api.interceptors.request.use(
    (config) => {
        // Recupera o token do localStorage ou sessionStorage
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        // Adiciona o cabeçalho Authorization, se o token existir
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Lida com erros na configuração da requisição
        return Promise.reject(error);
    }
);

// Interceptor para tratar erros nas respostas
api.interceptors.response.use(
    (response) => {
        return response; // Retorna a resposta diretamente se não houver erro
    },
    (error) => {
        if (error.response?.status === 401) {
            // Token inválido ou expirado - redirecionar para login
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");

            // Redireciona o usuário para a página de login
            window.location.href = "/login/admin";
        }
        return Promise.reject(error); // Rejeita o erro para lidar em outro lugar
    }
);

export default api;

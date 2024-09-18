import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:7077/",
    headers: {
        "Content-type": "application/json"
    },
    method: {
        post: 'POST', 
        get: 'GET',
        put: 'PUT',
        delete: 'DELETE' // Corrigido de 'del' para 'delete'
    }
    
});

import http from "../http-common";

class ContatoDataService {
    create(data) {
        return http.post("/carrinho/criar", data);
    }
}

export default new ContatoDataService();    
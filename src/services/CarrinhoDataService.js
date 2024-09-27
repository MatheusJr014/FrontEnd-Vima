import http from "../http-common";

class CarrinhoDataService {
    create(data) {
        return http.post("/carrinho/criar", data);
    }
}

export default new CarrinhoDataService();    
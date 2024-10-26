import http from "../http-common";

class CarrinhoDataService {
    create(data) {
        return http.post("/api/Carrinho/criar", data);
    }
}

export default new CarrinhoDataService();    
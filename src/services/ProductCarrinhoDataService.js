import http from "../http-common";

class ProductCarrinhoDataService {
    get(data) {
        return http.get("/api/Carrinho/get", data);
    }
}

export default new ProductCarrinhoDataService();    
import http from "../http-common";

class ProductCarrinhoDataService {
    get(data) {
        return http.get("/carrinho/get", data);
    }
}

export default new ProductCarrinhoDataService();    
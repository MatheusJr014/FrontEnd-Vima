import http from "../http-common";

class ProductCarrinhoDataService {
    get(data) {
        return http.get("/api/Carrinho", data);
    }
}

export default new ProductCarrinhoDataService();    
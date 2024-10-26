import http from "../../http-common";

class ProdutoDataService {
    create(data) {
        return http.post("/api/Produtos/criar", data);
    }
}

export default new ProdutoDataService();    
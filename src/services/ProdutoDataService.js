import http from "../http-common";

class ProdutoDataService {
    create(data) {
        return http.post("/produto/criar", data);
    }
}

export default new ProdutoDataService();    
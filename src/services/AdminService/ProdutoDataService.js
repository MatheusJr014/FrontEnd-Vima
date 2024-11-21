import http from "@/http-common";

class ProdutoDataService {
    create(data) {
        return http.post("/api/admin/product", data);
    }
}

export default new ProdutoDataService();    
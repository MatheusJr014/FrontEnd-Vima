import http from "../http-common";

class UpdateCarrinhoDataService {
    update(id, data) {
        return http.put(`/carrinho/update/${id}`, data);
    }
}

export default new UpdateCarrinhoDataService();

import http from "../http-common";

class UpdateCarrinhoDataService {
    update(id, data) {
        return http.put(`/api/Carrinho/update/${id}`, data, $values);
    }
}

export default new UpdateCarrinhoDataService();

import http from "../http-common";

class DeleteProductFromCarrinhoDataService {
    delete(id) {
        return http.delete(`/api/Carrinho/delete/${id}`);
    }
}

export default new DeleteProductFromCarrinhoDataService();

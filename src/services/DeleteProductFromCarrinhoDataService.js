import http from "../http-common";

class DeleteProductFromCarrinhoDataService {
    delete(id) {
        return http.delete(`/carrinho/delete/${id}`);
    }
}

export default new DeleteProductFromCarrinhoDataService();

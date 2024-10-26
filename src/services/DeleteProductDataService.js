import http from "../http-common";

class DeleteProductDataService {
    delete(id) {
        return http.delete(`/api/Produto/delete/${id}`);
    }
}

export default new DeleteProductDataService();

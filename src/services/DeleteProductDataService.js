import http from "../http-common";

class DeleteProductDataService {
    delete(id) {
        return http.delete(`/produto/delete/${id}`);
    }
}

export default new DeleteProductDataService();

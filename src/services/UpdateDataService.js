import http from "../http-common";

class UpdateDataService {
    update(id, data) {
        return http.put(`/api/Produtos/update/${id}`, data);
    }
}

export default new UpdateDataService();

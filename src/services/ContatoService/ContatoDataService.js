import http from "../../http-common";

class ContatoDataService {
    create(data) {
        return http.post("/api/Contato/save", data);
    }
}

export default new ContatoDataService();    
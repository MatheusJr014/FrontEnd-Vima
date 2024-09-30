import http from "../http-common";

class ContatoDataService {
    create(data) {
        return http.post("/contact/save", data);
    }
}

export default new ContatoDataService();    
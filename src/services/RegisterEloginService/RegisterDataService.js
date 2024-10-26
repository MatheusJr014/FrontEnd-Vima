import http from "../../http-common";

class RegisterDataService {
    create(data) {
        return http.post("/api/Usuarios", data);
    }
}

export default new RegisterDataService();    
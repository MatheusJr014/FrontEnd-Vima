import http from "../../http-common";

class RegisterDataService {
    create(data) {
        return http.post("/api/Usuarios/register", data);
    }
}

export default new RegisterDataService();    
import http from "../http-common";

class RegisterDataService {
    create(data) {
        return http.post("/usuario", data);
    }
}

export default new RegisterDataService();    
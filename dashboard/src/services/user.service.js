import axios from "axios";
import httpCommon from "../http-common";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all", { headers: authHeader()});
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "livreur", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  getAllUsers(){
    return httpCommon.get('/retrieves-all-users', { headers: authHeader() })
  }
}

export default new UserService();

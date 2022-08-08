import axios from "axios";
import http from "../http-common";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all", { headers: authHeader()});
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  updateUser(id,user) {
    return http.put(`/update-user/${id}`,user, { headers: authHeader() });
  }
  updateUserProfile(id,user,jwt) {
    return http.put(`/update-user-profile/${id}/${jwt}`,user, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/delete-user/${id}`, { headers: authHeader() });
  }

  getAllUsers(){
    return http.get('/retrieves-all-users', { headers: authHeader() })
  }
}

export default new UserService();

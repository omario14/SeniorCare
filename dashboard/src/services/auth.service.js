import Axios from "axios";
import authHeader from "./auth-header";


const API_URL = "http://localhost:8080/";

class AuthService {
  login(username, password) {
    return Axios
      .post(API_URL + "authenticate", { username, password })
      .then((response) => {
        console.log("user",response.data);
        if (response.data.accessToken) {
          console.log('doneeeeeeee')
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.clear();
  }

  register(name, lastName, username, email, password, mobile, gender, adress, picture, role) {
    return Axios.post(API_URL + "signup", {
      name, lastName, username, email, password, mobile, gender, adress, picture, role

    }, { headers: authHeader() });
  }
}

export default new AuthService();

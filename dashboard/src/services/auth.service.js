import Axios from "axios";


const API_URL = "http://localhost:8080/";

class AuthService {
  login(username, password) {
    return Axios
      .post(API_URL + "authenticate", { username, password })
      .then((response) => {
        console.log(response.data);
        if (response.data.accessToken) {
          console.log('doneeeeeeee')
          localStorage.setItem("user", JSON.stringify(response.data));
        }
 
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username,roles, email, password) {
    return Axios.post(API_URL + "signup", {
      username,
      email,
      roles,
      password,
     
    });
  }
}

export default new AuthService();

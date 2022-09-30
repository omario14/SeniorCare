import Axios from "axios";
import { logout } from "../actions/auth";
import authHeader from "./auth-header";


const API_URL = "http://localhost:8080/";

class AuthService {
  login(username, password) {
    return Axios
      .post(API_URL + "authenticate", { username, password })
      .then((response) => {
        
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.clear();
  }

  register(name, lastName, username, email, password, mobile, gender, adress, picture, role) {
    return Axios.post(API_URL + "signup", {
      name, lastName, username, email, password, mobile, gender, adress, picture, role

    }, { headers: authHeader() });
  }

 
}

export default new AuthService();

export function runLogoutTimer(dispatch,timer){
  setTimeout(()=>{
    dispatch(logout())
    
  },9000);
}
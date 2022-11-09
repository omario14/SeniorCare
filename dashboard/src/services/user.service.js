import axios from "axios";
import http from "../http-common";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getAllDoseTimes() {
    return http.get("/getall-doseTime", { headers: authHeader()});
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
  getUserNumber(){
    return http.get('/user-numbers',{headers: authHeader()})
  }
  isConnected(){
    return http.get('/currentUser',{headers: authHeader()})
  }
  addNotif(notif){
    return http.post(`/addnotif`,notif, { headers: authHeader() });
  }
  getAllNotifications(){
    return http.get('/getall-Notifications', { headers: authHeader() })
  }
  getAllNotificationsByUser(user){
    return http.get(`/getnotif-byuser/${user}`, { headers: authHeader() })
  }
  removeNotification(id){
    return http.delete(`/delete-notification/${id}`, { headers: authHeader() })
  }
}

export default new UserService();

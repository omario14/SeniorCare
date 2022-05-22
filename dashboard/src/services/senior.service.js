import http from "../http-common";
import authHeader from "./auth-header";
class SeniorService {
 


  

  getAll() {
    return http.get("/retrieveAllSeniors", { headers: authHeader()});
  }
  get(id) {
    return http.get(`/findSeniorById/${id}`, { headers: authHeader()});
  }
  create(data) {
   
    return http.post("/addSenior", data,{ headers: authHeader()});
  }
  update(id, data) {
    return http.put(`/updateSenior/${id}`, data, { headers: authHeader()});
  }
  delete(id) {
    return http.delete(`/removeSenior/${id}`, { headers: authHeader()});
  }
  deleteAll() {
    return http.delete(`/tutorials`);
  }
  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }

  /*********************File **************************/

  upload(file) {
    
    return http.post("/upload", file, { headers: authHeader()});
  }
  getFiles() {
    return http.get("/files");
  }
}
export default new  SeniorService();
import http from "../http-common";
import authHeader from "./auth-header";
class SymptomsService {
 


  

  getAll() {
    return http.get("/retrieveAllSymptoms", { headers: authHeader()});
  }
  get(idSymptom) {
    return http.get(`/findSymptomById/${idSymptom}`, { headers: authHeader()});
  }
 
  findByTitle(label) {
    return http.get(`/findSymptomByLabel/${label}`, { headers: authHeader()});
  }
  findByBodyPart(id) {
    return http.get(`/findSymptomByBodyPart/${id}`, { headers: authHeader()});
  }
  updateSymptoms(symptomIds){
   
    return http.put(`/updateSymptoms/${symptomIds}`);
  }

  checkIllnes(){
    return http.get(`/checkIllnes`,{headers : authHeader()});
  }

}
export default new  SymptomsService();
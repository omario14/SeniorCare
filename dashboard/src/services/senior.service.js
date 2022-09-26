import http from "../http-common";
import authHeader from "./auth-header";
class SeniorService {





  getAll() {
    return http.get("/retrieveAllSeniors", { headers: authHeader() });
  }
  get(id) {
    return http.get(`/findSeniorById/${id}`, { headers: authHeader() });
  }
  create(data) {
    return http.post("/addSenior", data, { headers: authHeader() });
  }
  update(id, data) {
    return http.put(`/updateSenior/${id}`, data, { headers: authHeader() });
  }
  delete(id) {
    return http.delete(`/removeSenior/${id}`, { headers: authHeader() });
  }
  deleteAll() {
    return http.delete(`/removeAllSeniors`, { headers: authHeader() });
  }
  deleteByIds(ids) {
    return http.delete(`/deleteSeniorsByIds/${ids}`, { headers: authHeader() });
  }
  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`, { headers: authHeader() });

  }
  getSeniorNumber(){
    return http.get('/senior-numbers',{headers: authHeader()})
  }




  /*********************File **************************/

  upload(file) {

    return http.post("/upload", file, { headers: authHeader() });
  }
  getFiles() {
    return http.get("/files", { headers: authHeader() });
  }
  getFileById(id) {
    return http.get(`/files/${id}`, { headers: authHeader() })
  }
  removeFileById(id) {
    return http.delete(`/deletefile/${id}`, { headers: authHeader() })
  }



  /*********************Archives **************************/
  getArchiveBySenior(idSenior) {
    return http.get(`/getarchives-bysenior/${idSenior}`, { headers: authHeader() })
  }

  getMedsByArchive(idArchive) {
    return http.get(`/getMedications-byArch/${idArchive}`, { headers: authHeader() })
  }
  putMedsToArchive(idArch, idmed,done) {
    
    return http.put(`addabc/${idArch}/${idmed}/${done}`, { headers: authHeader() })
  }

  addToArchive(data) {
    return http.put(`/updateArchive`, data, { headers: authHeader() });
  }



  /******************** Medication ************************/

  addMedication(medication) {
    return http.post("/addMedication", medication, { headers: authHeader() });
  }
  getMedicationBySenior(idSenior) {
    return http.get(`/getMedicationsBySenior/${idSenior}`, { headers: authHeader() })
  }
  removeMedById(id) {
    return http.delete(`/deleteMedicationById/${id}`, { headers: authHeader() })
  }


  /********************* Calendar *************************/
  getCalendarEvents() {
    return http.get(`/getCalendar`, { headers: authHeader() })
  }
  addToCalendar(data){
    return http.put(`/updateCalendar`,data,{headers: authHeader()})
  }
  removeEvent(idEvent){
    return http.delete(`/deleteEvent/${idEvent}`,{headers: authHeader()})
  }
  getEventsBySenior(idSenior){
    return http.get(`getCalendar-bysenior/${idSenior}`,{headers: authHeader()})
  }


}
export default new SeniorService();
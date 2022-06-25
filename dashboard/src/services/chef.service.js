import http from "../http-common";
import authHeader from "./auth-header";
class ChefService {
 

    getAllIngCategory() {
        return http.get("/retrieves-all-ingredients-categories", { headers: authHeader()});
      }

    addNewIngredient(data){
      return http.post("/add-ingredient",data, { headers: authHeader()})
    }

}
export default new  ChefService();
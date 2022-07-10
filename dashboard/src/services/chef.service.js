import http from "../http-common";
import authHeader from "./auth-header";
class ChefService {

  /********************************** INGREDIENTS *********************************/
  getAllIngCategory() {
    return http.get("/retrieves-all-ingredients-categories", { headers: authHeader() });
  }

  addNewIngredient(data) {
    return http.post("/add-ingredient", data, { headers: authHeader() });
  }
  getAllIngredients(keyword) {
    return http.get(`/get-all-ingredient/${keyword}`, { headers: authHeader() });
  }
  getIngredientsByCat(category) {
    return http.get(`/get-ingredientbyCategory/${category}`, { headers: authHeader() });
  }

  removeIngredient(id) {
    return http.delete(`/delete-ingredient/${id}`, { headers: authHeader() });
  }

  /********************************** MEALS *********************************/

  addNewMeal(data) {
    return http.post("/add-Meal", data, { headers: authHeader() });
  }

  getAllMeals(){
    return http.get(`/get-all-Meal`, { headers: authHeader() });
  }

}
export default new ChefService();
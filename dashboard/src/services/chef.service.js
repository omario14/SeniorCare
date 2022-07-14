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
  getAllIngredients() {
    return http.get(`/get-all-ingredient`, { headers: authHeader() });
  }
  getIngredientsByCat(category) {
    return http.get(`/get-ingredientbyCategory/${category}`, { headers: authHeader() });
  }
  updateIngredient(id,data) {
    return http.put(`/update-ingredient/${id}`,data, { headers: authHeader() });
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
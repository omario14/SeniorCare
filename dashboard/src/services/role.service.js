import http from "../http-common";
class RoleService {
  getAll() {
    return http.get("/retrieves-all-role");
  }
}
export default new  RoleService();
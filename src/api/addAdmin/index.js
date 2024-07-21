import my_req from "../req";
import { urls } from "../base";

// 添加管理员
export const postAddAdminApi = (params) => {
  return my_req.post(urls.addAdmin, params)
}
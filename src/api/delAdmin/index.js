import my_req from "../req";
import { urls } from "../base";

// 删除管理员
export const postDelAdminApi = (params) => {
  return my_req.post(urls.delAdmin, params)
}
import my_req from "../req";
import { urls } from "../base";

// 获取所有的管理员列表
export const getAdminListApi = () => {
  return my_req.get(urls.adminList)
}
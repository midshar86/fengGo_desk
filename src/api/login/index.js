import my_req from "../req";
import { urls } from "../base";

export const postUserLoginApi = (params) => {
  return my_req.post(urls.login, params)
}
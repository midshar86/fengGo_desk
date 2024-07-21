import my_req from "../req";
import { urls } from "../base";

// 获取商品列表
export const getGoodsListApi = (params) => {
  return my_req.get(urls.proList, { params, needTotalNnum: true })
}
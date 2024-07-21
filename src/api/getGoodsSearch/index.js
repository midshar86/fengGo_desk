import my_req from "../req";
import { urls } from "../base";

// 获取分类筛选后的商品数据
export const postGoodsSearchApi = (params) => {
  return my_req.post(urls.proSearch, params)
}
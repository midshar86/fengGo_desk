import my_req from "../req";
import { urls } from "../base";

// 获取商品的所有分类
export const getGoodsCategoryApi = () => {
  return my_req.get(urls.proCategory)
}
import my_req from "../req";
import { urls } from "../base";

// 更新商品的秒杀状态与推荐状态
export const postGoodsUpdateApi = (params) => {
  return my_req.post(urls.proUpdate, params)
}
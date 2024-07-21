import my_req from "../req";
import { urls } from "../base";

// 获取对应proid的商品详情信息
export const getGoodsDetailsApi = (proid) => {
  return my_req.get(urls.proDetails, { params: { proid } })
}
import my_req from "../req";
import { urls } from "../base";

// product", // 获取商品数量
// user" // 获取用户数量

// 根据传递的参数决定具体需要请求的接口地址
export const getStatisticDataApi = (type) => {
  return my_req.get(`${urls.statistic}/${type}`)
}
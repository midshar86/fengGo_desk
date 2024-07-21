import my_req from "../req";
import { urls } from "../base";

// 新增一条轮播图数据
export const postAddSwiperItemApi = (params) => {
  return my_req.post(urls.addSwiperItem, params)
}
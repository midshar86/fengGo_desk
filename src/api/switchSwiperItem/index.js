import my_req from "../req";
import { urls } from "../base";

// 更新轮播图的显示状态
export const postUpdateSwiperItemApi = (params) => {
  return my_req.post(urls.updateSwiperItem, params)
}
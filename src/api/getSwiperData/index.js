import my_req from "../req";
import { urls } from "../base";

// 获取轮播图数据
export const getSwiperDataApi = () => {
  return my_req(urls.swiperData)
}
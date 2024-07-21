import my_req from "../req";
import { urls } from "../base";

// 删除某条轮播数据
export const getDelSwiperItemApi = (bannerid) => {
  return my_req.get(urls.delSwiperItem, { params: { bannerid } })
}
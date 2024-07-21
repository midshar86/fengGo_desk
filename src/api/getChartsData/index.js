import my_req from "../req";
import { urls } from "../base";

// 发送请求获取k线图数据
export const getKChartDataApi = () => {
  return my_req.get(urls.kData)
}

// 发送请求获取柱状图数据
export const getBarChartDataApi = () => {
  return my_req.get(urls.barData)
}
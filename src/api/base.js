// 管理请求地址
export const urls = {
  baseURL: "http://121.89.205.189:3000/admin", // 请求的基准路径
  login: "/admin/login", // 请求登录 adminname password
  statistic: "/statistic", // 获取存放的静态数据 token
  kData: "/data/kData", // 获取k线图的数据 token
  barData: "/data/simpleData", // 获取柱状图/饼图/折线图数据 token
  swiperData: "/banner/list", // 获取轮播图的数据
  updateSwiperItem: "/banner/updateFlag", // 是否展示轮播图 post token bannerid flag
  delSwiperItem: "/banner/delete", // 删除单条轮播图数据 get token bannerid
  addSwiperItem: "/banner/add", // 插入单条轮播图数据 post token img(base64) alt link
  proList: "/pro/list", // 获取商品列表 token count limitNum
  proUpdate: "/pro/updateFlag", // 更新商品状态 post token proid flag type(isseckill,isrecommend)
  proDetails: "/pro/detail", // 获取当前商品详情 token proid
  proSearch: "/pro/searchPro", // 请求分类数据 post token category search
  proCategory: "/pro/getCategory", // 获取商品的所有分类 token
  adminList: "/admin/list", // 获取管理员信息列表
  addAdmin: "/admin/add", // 添加管理员 post token adminname password role checkedKeys
  delAdmin: "/admin/delete" // 删除管理员 post token adminid
}
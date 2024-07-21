import axios from "axios";
import { urls } from "@/api/base"
import nprogress from "nprogress";
import "nprogress/nprogress.css"
import { ElMessage } from 'element-plus'
// 引入仓库
import { store } from '@/store'
import { CLEAR_USERINFO } from "@/store/modules/user/methodsName"

const my_req = axios.create({
  // 设置请求基准路径
  baseURL: urls.baseURL,
  // 设置请求超时时间
  timeout: 5000
})

// 配置请求拦截
my_req.interceptors.request.use(config => {
  // 添加请求进度条
  nprogress.start()
  // 配置请求头
  config.headers.token = store.state.user.userinfo.token
  return config
}, err => {
  // 请求失败时做些什么
  return Promise.reject(err)
})

// 配置响应拦截
my_req.interceptors.response.use(res => {
  // 关闭进度条
  nprogress.done()
  // 定义登录成功状态
  const loginIsSuccess = res.data.code === "200"
  // 定义token过期状态
  const isExpired = res.data.code === "10119"

  // 统一处理弹窗
  // 在get请求失败的情况下, 与任意的post请求中, 都需要展示给用户一个提示窗口
  if ((res.config.method === "get" && !loginIsSuccess) || res.config.method === "post") {
    if (isExpired) {
      // 用户的token过期
      ElMessage.error("登录身份过期!请重新登录!")
      // 调用store中的mutation, 清空本地存储的用户信息与vuex中的用户信息, 引导用户至登录页
      store.commit(`user/${CLEAR_USERINFO}`)
    } else {
      // 用户的token未过期
      ElMessage({
        message: res.data.message,
        type: loginIsSuccess ? 'success' : 'error'
      })
    }
  }

  // 登录成功处理
  if (loginIsSuccess) {
    if (res.config.needTotalNnum) {
      // 特殊处理获取商品的总条目数数据
      sessionStorage.setItem("total", res.data.total)
      return res.data
    } else {
      // 其余的数据返回
      return res.data.data
    }
  } else {
    // 错误处理
    return Promise.reject(res.data.code)
  }
}, err => {
  // 响应失败时做些什么
  nprogress.done()
  return Promise.reject(err)
})

export default my_req
import router from "@/router"
import { CLEAR_USERINFO, SAVE_USERINFO } from "@/store/modules/user/methodsName"
const mutations = {
  // 清空用户登录信息
  [CLEAR_USERINFO](state) {
    state.userinfo = {}
    sessionStorage.removeItem("user")
    router.push({ name: "login" })
  },
  // 存储用户登录信息
  [SAVE_USERINFO](state, payload) {
    state.userinfo = payload.userinfo
  }
}
export default mutations
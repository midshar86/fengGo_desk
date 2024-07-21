import { postUserLoginApi } from '@/api/login'
import router from '@/router'
const actions = {
  // 处理用户登录
  handlerUserLogin: async ({ commit }, payload) => {
    try {
      const res = await postUserLoginApi({
        adminname: payload.username,
        password: payload.password
      })
      console.log(res)
      // 登录成功往仓库中存放用户信息
      commit("SAVE_USERINFO", { userinfo: res })
      router.push('/')
    } catch (err) {
      console.log(err);
    }
  }
}
export default actions
import getters from "./getters"
import actions from "./actions"
import mutations from "./mutations"
// user模块的入口文件

// 用户模块
const user = {
  // 启用命名空间
  namespaced: true,
  state() {
    const getUserInfo = JSON.parse(sessionStorage.getItem('user'))
    return {
      // 存放用户信息
      // 在初始化用户信息时, 从本地读取数据
      userinfo: getUserInfo ? getUserInfo : {}
    }
  },
  getters,
  actions,
  mutations
}
export default user
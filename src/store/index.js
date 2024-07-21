import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"
import user from "./modules/user"

// 挂载所有store模块的入口文件

// 在模块化的语法中使用vuex-persistedstate
const userInfoState = createPersistedState({
  // 带命名空间的配置
  paths: ['user.userinfo'],
  key: "user",
  storage: sessionStorage
})
// 导出仓库
export const store = createStore({
  modules: {
    user
  },
  // 挂载状态持久化插件
  plugins: [userInfoState]
})
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入样式重置文件
import "normalize.css"
// 引入自定义的基础样式
import "@/assets/style/index.css"
// 引入element-plus样式文件
import "element-plus/dist/index.css"
// 引入状态管理工具
import { store } from "./store/index"
// 执行路由前置守卫
import "@/router/permission"
// 导入自定义的插件
import { customedPlugin } from "@/utils/GlobalMethods"

const app = createApp(App)

// 使用自定义的插件
app.use(router)
app.use(store)
app.use(customedPlugin)

app.mount('#app')

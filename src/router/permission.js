import { store } from "@/store"
import router from "@/router"

// 配置全局路由守卫
router.beforeEach((to, from, next) => {
  // 判断跳转页面是否需要登录
  if (to.meta.needLogin) {
    // 如果需要登录
    if (store.getters["user/isLogin"]) {
      // 用户已经登录
      next()
    } else {
      // 用户未登录
      next({ name: "login" })
    }
  } else {
    // 如果不需要登录
    next()
  }
})

router.beforeEach((to, from, next) => {
  // 配置全局路由守卫实现用户的权限拦截

  // 获取用户的权限列表
  let userCheckedkeys = store.state.user.userinfo.checkedkeys
  let username = store.state.user.userinfo.adminname
  // 如果将要进入的页面不是login页面, error页面与ban页面, 并且登录用户不是admin, 需要进行权限管理
  if (to.name !== 'login' && to.name !== 'error' && to.name !== 'ban' && username !== 'admin') {
    // 取出当前页面匹配的路径
    let menuName = to.matched[1].name
    if (userCheckedkeys.includes(menuName)) {
      // 有权限, 直接通过
      next()
    } else {
      // 没有权限, 跳转至提示页面
      next({ name: 'ban' })
    }
  } else {
    // 如果是上述指定的login, error, ban页面, 直接通过
    next()
  }
})
const getters = {
  // 判断用户是否登录
  isLogin(state) {
    return !!state?.userinfo?.token
  }
}
export default getters
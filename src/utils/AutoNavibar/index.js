export const mapRoutes = (routes) => {
  // 存储整理后的导航数据
  const afterMap = {}

  // 使用数组的forEach方法, 该方法没有返回值, 也不会影响数组, 只会执行响应逻辑
  routes[0].children.forEach(ele => {
    // 判断是否是一级导航
    if (!ele.parent) {
      // 如果是一级导航
      afterMap[ele.name] = { title: ele.title, name: ele.name }
    } else {
      // 如果不是一级导航
      if (!afterMap[ele.parent.name]) {
        // 如果对象afterMap中尚未存储子导航数据
        afterMap[ele.parent.name] = {
          title: ele.parent.title,
          name: ele.parent.name,
          // 在items属性中存放子导航
          items: [{
            title: ele.title,
            name: ele.name
          }]
        }
      } else {
        // 如果对象afterMap中已经存在子导航数据
        afterMap[ele.parent.name].items.push({
          title: ele.title,
          name: ele.name
        })
      }
    }
  })
  // 返回整理后的对象键值
  return Object.values(afterMap)
}
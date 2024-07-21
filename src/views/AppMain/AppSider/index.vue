<template>
  <!-- 布局侧边栏 -->
  <el-aside width="200px">
    <!-- 导航菜单 -->
    <!-- 动态绑定default-active实现激活选中导航时的样式 -->

    <!-- 在为选中导航添加样式时, 因为存在多级路由导致样式无法正确匹配, 通过$route.matched中的路由来匹配 -->
    <!-- $route.matched会列举到当前组件中匹配的所有层级路由 -->
    <el-menu
      active-text-color="#F7A072"
      background-color="transparent"
      class="el-menu"
      :default-active="$route.matched[1].name"
      text-color="#F2E9E4"
      router
    >
      <template v-for="item in limitNavData" :key="item.name">
        <!-- 导航菜单单栏 -->

        <!-- 一级导航 -->
        <el-menu-item v-if="!item.items" :index="item.name" @click="handlerRoute(item.name)">
          <span>{{ item.title }}</span>
        </el-menu-item>

        <!-- 二级导航 -->
        <el-sub-menu v-else :index="item.name">
          <!-- 二级导航父标题 -->
          <template #title>
            <span>{{ item.title }}</span>
          </template>
          <!-- 子导航 -->
          <el-menu-item
            v-for="subItem in item.items"
            :key="subItem.name"
            :index="subItem.name"
            @click="handlerRoute(subItem.name)"
          >
            <span>{{ subItem.title }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
// 导入路由中的routes数据
import { routes } from '@/router'
// 导入导航处理函数
import { mapRoutes } from '@/utils/AutoNavibar'
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  data() {
    return {
      navData: mapRoutes(routes)
    }
  },
  computed: {
    ...mapState('user', ['userinfo']),
    // 存放动态导航数据
    limitNavData() {
      // 如果用户名称是 admin, 虽然权限为空, 但是能够访问所有的页面
      // 否则, 调用函数, 根据用户的权限列表生成对应的导航菜单
      return this.userinfo.adminname === 'admin'
        ? this.navData
        : this.limitMenu(this.navData, this.userinfo.checkedkeys)
    }
  },
  methods: {
    // 点击导航栏实现内容及路由切换
    handlerRoute(name) {
      this.$router.push({ name })
    },
    // 根据用户的权限列表生成对应的导航菜单
    limitMenu(originAll, tar) {
      // 深复制一个all数组用作遍历对象
      const copyOringinAll = _.cloneDeep(originAll)
      // 创建空数组, 用来存储根据tar数组筛选后的all数组元素
      const filterNavData = []
      // 遍历all数组中的元素
      copyOringinAll.forEach((item) => {
        if (tar?.includes(item.name)) {
          // 如果tar数组中存在all数组中的item.name属性, 表示该父导航下的所有子到导航都存在
          filterNavData.push(item)
        } else if (item.items) {
          // 如果tar数组中不存在all数组中的item.name属性, 表示该父导航下的部分子到导航存在
          // 判断all数组中的item是否存在items子导航
          // 如果存在子导航
          // 建立空数组存放子导航数据
          const subItems = []
          // 遍历子导航
          item.items.forEach((subitem) => {
            if (tar?.includes(subitem.name)) {
              // 如果在tar数组中存在子导航数据
              // 向subItem中添加数据
              subItems.push(subitem)
            }
          })
          // 子导航遍历结束后, 将原item中的items替换为subItems
          item.items = subItems
          if (subItems.length) {
            filterNavData.push(item)
          }
        }
      })
      return filterNavData
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  background-color: #006d5b;
  .el-menu {
    border-right: none;
    li {
      &.is-active.el-menu-item {
        background-color: #004b3f;
      }
    }
  }
}
// 设置选中导航菜单当子导航收起或者展开后的样式
:deep(.el-sub-menu.is-active) {
  .el-sub-menu__title {
    span {
      transition: color 0.3s;
      color: #f7a072;
    }
  }
}
// 设置选中导航菜单当子导航收起或者展开后的样式
:deep(.el-sub-menu.is-active.is-opened) {
  .el-sub-menu__title {
    span {
      transition: color 0.5s;
      color: white;
    }
  }
}
</style>

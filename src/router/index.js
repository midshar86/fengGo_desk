import { createRouter, createWebHashHistory } from 'vue-router'
import WorkspaceComp from "@/views/AppMain/index.vue"
import LoginComp from "@/views/AppLogin/index.vue"
import HomeComp from "@/views/AppMain/AppHome/index.vue"

export const routes = [
  {
    path: "/",
    name: "workspace",
    component: WorkspaceComp,
    redirect: "/home",
    meta: {
      // 该路由及该路由下的子路由均受该meta元信息的影响
      needLogin: true
    },
    children: [
      {
        path: "home",
        name: "home",
        component: HomeComp,
        title: "首页"
      },
      {
        path: "swiper-list",
        name: "swiper-list",
        component: () => import("@/views/AppMain/AppSwiper/SwiperList/index.vue"),
        title: "轮播图列表",
        parent: { name: "swiper", title: "轮播图管理" },
        redirect: { name: "swiper-model" },
        children: [{
          path: "swiper-model",
          name: "swiper-model",
          component: () => import("@/views/AppMain/AppSwiper/SwiperList/components/SwiperModel.vue")
        }, {
          path: "list-model",
          name: "list-model",
          component: () => import("@/views/AppMain/AppSwiper/SwiperList/components/ListModel.vue")
        }]
      },
      {
        path: "swiper-add",
        name: "swiper-add",
        component: () => import("@/views/AppMain/AppSwiper/SwiperAdd/index.vue"),
        title: "添加轮播图",
        parent: { name: "swiper", title: "轮播图管理" }
      },
      {
        path: "goods-list",
        name: "goods-list",
        component: () => import("@/views/AppMain/AppProduct/GoodsList/index.vue"),
        title: "商品列表",
        parent: { name: "goods", title: "商品管理" }
      },
      {
        path: "goods-search",
        name: "goods-search",
        component: () => import("@/views/AppMain/AppProduct/GoodsSearch/index.vue"),
        title: "商品搜索",
        parent: { name: "goods", title: "商品管理" }
      },
      {
        path: "admin-list",
        name: "admin-list",
        title: "管理员列表",
        component: () => import("@/views/AppMain/AppAdmin/AdminList/index.vue"),
        parent: { name: "admin", title: "管理员设置" }
      },
      {
        path: "text-editor",
        name: "text-editor",
        title: "文本编辑",
        component: () => import("@/views/AppMain/AppEditor/index.vue"),
        parent: { name: "editor", title: "文本编辑器" }
      },
      {
        path: "table-export",
        name: "table-export",
        component: () => import("@/views/AppMain/AppTable/ExportExcel/index.vue"),
        title: "导出表格",
        parent: { name: "excel", title: "Excel管理" }
      },
      {
        path: "table-import",
        name: "table-import",
        component: () => import("@/views/AppMain/AppTable/ImportExcel/index.vue"),
        title: "导入表格",
        parent: { name: "excel", title: "Excel管理" }
      },
      {
        path: "show-map",
        name: "show-map",
        component: () => import("@/views/AppMain/AppMap/index.vue"),
        title: "地图展示",
        parent: { name: "map", title: "地图管理" }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: LoginComp
  },
  {
    path: "/ban",
    name: 'ban',
    component: () => import("@/views/AppError/ban.vue")
  },
  {
    // 错误处理
    path: "/:otherpages(.*)*",
    name: "error",
    component: () => import("@/views/AppError/index.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router

<template>
  <!-- 导出按钮 -->
  <el-button type="primary" @click="exportExcel">导出列表数据</el-button>
  <!-- 展示标签 -->
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="轮播模式" name="swiper-model"></el-tab-pane>
    <el-tab-pane label="列表模式" name="list-model"></el-tab-pane>
  </el-tabs>
  <!-- 三级路由出口 -->
  <!-- 向子组件传递数据 -->
  <router-view :datas="swiperData" @update="getSwiperData"></router-view>
</template>

<script>
import { getSwiperDataApi } from '@/api/getSwiperData'
import _ from 'lodash'
import * as XLSX from 'xlsx'
export default {
  data() {
    return {
      // 设置选中标签
      activeName: this.$route.name,
      // 存放轮播图数据
      swiperData: []
    }
  },
  methods: {
    // 点击切换显示模式
    handleClick(tab) {
      this.$router.push({ name: tab.paneName })
    },
    async getSwiperData() {
      // 获取轮播图数据
      try {
        const res = await getSwiperDataApi()
        this.swiperData = res
      } catch (error) {
        console.log(error)
      }
    },
    // 导出列表数据
    exportExcel() {
      // 深复制一份数据, 剔除img属性, 因为img属性值过大无法写入一个单元格
      const cloneData = _.cloneDeep(this.swiperData)
      cloneData.forEach((item) => {
        delete item.img
      })
      // 创建工作簿
      const workBook = XLSX.utils.book_new()
      // 创建工作表, 指定需要导出的表头字段
      // 参数含义:(空数组表示创建一个空的工作表,header指定表头字段)
      const workSheet = XLSX.utils.json_to_sheet(cloneData)
      // 在工作簿中插入工作表
      // 参数含义:(工作簿,工作表,工作表名称)
      XLSX.utils.book_append_sheet(workBook, workSheet, '轮播图列表数据')
      // 导出工作簿
      // 参数含义:(工作簿,工作簿名称,是否压缩)
      XLSX.writeFile(workBook, '轮播图.xlsx')
    }
  },
  created() {
    // 调用函数获取轮播图数据
    this.getSwiperData()
  }
}
</script>

<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

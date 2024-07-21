<template>
  <el-scrollbar>
    <!-- 首页头部区域 -->
    <MainHeader></MainHeader>
    <div class="container">
      <div class="top">
        <!-- 首页图表展示区域 -->
        <div id="k-chart"></div>
        <div id="bar-chart"></div>
      </div>
      <div id="line-chart"></div>
    </div>
  </el-scrollbar>
</template>

<script>
import MainHeader from '@/views/AppMain/AppHome/components/MainHeader.vue'
import { getKChartDataApi, getBarChartDataApi } from '@/api/getChartsData'
export default {
  components: {
    MainHeader
  },
  async mounted() {
    this.getKChartData()
    this.getBarChartData()
    this.getLineChartData()
  },
  beforeMount() {
    // 在组件销毁之前调用方法清空之前图表的实例
    this.$clear()
  },
  methods: {
    // 获取k线图数据
    async getKChartData() {
      try {
        const res = await getKChartDataApi()
        // 调用自定义的插件
        this.$k('k-chart', res)
      } catch (error) {
        console.log(error)
      }
    },
    async getBarChartData() {
      try {
        const res = await getBarChartDataApi()
        this.$bar('bar-chart', res)
      } catch (error) {
        console.log(error)
      }
    },
    async getLineChartData() {
      try {
        const res = await getBarChartDataApi()
        this.$line('line-chart', res)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .top {
    display: flex;
    justify-content: space-around;
    div {
      width: 45%;
      height: 400px;
      margin: 15px 0;
      background-color: #eee;
    }
  }
  #line-chart {
    width: 95%;
    margin: 15px;
    background-color: #eee;
    height: 400px;
  }
}
:deep(.el-scrollbar__wrap) {
  width: 100%;
  .el-scrollbar__view {
    width: 99%;
  }
}
</style>

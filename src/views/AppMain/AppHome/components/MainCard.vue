<template>
  <el-col :span="6">
    <!-- 以卡片形式展示数据 -->
    <el-card shadow="hover">
      <span
        >{{ title }} :
        <strong v-loading="loading">{{
          statisticData === null ? '--' : statisticData
        }}</strong></span
      >
      <el-button @click="updateStatisticData">更新</el-button>
    </el-card>
  </el-col>
</template>

<script>
import { getStatisticDataApi } from '@/api/getStatistic'
export default {
  data() {
    return {
      // 静态数据初始值
      statisticData: null,
      // 默认不显示加载提示
      loading: false
    }
  },
  props: {
    title: {
      // 该属性用来设置卡片内容
      required: true,
      type: String
    },
    type: {
      // 该属性表示卡片展示哪个数据
      required: true,
      type: String
    }
  },
  created() {
    // 调用获取静态数据的函数
    this.getStatistic()
  },
  methods: {
    // 定义获取静态数据的函数
    async getStatistic() {
      try {
        // 请求开始前开启加载提示
        this.loading = true
        this.statisticData = await getStatisticDataApi(this.type)
      } catch (err) {
        console.log(err)
      }
      // 请求结束后关闭加载提示
      this.loading = false
    },
    updateStatisticData() {
      // 点击更新重新获取数据
      this.getStatistic()
    }
  }
}
</script>

<style lang="scss" scoped>
// 使用:deep()在vue3中设置样式的深层穿透
:deep(.el-card__body) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}
</style>

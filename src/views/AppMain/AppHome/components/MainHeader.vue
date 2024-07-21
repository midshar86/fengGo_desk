<template>
  <el-row :gutter="10">
    <MainCard title="商品总数量" type="product"></MainCard>
    <MainCard title="用户总数量" type="user"></MainCard>
  </el-row>
</template>

<script>
import MainCard from './MainCard.vue'
export default {
  data() {
    return {}
  },

  components: {
    MainCard
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <!-- 内容展示区 -->

  <el-main>
    <!-- 二级路由出口 -->
    <router-view></router-view>
  </el-main>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  height: calc(100vh - 60px);
  padding-bottom: 0;
  overflow: hidden;
}
</style>

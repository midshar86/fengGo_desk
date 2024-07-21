<template>
  <div class="common-layout">
    <el-container>
      <!-- 侧边栏 -->
      <AppSider></AppSider>
      <el-container direction="vertical" class="right-content">
        <!-- 顶部导航 -->
        <AppHeader></AppHeader>
        <!-- 主题内容区 -->
        <AppContent></AppContent>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppHeader from '@/views/AppMain/AppHeader/index.vue'
import AppSider from '@/views/AppMain/AppSider/index.vue'
import AppContent from '@/views/AppMain/AppContent/index.vue'
export default {
  components: {
    AppHeader,
    AppSider,
    AppContent
  }
}
</script>

<style lang="scss" scoped>
.right-content {
  overflow: hidden;
}
</style>

<template>
  <el-result icon="error" title="您无权限查看此内容">
    <template #extra>
      <el-button type="primary" @click="backToHome">返回首页</el-button>
    </template>
  </el-result>
</template>

<script>
export default {
  methods: {
    backToHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped></style>

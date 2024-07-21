<template>
  <el-result icon="info" title="表格管理">
    <template #sub-title>
      <p>表格导出功能已集成至对应数据展示的组件</p>
    </template>
    <template #extra>
      <el-button type="primary" @click="$router.push({ name: 'list-model' })"
        >前往导出轮播图列表</el-button
      >
      <el-button type="primary" @click="$router.push({ name: 'goods-list' })"
        >前往导出商品列表</el-button
      >
      <el-button type="primary" @click="$router.push({ name: 'admin-list' })"
        >前往导出管理员列表</el-button
      >
    </template>
  </el-result>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>

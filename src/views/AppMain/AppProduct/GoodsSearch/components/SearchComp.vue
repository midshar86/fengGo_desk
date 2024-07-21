<template>
  <el-form :inline="true" :model="searchValue" class="demo-form-inline">
    <el-form-item label="关键词">
      <el-input v-model="searchValue.search" placeholder="请输入搜索关键词" clearable />
    </el-form-item>
    <el-form-item label="分类">
      <el-select v-model="searchValue.category" placeholder="请选择分类" clearable>
        <el-option v-for="item in goodsCategory" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查找</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ['goodsCategory'],
  data() {
    return {
      // 表单数据对象
      searchValue: {
        search: '',
        category: ''
      }
    }
  },
  methods: {
    // 向父组件传递一个事件, 用于显示查找后的商品列表
    onSubmit() {
      this.$emit('searchValue', this.searchValue)
    }
  },
  mounted() {
    // 加载组件后触发一次获取所有未分类的数据
    this.onSubmit()
  }
}
</script>

<style lang="scss" scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>

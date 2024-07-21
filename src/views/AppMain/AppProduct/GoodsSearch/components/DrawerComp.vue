<template>
  <el-scrollbar height="100vh">
    <el-drawer :modelValue="modelValue" title="商品详情" direction="rtl" @close="handlerClose">
      <h3>{{ goodsDetails.proname }}</h3>
      <img :src="goodsDetails.img1" alt="商品图片" width="300px" />
      <p>{{ goodsDetails.desc }}</p>
    </el-drawer>
  </el-scrollbar>
</template>

<script>
import { getGoodsDetailsApi } from '@/api/getGoodsDetails'
export default {
  props: ['modelValue', 'proid'],
  emits: ['update:modelValue'],
  data() {
    return {
      goodsDetails: {}
    }
  },
  methods: {
    // 关闭抽屉效果时的回调函数
    handlerClose() {
      this.$emit('update:modelValue', false)
      this.goodsDetails = {}
    }
  },
  watch: {
    // 使用侦听器侦听proid的值是否改变
    async proid() {
      // 如果抽屉处于打开状态并且接收到了父组件传递的proid
      if (this.proid && this.modelValue) {
        const res = await getGoodsDetailsApi(this.proid)
        this.goodsDetails = res[0]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

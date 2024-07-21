<template>
  <el-carousel height="400px" motion-blur>
    <el-carousel-item v-for="item in swiperData" :key="item.bannerid">
      <img :src="item.img" :alt="item.alt" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: ['datas'],
  data() {
    return {
      swiperData: []
    }
  },
  mounted() {
    this.filterSwiperData()
  },
  updated() {
    this.filterSwiperData()
  },
  methods: {
    filterSwiperData() {
      this.swiperData = this.datas.filter((item) => item.flag)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel {
  .el-carousel__item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

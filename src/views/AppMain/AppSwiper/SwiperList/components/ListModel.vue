<template>
  <el-table :data="datas" style="width: 100%" max-height="75vh">
    <el-table-column align="center" label="序号" type="index" width="80px" />
    <el-table-column align="center" label="图片">
      <template #default="scope">
        <!-- 开启preview将预览层叠放到最外层 -->
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.img"
          fit="contain"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="images"
          :preview-teleported="true"
          infinite
          :initial-index="initialPos"
          @show="handlerShow(scope.$index)"
        />
      </template>
    </el-table-column>
    <el-table-column align="center" label="BannerId" prop="bannerid" />
    <el-table-column align="center" label="Alt" prop="alt" />
    <el-table-column align="center" label="绑定链接" prop="link" />
    <el-table-column align="center" label="是否展示">
      <template #default="scope">
        <el-switch :modelValue="scope.row.flag" @click="handlerClick(scope.row)" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作">
      <template #default="scope">
        <!-- 用户二次确认后删除当前轮播图 -->
        <el-popconfirm
          title="确定删除当前轮播图?"
          confirm-button-text="删除"
          cancel-button-text="取消"
          confirm-button-type="danger"
          cancel-button-type="success"
          width="200px"
          @confirm="handleDelete(scope.row)"
        >
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { postUpdateSwiperItemApi } from '@/api/switchSwiperItem'
import { getDelSwiperItemApi } from '@/api/delSwiperItem'
import { ElMessage } from 'element-plus'
export default {
  props: ['datas'],
  // 显式声明需要调用的父组件的方法
  emits: ['update'],
  data() {
    return {
      filterTableData: [],
      // 存储轮播图的所有图片数据用于预览
      images: [],
      initialPos: 0
    }
  },
  methods: {
    // 实现当前点击的图像的预览功能
    handlerShow(val) {
      this.initialPos = val
    },
    // 点击删除时, 发送请求删除该条轮播图数据
    async handleDelete(row) {
      const { bannerid } = row
      try {
        await getDelSwiperItemApi(bannerid)
        // 删除成功
        ElMessage.success('数据删除成功!')
        this.$emit('update')
      } catch (error) {
        console.log(error)
      }
    },
    // 定义函数存储请求返回的所有轮播图数据
    saveImages() {
      this.datas.forEach((item) => this.images.push(item.img))
    },
    // 点击时, 发送网络请求更改轮播图的展示状态
    async handlerClick(row) {
      const { bannerid, flag } = row
      try {
        await postUpdateSwiperItemApi({ bannerid, flag: !flag })
        this.$emit('update')
      } catch (error) {
        console.log(error)
      }
    }
  },
  updated() {
    // 当界面首次加载时, 对于异步获取的数据, 在界面updated后更新images的数据
    this.saveImages()
    // console.log(this.images)
  },
  mounted() {
    this.saveImages()
    // 为了确保离开组件后仍然可以预览图片, 在mounted生命周期中对images数组进行更新
    // console.log(this.images)
  }
}
</script>

<style lang="scss" scoped></style>

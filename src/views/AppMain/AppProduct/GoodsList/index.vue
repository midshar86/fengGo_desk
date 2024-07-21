<template>
  <el-button type="primary" @click="exportGoodsList">导出列表数据</el-button>
  <!-- 在表格内部实现滚动, 需要借助表格中height/max-hehight设置表格的高度,style属性设置表格的width属性 -->
  <el-table
    :data="tableData"
    stripe
    empty-text="没有数据"
    :header-cell-style="{ textAlign: 'center' }"
    :cell-style="{ textAlign: 'center' }"
    :row-style="{ height: '120px' }"
    max-height="75vh"
    style="width: 100%"
    :border="true"
  >
    <!-- 序号列 -->
    <el-table-column label="序号" width="80" type="index" />
    <!-- 图片列 -->
    <el-table-column label="图片" width="120">
      <template #default="{ row }">
        <el-image
          :src="row.img1"
          class="detail-image"
          :preview-src-list="[row.img1, row.img2, row.img3, row.img4]"
          preview-teleported
        />
      </template>
    </el-table-column>
    <!-- 名称列 -->
    <el-table-column label="名称" width="180">
      <template #default="scope">
        <el-tooltip effect="dark" placement="top" :content="scope.row.proname">
          <el-text :line-clamp="2">{{ scope.row.proname }}</el-text>
        </el-tooltip>
      </template>
    </el-table-column>
    <!-- 其余列 -->
    <el-table-column label="品牌" width="120" prop="brand" />
    <el-table-column
      label="分类"
      width="80"
      prop="category"
      :filters="totalCategory"
      :filter-method="handlerCategory"
    />
    <el-table-column label="原价" width="80" prop="originprice" sortable />
    <el-table-column label="折扣" width="80" prop="discount" sortable />
    <el-table-column label="销量" width="150" prop="sales" sortable />
    <!-- 秒杀列 -->
    <el-table-column label="是否秒杀">
      <template #default="{ row }">
        <el-switch
          :modelValue="!!row.isseckill"
          @click="changeGoodsState(row.proid, 'isseckill', !row.isseckill)"
        />
      </template>
    </el-table-column>
    <!-- 推荐列 -->
    <el-table-column label="是否推荐">
      <template #default="{ row }">
        <el-switch
          :modelValue="!!row.isrecommend"
          @click="changeGoodsState(row.proid, 'isrecommend', !row.isrecommend)"
        />
      </template>
    </el-table-column>
    <!-- 操作列 -->
    <el-table-column label="操作" fixed="right">
      <template #default="{ row }">
        <el-button type="primary" size="small" @click="learnAboutDetails(row.proid)"
          >查看详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页器 -->
  <div class="pagination-container">
    <el-pagination
      background
      layout="sizes,prev, pager, next,jumper"
      :total="totalGoodsNum"
      v-model:current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :default-page-size="pageSize"
      @size-change="handlerSizeChange"
      @current-change="handlerCurrentChange"
    />
  </div>
  <!-- 使用抽屉 -->
  <DrawerComp v-model="isShow" :proid="proid"></DrawerComp>
</template>

<script>
import { getGoodsListApi } from '@/api/getGoodsLIst'
import { postGoodsUpdateApi } from '@/api/updateGoodsState'
import DrawerComp from '@/views/AppMain/AppProduct/GoodsList/components/DrawerComp.vue'
import { writeFile, utils } from 'xlsx'
import _ from 'lodash'
export default {
  data() {
    return {
      // 存放商品列表数据
      tableData: [],
      // 存储总的分类
      totalCategory: [],
      // 存储当前页页码
      currentPage: sessionStorage.getItem('currentPage')
        ? sessionStorage.getItem('currentPage') - 0
        : 1,
      // 存储当前选择的一页显示的商品数量
      pageSize: sessionStorage.getItem('pageSize') ? sessionStorage.getItem('pageSize') - 0 : 10,
      // 存储总体的数据条目数
      totalGoodsNum: -1,
      // 用于控制抽屉的状态
      isShow: false,
      // 存储点击详情时的商品id
      proid: ''
    }
  },
  components: {
    DrawerComp
  },
  watch: {
    tableData() {
      this.totalCategory = Array.from(new Set(this.tableData.map((item) => item.category))).map(
        (item) => {
          return { text: item, value: item }
        }
      )
    }
  },
  created() {
    // 发送请求获取商品列表
    this.getGoodsList()
  },
  methods: {
    // 获取商品列表函数
    async getGoodsList() {
      try {
        const res = await getGoodsListApi({ count: this.currentPage, limitNum: this.pageSize })
        this.tableData = res.data
        this.totalGoodsNum = res.total
      } catch (error) {
        console.log(error)
      }
    },
    // 切换分页数量
    handlerSizeChange(val) {
      this.pageSize = val
      sessionStorage.setItem('pageSize', val)
      this.getGoodsList()
    },
    // 切换当前页
    handlerCurrentChange(val) {
      this.currentPage = val
      sessionStorage.setItem('currentPage', val)
      this.getGoodsList()
    },
    // 切换秒杀状态
    async changeGoodsState(proid, type, flag) {
      await postGoodsUpdateApi({ proid, type, flag })
      this.getGoodsList()
    },
    // 查看详情函数
    learnAboutDetails(proid) {
      // 点击时, 展示抽屉
      this.isShow = true
      this.proid = proid
    },
    // 分类执行的回调函数
    handlerCategory(val, row, col) {
      const property = col['property']
      return row[property] === val
    },
    // 导出商品列表
    exportGoodsList() {
      // 整理导出数据
      const exportGoodsListData = _.cloneDeep(this.tableData)
      // 新建工作簿
      const workBook = utils.book_new()
      // 新建工作表, 并且指定表头
      const workSheet = utils.json_to_sheet([], {
        header: [
          'proname',
          'brand',
          'category',
          'originprice',
          'discount',
          'sales',
          'isseckill',
          'isrecommend'
        ]
      })
      // 将需要导出的数据插入到新建的工作表中
      utils.sheet_add_json(workSheet, exportGoodsListData, {
        header: [
          'proname',
          'brand',
          'category',
          'originprice',
          'discount',
          'sales',
          'isseckill',
          'isrecommend'
        ],
        skipHeader: true,
        origin: -1
      })
      // 将工作表插入工作簿中
      utils.book_append_sheet(workBook, workSheet, '商品信息')
      // 将表格输出为文件
      writeFile(workBook, '商品列表.xlsx')
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-image {
  height: 100px;
  overflow: hidden;
}
.pagination-container {
  margin: 15px 0;
  display: flex;
  justify-content: center;
}
</style>

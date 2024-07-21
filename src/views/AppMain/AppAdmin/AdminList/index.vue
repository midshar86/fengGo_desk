<template>
  <!-- 添加按钮 -->
  <el-button type="primary" @click="showDialog = true">添加管理员</el-button>
  <el-button type="primary" @click="exportAdminList">导出列表数据</el-button>
  <!-- 主要内容 -->
  <el-table
    :data="showAdminList"
    style="width: 100%"
    height="76vh"
    empty-text="没有数据"
    stripe
    :cell-style="{ textAlign: 'center' }"
    :header-cell-style="{ textAlign: 'center' }"
  >
    <el-table-column type="index" label="序号" width="80" />
    <el-table-column prop="adminname" label="管理员名称" width="100" />
    <el-table-column prop="adminid" label="管理员ID" />
    <el-table-column prop="role" label="管理员角色" width="120">
      <template #default="{ row }">
        <el-tag :type="row.role === 1 ? 'primary' : 'danger'">{{
          row.role === 1 ? '普通管理员' : '超级管理员'
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作" width="120">
      <template #default="{ row }">
        <el-popconfirm
          title="确定删除当前管理员?"
          confirm-button-text="确定"
          cancel-button-text="取消"
          confirm-button-type="danger"
          width="250"
          @confirm="confirmDelAdmin(row.adminid)"
        >
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页器 -->
  <!-- 由前端实现分页 -->
  <div class="admin-pager">
    <el-pagination
      background
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[15, 30]"
      layout="sizes, prev, pager, next, jumper"
      :total="adminList.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <!-- 弹出框 -->
  <AddAdmin v-model:showDialog="showDialog" @refresh="getAdminList"></AddAdmin>
</template>

<script>
import { getAdminListApi } from '@/api/getAdminList'
import AddAdmin from '@/views/AppMain/AppAdmin/AdminList/components/AddAdmin.vue'
import { postDelAdminApi } from '@/api/delAdmin'
import { utils, writeFile } from 'xlsx'
import _ from 'lodash'
export default {
  data() {
    return {
      // 存储管理员列表
      adminList: [],
      // 控制弹出窗的显示与隐藏效果
      showDialog: false,
      // 存储当前选中的页码
      currentPage: 1,
      // 存储当前每页显示的数据个数
      pageSize: 15
    }
  },
  computed: {
    // 定义计算属性计算当前界面渲染的数据
    showAdminList() {
      return this.adminList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
    }
  },
  components: {
    AddAdmin
  },
  created() {
    // 发送请求获取管理员列表
    this.getAdminList()
  },
  methods: {
    // 获取管理员列表
    async getAdminList() {
      try {
        const res = await getAdminListApi()
        this.adminList = res
      } catch (error) {
        console.log(error)
      }
    },
    // 确认删除管理员
    async confirmDelAdmin(id) {
      try {
        await postDelAdminApi({ adminid: id })
        // 刷新管理员列表
        this.getAdminList()
      } catch (error) {
        console.log(error)
      }
    },
    // 改变分页数量时触发
    handleSizeChange(val) {
      this.pageSize = val
    },
    // 改变当前点击页时触发
    handleCurrentChange(val) {
      this.currentPage = val
    },
    // 导出管理员列表
    exportAdminList() {
      // 整理导出数据
      const exportAdminList = _.cloneDeep(this.adminList)
      exportAdminList.forEach((item) => {
        delete item.checkedKeys
      })
      console.log(exportAdminList)
      // 新建工作簿
      const workBook = utils.book_new()
      // 新建工作表
      const workSheet = utils.json_to_sheet(exportAdminList)
      // 将工作表插入到工作簿中
      utils.book_append_sheet(workBook, workSheet, '管理员信息')
      // 写入文件
      writeFile(workBook, '管理员列表.xlsx')
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-pager {
  padding: 10px 0;
  display: flex;
  justify-content: center;
}
</style>

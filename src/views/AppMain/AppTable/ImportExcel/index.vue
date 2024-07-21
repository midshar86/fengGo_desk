<template>
  <!-- 上传按钮 -->
  <el-upload
    ref="upload"
    v-model:file-list="fileList"
    :limit="1"
    :http-request="uploadFile"
    class="upload-container"
    :on-exceed="handleExceed"
    :on-remove="handlerMove"
  >
    <el-button type="danger" class="confirm-upload" @click="confirmUpload">确认上传</el-button>
    <el-button type="warning" class="confirm-upload" @click="saveUploadData">保存数据</el-button>
    <el-button type="warning" class="confirm-upload" @click="clearUploadData">清除数据</el-button>
    <!-- 该插槽中的按钮用来触发弹出文件选择框 -->
    <template #trigger>
      <el-button type="primary">导入列表数据</el-button>
    </template>
    <template #tip>
      <div class="el-upload__tip">导入一个表格类型的文件</div>
    </template>
    <!-- 表格展示 -->
  </el-upload>
  <el-table
    :data="tableData"
    style="width: 100%"
    height="73vh"
    empty-text="没有数据"
    :row-style="
      () => {
        return { height: '60px' }
      }
    "
    :cell-style="
      () => {
        return { textAlign: 'center' }
      }
    "
    :header-cell-style="
      () => {
        return { textAlign: 'center' }
      }
    "
  >
    <el-table-column type="index" label="序号" width="80" />
    <el-table-column label="名称">
      <template #default="{ row }">
        <el-tooltip effect="dark" :content="row.proname" placement="top" class="tool-tip">
          <el-text line-clamp="1">{{ row.proname }}</el-text>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="brand" label="品牌" width="100" />
    <el-table-column prop="category" label="分类" width="100" />
    <el-table-column prop="originprice" label="原价" width="100" />
    <el-table-column prop="discount" label="折扣" width="80" />
    <el-table-column prop="sales" label="销量" width="120" />
    <el-table-column prop="isseckill" label="是否秒杀" width="100" />
    <el-table-column prop="isrecommend" label="是否推荐" width="100" />
  </el-table>
  <!-- 弹出框 -->
  <el-dialog v-model="dialogVisible" title="警告!!!" width="500" center align-center>
    <span>将不会保留数据, 确认离开吗?</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handlerConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage, genFileId } from 'element-plus'
import { handlerReadFile } from '@/utils/UploadTableFile'
export default {
  data() {
    return {
      // 存储列表渲染数据
      tableData: JSON.parse(localStorage.getItem('upload')) || [],
      // 存储成功读取后的json文件数据
      tempFileDate: [],
      // 存储上传文件
      fileList: [],
      dialogVisible: false,
      nextJump: null
    }
  },
  methods: {
    // 文件上传
    uploadFile({ file }) {
      // 限制文件类型
      const fileType = ['xlsx', 'xls', 'xlsm', 'xlsb']
      // 从上传文件的扩展名中截取文件类型
      const uploadFileNameArray = file.name.split('.')
      const uploadFileType = uploadFileNameArray[uploadFileNameArray.length - 1]
      if (fileType.includes(uploadFileType)) {
        // 上传的文件是表格类型
        handlerReadFile(file)
          .then((val) => {
            this.tempFileDate = val
          })
          .catch((err) => console.log(err))
      } else {
        // 上传的文件不是表格类型
        ElMessage.error('请上传表格类型的文件, 如 .xlsx/.xls/.xlsm/.xlsb')
        return
      }
    },
    // 确认上传
    confirmUpload() {
      if (this.tempFileDate.length) {
        this.tableData = this.tempFileDate
        ElMessage.success('数据提交成功!')
      }
    },
    // 覆盖前一个文件
    handleExceed(files) {
      // 清空文件
      this.$refs.upload.clearFiles()
      const file = files[0]
      // 更换文件id
      file.uid = genFileId()
      this.$refs.upload.handleStart(file)
      // 当文件被覆盖后调用uploadFile再次处理逻辑
      this.uploadFile({ file })
    },
    // 移除文件列表
    handlerMove() {
      // 清空已存储的文件数据
      this.fileList = []
      this.tempFileDate = []
    },
    // 确认操作
    handlerConfirm() {
      // 当点击确认时, 在外部使用next完成路由跳转
      this.dialogVisible = false
      this.nextJump()
    },
    // 保存数据
    saveUploadData() {
      if (this.tableData.length) {
        localStorage.setItem('upload', JSON.stringify(this.tableData))
        ElMessage.success('数据保存成功!')
      }
    },
    // 清除导入数据
    clearUploadData() {
      if (JSON.parse(localStorage.getItem('upload'))?.length) {
        // 清空data存储的数据
        this.handlerMove()
        this.tableData = []
        // 清空本地存储的数据
        localStorage.removeItem('upload')
        ElMessage.error('数据已清除!')
      }
    }
  },
  // 在离开当前页面之前, 如果用户未保存数据, 将会显示提示消息
  beforeRouteLeave(to, from, next) {
    if (this.tableData.length && !localStorage.getItem('upload')) {
      // 我需要在路由钩子函数外部使用next方法
      this.nextJump = next
      this.dialogVisible = true
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-tip {
  width: 300px;
}

.el-upload__tip {
  color: #aaa;
}
:deep(.el-upload-list__item-file-name) {
  padding: 5px 0;
}
.confirm-upload {
  margin-left: 20px;
  position: relative;
  bottom: 1.5px;
}
</style>

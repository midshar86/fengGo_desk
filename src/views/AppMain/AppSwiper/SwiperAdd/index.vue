<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 60%"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="80px"
  >
    <!-- alt栏 -->
    <el-form-item label="Alt" prop="alt">
      <el-input v-model="ruleForm.alt" type="text" autocomplete="off" />
    </el-form-item>
    <!-- link栏 -->
    <el-form-item label="Link" prop="link">
      <el-input v-model="ruleForm.link" type="text" autocomplete="off" />
    </el-form-item>

    <!-- 图片栏 -->
    <el-form-item label="Img" class="img-item" prop="imgLoader">
      <el-upload
        class="img-uploader"
        :disabled="isDisabled"
        :show-file-list="false"
        :http-request="beforeImgUpload"
      >
        <div class="img-container" v-if="imageUrl" @mouseenter="handlerMouseenter">
          <img :src="imageUrl" width="150px" height="150px" />
          <div class="mask">
            <el-icon size="20" color="white" @click="delImage"><Delete /></el-icon>
          </div>
        </div>
        <el-icon v-else class="img-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>

    <!-- base64栏 -->
    <el-form-item label="Base64">
      <el-input
        class="textarea"
        type="textarea"
        disabled
        placeholder="上传图片后自动获取"
        v-model="ruleForm.img"
        :autosize="{ minRows: 4, maxRows: 6 }"
      />
    </el-form-item>

    <!-- 按钮栏 -->
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleFormRef')"> 上传 </el-button>
      <el-button @click="resetForm('ruleFormRef')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { postAddSwiperItemApi } from '@/api/addSwiperItem'
export default {
  data() {
    // 设置规则验证函数
    const checkAlt = (rule, value, callback) => {
      if (value === '') {
        const timer = setTimeout(() => {
          clearTimeout(timer)
          return callback('输入不能为空!')
        }, 500)
      } else {
        callback()
      }
    }
    // 设置规则验证函数
    const checkLink = (rule, value, callback) => {
      if (value === '') {
        const timer = setTimeout(() => {
          clearTimeout(timer)
          return callback('输入不能为空！')
        }, 500)
      } else {
        callback()
      }
    }
    // 设置规则验证函数
    const checkImgLoader = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback('上传图片不能为空!')
      }
    }
    return {
      // 表单数据对象
      ruleForm: {
        alt: '',
        link: '',
        // 存储base64数据
        img: '',
        imgLoader: ''
      },
      // 规则集
      rules: {
        // 表格单的prop绑定需要与表单数据对象中的属性一致
        alt: [{ required: true, trigger: 'blur', validator: checkAlt }],
        link: [{ required: true, trigger: 'blur', validator: checkLink }],
        imgLoader: [{ required: true, trigger: 'change', validator: checkImgLoader }]
      },
      // 存储图片路径
      imageUrl: '',
      // 是否禁用上传功能
      isDisabled: false,
      ruleFormRef: ''
    }
  },
  components: {
    // 引入icon图标
    Plus,
    Delete
  },
  methods: {
    // 提交
    submitForm(formInstance) {
      this.$refs[formInstance].validate(async (valid) => {
        if (valid) {
          const postParam = {
            alt: this.ruleForm.alt,
            link: this.ruleForm.link,
            img: this.ruleForm.img
          }
          // 发送请求添加图片
          await postAddSwiperItemApi(postParam)
        } else {
          return false
        }
      })
    },
    // 重置
    resetForm(formInstance) {
      this.$refs[formInstance].resetFields()
    },
    getImgBase64(file) {
      return new Promise((resolve, reject) => {
        // 用来存储读取后的文件数据
        let fileRes = ''
        let newFile = new FileReader()
        // 读取文件
        newFile.readAsDataURL(file)
        // 读取文件成功
        newFile.onload = () => {
          fileRes = newFile.result
        }
        // 读取失败
        newFile.onerror = (err) => {
          reject(err)
        }
        // 读取结束后
        newFile.onloadend = () => {
          resolve(fileRes)
        }
      })
    },
    // 在上传图片时作处理
    beforeImgUpload(fileInfo) {
      // 接收一个参数, 参数中的file属性是文件的信息
      // 设置上传文件限制条件
      const limitSize = fileInfo.file.size / 1024 / 1024 < 5
      const limitFileType = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/bmp'
      ].includes(fileInfo.file.type)
      if (limitSize && limitFileType) {
        // 满足限制条件, 执行上传
        const fileURL = URL.createObjectURL(fileInfo.file)
        this.imageUrl = fileURL
        // 将解析后的图片链接存入变量
        this.ruleForm.imgLoader = fileURL

        // 读取文件是异步操作
        this.getImgBase64(fileInfo.file)
          .then((res) => {
            this.ruleForm.img = res
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        if (!limitSize) {
          // 如果不满足限制大小
          ElMessage.error('上传文件的大小不能大于5MB!')
          // 失败时返回一个promise类型的错误
          return false
        }
        if (!limitFileType) {
          ElMessage.error('仅支持.jpg/.jpeg/.png/.bmp/.gif格式的图片文件!')
          // 失败时返回一个promise类型的错误
          return false
        }
      }
    },
    // 当图片上传成功后, 出现蒙版, 此时上传不可用
    handlerMouseenter() {
      this.isDisabled = true
    },
    // 删除当前上传的图片
    delImage() {
      this.imageUrl = ''
      this.ruleForm.img = ''
      this.ruleForm.imgLoader = ''
      const timer = setTimeout(() => {
        this.isDisabled = false
        clearTimeout(timer)
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.img-uploader-icon {
  width: 150px;
  height: 150px;
  background-color: #eee;
  border-radius: 10px;
}
.img-container {
  position: relative;
  width: 150px;
  height: 150px;
  &:hover {
    .mask {
      opacity: 1;
      transition: opacity 0.3s;
      .el-icon {
        cursor: pointer;
      }
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    cursor: default;
    transition: opacity 0.3s;
  }
}
:deep(.el-textarea__inner) {
  overflow-x: hidden;
}
</style>

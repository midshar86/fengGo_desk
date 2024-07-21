<template>
  <div class="app-login">
    <el-card style="width: 600px" shadow="hover" class="login-container">
      <template #header>
        <span class="login-box-header">锋购后台管理系统</span>
      </template>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密&emsp;码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <!-- 登录与重置按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleFormRef')"> 登录 </el-button>
          <el-button @click="resetForm('ruleFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    // 校验规则函数
    const validateUsername = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('用户名不能为空！'))
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('密码不能为空！'))
      }
    }
    return {
      // 表单数据对象
      ruleForm: {
        username: '',
        password: ''
      },
      // 定义校验规则
      rules: {
        // 当输入框失去焦点时触发校验
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions('user', ['handlerUserLogin']),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        // 如果验证成功
        if (valid) {
          // 调用actions方法
          this.handlerUserLogin(this.ruleForm)
          return true
        } else {
          // 如果验证失败
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/img/background.jpg');
  background-size: cover;
  .login-container {
    background-color: #a2bfe1ad;
    border: none;
    .login-box-header {
      font-size: 24px;
      font-weight: bold;
      font-style: italic;
      color: #006d5b;
    }
  }
}
.el-card {
  --el-card-border-color: #ccc;
}
</style>

<template>
  <el-dialog :modelValue="showDialog" title="添加管理员" width="500" @closed="handlerClose">
    <!-- 行内表单 -->
    <el-form
      ref="adminInfo"
      :inline="true"
      :model="adminInfo"
      class="admin-form"
      style="max-height: 300px"
      :rules="rules"
    >
      <!-- 名称栏 -->
      <el-form-item label="管理员名称" prop="adminname">
        <el-input v-model="adminInfo.adminname" placeholder="请输入管理员名称" clearable />
      </el-form-item>
      <!-- 密码栏 -->
      <el-form-item label="管理员密码" prop="password">
        <el-input v-model="adminInfo.password" placeholder="请输入管理员密码" clearable />
      </el-form-item>
      <!-- 角色栏 -->
      <el-form-item label="管理员角色" prop="role">
        <el-radio-group v-model="adminInfo.role">
          <el-radio :value="1">普通管理员</el-radio>
          <el-radio :value="2">超级管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 权限栏 -->
      <el-form-item label="管理员权限" prop="checkedKeys">
        <!-- 添加滚动条 -->
        <!-- <el-scrollbar native> -->
        <!-- 使用树形控件 -->
        <el-tree
          style="width: 200px; height: 150px; overflow-x: hidden"
          ref="adminLimits"
          :props="props"
          :data="treeData"
          show-checkbox
          node-key="name"
          :default-expand-all="false"
        />
        <!-- </el-scrollbar> -->
      </el-form-item>
    </el-form>
    <!-- 底部按钮 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelSubmit">取消</el-button>
        <el-button type="primary" @click="submitAdimnData">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { routes } from '@/router'
import { mapRoutes } from '@/utils/AutoNavibar'
import { postAddAdminApi } from '@/api/addAdmin'
export default {
  // 接收父组件的控制弹窗属性
  props: ['showDialog'],
  data() {
    return {
      // 表单数据对象
      adminInfo: {
        adminname: '',
        password: '',
        role: 1,
        checkedKeys: []
      },
      // 获取树形控件的原始数据, 通过定义的路由数据加工而来
      treeData: mapRoutes(routes),
      // 定义属性空间的显示属性
      props: {
        label: 'title',
        children: 'items'
      },
      // 校验规则
      rules: {
        adminname: [{ required: true, trigger: 'blur', message: '管理员名称不能为空!' }],
        password: [{ required: true, trigger: 'blur', message: '管理员密码不能为空!' }],
        role: [{ required: true }],
        checkedKeys: [{ required: true, message: '必须选择管理员权限!' }]
      }
    }
  },
  methods: {
    // 收起树形控件中的所有节点
    closeAllTreeNodes() {
      // 获取所有的节点
      const allTreeNodes = this.$refs.adminLimits.store.nodesMap
      // 遍历所有节点
      for (let node in allTreeNodes) {
        // 修改相关属性
        allTreeNodes[node].expanded = false
        allTreeNodes[node].isCurrent = false
      }
    },
    // 关闭弹窗时的回调函数
    handlerClose() {
      // 调用方法清空表单数据
      // 清空表单中的输入框数据
      this.$refs.adminInfo.resetFields()
      // 清空树形选择器
      this.$refs.adminLimits.setCheckedKeys([], false)
      // 收起所有树形控件中的节点
      this.closeAllTreeNodes()
      // 触发父组件showDialog为false, 关闭弹窗
      this.$emit('update:showDialog', false)
    },
    // 提交管理员信息
    submitAdimnData() {
      // 获取树形控件中的checkedKeys信息
      const treeData = this.$refs.adminLimits.getCheckedKeys(false)
      this.adminInfo.checkedKeys = treeData

      // 检验是否通过验证
      this.$refs.adminInfo.validate(async (valid) => {
        if (valid) {
          console.log(this.adminInfo)
          try {
            await postAddAdminApi(this.adminInfo)
            // 调用父组件方法重新获取管理员列表
            this.$emit('refresh')
            // 关闭弹窗
            this.$emit('update:showDialog', false)
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log('表单提交失败!')
        }
      })
    },
    // 点击取消按钮取消提交
    cancelSubmit() {
      // 关闭弹窗
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog {
  .admin-form {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    & > div {
      width: 350px;
    }
  }
}
// 设置原生滚动条样式
::-webkit-scrollbar {
  position: absolute;
  right: 0;
  width: 5px;
}
::-webkit-scrollbar-track {
  background-color: #eee;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #ccc;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #aaa;
}
</style>

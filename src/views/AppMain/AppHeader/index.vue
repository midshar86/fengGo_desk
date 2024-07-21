<template>
  <!-- 顶部导航 -->
  <el-header style="text-align: right; font-size: 12px" class="app-header">
    <div class="header-title">
      <span>锋购后台管理系统</span>
    </div>
    <div class="toolbar">
      <el-dropdown>
        <el-icon style="margin-right: 8px; margin-top: 1px; color: #f2e9e4">
          <setting />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="userLoginout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span>{{ userinfo.adminname }}</span>
    </div>
  </el-header>
</template>

<script>
import { Setting } from '@element-plus/icons-vue'
import { mapMutations, mapState } from 'vuex'
import { CLEAR_USERINFO } from '@/store/modules/user/methodsName'
export default {
  components: {
    Setting
  },
  computed: {
    ...mapState('user', ['userinfo'])
  },
  methods: {
    ...mapMutations('user', [CLEAR_USERINFO]),
    // 点击退出时清空用户信息
    userLoginout() {
      this.CLEAR_USERINFO()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  background-color: #008080;
  display: flex;
  justify-content: space-between;
  .header-title {
    line-height: 60px;
    font-size: 20px;
    font-weight: bold;
    color: #eee;
    flex: 1;
    text-align: center;
  }
  .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
    font-size: 20px;
    color: #f2e9e4;
    .el-dropdown {
      font-size: 20px;
      .el-icon {
        // 取消当鼠标聚焦到icon图标上时显示outline
        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>

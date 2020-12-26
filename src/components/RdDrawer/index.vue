<template>
  <div class="drawer-form-box">
    <el-drawer
      :title="title"
      :visible.sync="visible"
      :before-close="beforeClose"
      :destroy-on-close="true"
      direction="rtl"
      :size="size">
      <div class="drawer-content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="沟通动态" name="second">
            <communicationdynamics-table></communicationdynamics-table>
          </el-tab-pane>
          <el-tab-pane label="日志记录" name="first">
            <diaryrecords-table></diaryrecords-table>
          </el-tab-pane>
          <el-tab-pane label="手机外呼" name="third">
            <callout-table></callout-table>
          </el-tab-pane>
          <el-tab-pane label="总部外呼" name="fourth">
            <qimocall-table></qimocall-table>
          </el-tab-pane>
          <el-tab-pane label="小号外呼" name="five">
            <qimomincall-table></qimomincall-table>
          </el-tab-pane>
          <el-tab-pane label="分校外呼" name="six">
            <branchcall-table></branchcall-table>
          </el-tab-pane>
          <el-tab-pane label="AI通话" name="seven">
            <aicall-table></aicall-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import aicallTable from './aicall-table';
import branchcallTable from './branchcall-table';
import calloutTable from './callout-table';
import communicationdynamicsTable from './communicationdynamics-table';
import diaryrecordsTable from './diaryrecords-table';
import qimocallTable from './qimocall-table';
import qimomincallTable from './qimomincall-table';
export default {
  name: 'RdDrawer',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '暂无'
    },
    size: {
      type: String,
      default: '50%'
    }
  },
  components: {
    aicallTable,
    branchcallTable,
    calloutTable,
    communicationdynamicsTable,
    diaryrecordsTable,
    qimocallTable,
    qimomincallTable
  },
  data () {
    return {
      visible: this.dialogVisible,
      activeName: 'second',
    }
  },
  watch: {
    dialogVisible(newVal){
      this.visible = newVal;
    }
  },
  mounted () {
    
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    beforeClose(){
      this.$emit('handleClose',false)
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-form-box {
  .drawer-content {
    padding: 0 30px 0 30px;
  }
  /deep/ {
    .el-drawer__header {
      padding: 20px 30px 0;
      margin-bottom: 10px;
      span,.el-drawer__close-btn {
        &:focus {
          outline: none;
        }
      }
      
    }
    .el-drawer.rtl {
      top: 150px;
      // height: 70%;
    }
  }
}
</style>
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
          <el-tab-pane label="沟通动态" name="second">沟通动态</el-tab-pane>
          <el-tab-pane label="日志记录" name="first">日志记录</el-tab-pane>
          <el-tab-pane label="手机外呼" name="third">手机外呼</el-tab-pane>
          <el-tab-pane label="总部外呼" name="fourth">总部外呼</el-tab-pane>
          <el-tab-pane label="小号外呼" name="five">小号外呼</el-tab-pane>
          <el-tab-pane label="分校外呼" name="six">分校外呼</el-tab-pane>
          <el-tab-pane label="AI通话" name="seven">AI通话</el-tab-pane>
        </el-tabs>
        <el-table :data="gridData">
          <el-table-column property="date" label="日期" width="150"></el-table-column>
          <el-table-column property="name" label="姓名" width="200"></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
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
  data () {
    return {
      visible: this.dialogVisible,
      activeName: 'second',

      
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, 
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, 
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
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
      console.log(tab, event);
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
    padding: 0 60px 0 30px;
  }
  /deep/ {
    .el-drawer__header {
      padding: 20px 30px 0;
      margin-bottom: 10px;
    }
    .el-drawer.rtl {
      top: 200px;
      height: 70%;
    }
  }
}
</style>
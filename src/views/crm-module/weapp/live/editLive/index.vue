<template>
  <div class="edit-live">
      <el-tabs :tab-position="'left'">
            <el-tab-pane label="直播基本信息">
                <editForm/>
            </el-tab-pane>
            <el-tab-pane label="分享设置">
                <share/>
            </el-tab-pane>
            <el-tab-pane label="互动设置">
                <interaction/>
            </el-tab-pane>
            <el-tab-pane label="数据分析">
                <analysis/>
            </el-tab-pane>
        </el-tabs>
  </div>
</template>

<script>
import editForm from './editForm';
import share from './share';
import interaction from './interaction';
import analysis from './analysis';
export default {
  name:"temp",
  data(){
    return {
    }
  },
  components:{
      editForm,
      share,
      interaction,
      analysis
  },
   methods: {
  }
}
</script>

<style lang="scss" scoped>
.edit-live {
    /deep/ {
        .el-tabs--left .el-tabs__header.is-left {
            height: 900px;
        }
    }
}
</style>

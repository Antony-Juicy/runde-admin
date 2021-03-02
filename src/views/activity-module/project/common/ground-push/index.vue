<template>
  <div class="groundpush-container">
    <div class="w-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="优惠券领取管理" name="first">
          <Manage ref="Manage"></Manage>
        </el-tab-pane>
        <el-tab-pane label="优惠券领取统计" name="second">
          <Count ref="Count"></Count>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Manage from "./manage";
import Count from "./count";
export default {
  name:"post-manage",
  components:{
    Manage,
    Count
  },
  data(){
    return {
      activeName: "first",
      tabIndex: "0",
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.index, "click");
      // this.tabIndex = tab.index;
      if(tab.index == 0){
        this.$refs.Manage.getTableData();
      }else if(tab.index == 1){
        this.$refs.Count.getTableData();
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.groundpush-container {
  .top-total {
    // padding-bottom: 4px;
  }
}
</style>

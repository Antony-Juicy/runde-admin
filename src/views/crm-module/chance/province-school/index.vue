<template>
  <div class="province-school w-container">
     <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="主线公海" name="first">
          <primaryLine/>
        </el-tab-pane>
        <el-tab-pane label="支线公海" name="second">
          <branchLine/>
        </el-tab-pane>
      </el-tabs> 
  </div>
</template>

<script>
import primaryLine from './primaryLine'
import branchLine from './branchLine'
export default {
  name:"province-school",
  data(){
    return { 
      activeName:"first"
    }
  },
  components:{
    primaryLine,
    branchLine
  },
   methods: {
     handleClick(){

     }
  }
}
</script>

<style lang="scss" scoped>

</style>

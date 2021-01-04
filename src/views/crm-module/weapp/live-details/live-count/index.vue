<template>
  <div class="livecount-container">
    直播明细
    <div class="card-wrapper">
      <el-row :gutter="12">
        <el-col :span="4" v-for="item in 5" :key="item">
          <el-card shadow="hover">
            <div class="call-total">
              <div class="call-title">总直播场次</div>
              <div class="call-content">0</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name:"live-count",
  data(){
    return {

    }
  },
   methods: {
     
  }
}
</script>

<style lang="scss" scoped>
.livecount-container {

}
</style>

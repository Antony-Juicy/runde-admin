<template>
  <div class="team-work">
    <div class="team-work-top">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-card shadow="hover">
            总是显示
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            鼠标悬浮时显示
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            从不显示
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
           <el-progress :text-inside="true" :stroke-width="20" :percentage="70"></el-progress>
          </el-card>
        </el-col>
        </el-row>
    </div>
      <search-form
        :formOptions="formOptions"
        :showNum="7"
        @onSearch="onSearch"
        ref="dataForm2"
      ></search-form>
      <div class="w-container">
        <div class="complete">
          <div class="complete-top">
            <div class="complete-title">完成情况</div>
            <div class="complete-dimension">
              <div :class="{'dimension-item':true, 'current-item': currentItem == 0}"  @click="clickTab">今日</div>
              <div :class="{'dimension-item':true, 'current-item': currentItem == 1}"  @click="clickTab">本周</div>
              <div :class="{'dimension-item':true, 'current-item': currentItem == 2}"  @click="clickTab">本月</div>
              <div :class="{'dimension-item':true, 'current-item': currentItem == 3}"  @click="clickTab">全年</div>
              <!-- <div class="dimension-item">本周</div>
              <div class="dimension-item">本月</div>
              <div class="dimension-item">全年</div> -->
            </div>
        </div>
        <div id="chain-bar"></div>
        </div>
      </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name:"team-work",
  data(){
    return {
      currentItem: 1,
      chart: null,
      formOptions: [
         {
          prop: "organizationId",
          element: "el-select",
          placeholder: "所属组织",
          options: [],
          events: {}
        },
        {
          prop: "provincialSchoolId",
          element: "el-select",
          placeholder: "所属校区",
          options: [],
          events: {}
        },
        {
          prop: "branchSchoolId",
          element: "el-select",
          placeholder: "所属分校",
          options: [],
          events: {}
        },
      ],
      searchForm: {},
      organizationArr: [],
      provincialSchoolArr:[],
      branchSchoolArr: []
    }
  },
  mounted(){
    this.getSelectList();
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
   methods: {
     initChart(){
       this.chart = echarts.init(document.querySelector("#chain-bar"));
       this.chart.setOption({
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar',
              barWidth: 40,
              itemStyle:{
              normal:{
                  color: '#409eff'
              }
          },
          }],
          
        });
     },
     onSearch(val){
       this.searchForm = {
          ...val
        };
     },
     getSelectList(){
       this.$fetch("chain_getCampusList",{
         parentId: 0
       }).then(res => {
         this.organizationArr = res.data.map(item => ({
           label: item.campusName,
           value: item.campusId
         }));
         this.formOptions[0].options = this.organizationArr;
         this.formOptions[0].events = {
           change: this.organizationChange
         }
       })
     },
      organizationChange(val){
       this.$fetch("chain_getCampusList",{
         parentId: val
       }).then(res => {
         this.provincialSchoolArr = res.data.map(item => ({
           label: item.campusName,
           value: item.campusId
         }));
         this.formOptions[1].options = this.provincialSchoolArr;
         this.formOptions[1].events = {
           change: this.provincialSchoolChange
         }
        //  清除下级的数据和值
          this.$refs.dataForm2.setValue({
              provincialSchoolId:'',
              branchSchoolId:'',
          })
       })
     },
     provincialSchoolChange(val){
      this.$fetch("chain_getCampusList",{
         parentId: val
       }).then(res => {
         this.branchSchoolArr = res.data.map(item => ({
           label: item.campusName,
           value: item.campusId
         }));
         this.formOptions[2].options = this.branchSchoolArr;
        //  this.formOptions[2].events = {
        //    change: this.branchSchoolChange
        //  }
         //  清除下级的数据和值
          this.$refs.dataForm2.setValue({
              branchSchoolId:'',
          })
       })
     },
  }
}
</script>

<style lang="scss" scoped>
.team-work {
  .team-work-top {
    margin-bottom: 12px;
  }
  .complete {
    width: 70%;
    #chain-bar {
      width: 100%;
      height: 300px;
    }
    .complete-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .complete-dimension {
        display: flex;
        .dimension-item {
          cursor: pointer;
          margin-right: 8px;
        }
        .current-item {
          color: #409eff;
        }
      }
    }
  }
  
}
</style>

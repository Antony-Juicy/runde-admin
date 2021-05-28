<template>
  <div class="team-work">
    <div class="team-work-top">
      <el-row :gutter="22">
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="pane-item" @click="showDayWork">
              <div class="total-info">
                <div class="total-info-top">
                  <img src="@/assets/icon/jinri.png" alt="" class="task-img">
                  <div class="task">
                    <div class="task-title">今日任务</div>
                    <div class="task-num">8846</div>
                  </div>
                </div>
                <div class="total-info-bottom">
                  <div class="already-complete">已完成：4423</div>
                  <div class="wait-complete">待完成：4423</div>
                </div>
              </div>
              <div class="complete-rate">
                完成率：50%
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="pane-item" @click="showWeekWork">
              <div class="total-info">
                <div class="total-info-top">
                  <img src="@/assets/icon/benzhou.png" alt="" class="task-img">
                  <div class="task">
                    <div class="task-title">本周任务</div>
                    <div class="task-num">8846</div>
                  </div>
                </div>
                <div class="total-info-bottom">
                  <div class="already-complete">已完成：4423</div>
                  <div class="wait-complete">待完成：4423</div>
                </div>
              </div>
              <div class="complete-rate">
                完成率：50%
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="pane-item" @click="showOverdueWork">
              <div class="total-info" >
                <div class="total-info-top">
                  <img src="@/assets/icon/yuqi.png" alt="" class="task-img">
                  <div class="task">
                    <div class="task-title">逾期任务</div>
                    <div class="task-num">8846</div>
                  </div>
                </div>
                <!-- <div class="total-info-bottom">
                  <div class="already-complete">已完成：4423</div>
                  <div class="wait-complete">待完成：4423</div>
                </div> -->
                <div style="margin-top: 23px;"></div>
              </div>
              <div class="complete-rate">
                <div class="rate-item">
                  <div class="rate-title">门店：</div>
                  <div class="rate-num"> 50%</div>
                </div>
                <div class="rate-item">
                  <div class="rate-title">连锁：</div>
                  <div class="rate-num"> 50%</div>
                </div>
                <div class="rate-item">
                  <div class="rate-title">生产：</div>
                  <div class="rate-num"> 50%</div>
                </div>
                <div class="rate-item">
                  <div class="rate-title">批发：</div>
                  <div class="rate-num"> 50%</div>
                </div>
              </div>
            </div>
           <!-- <el-progress :text-inside="true" :stroke-width="20" :percentage="70"></el-progress> -->
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="pane-item" @click="rankVisible = true">
              <div class="total-info" style="    padding-bottom: 18px;">
                <div class="total-info-top">
                  <img src="@/assets/icon/wancheng.png" alt="" class="task-img">
                  <div class="task">
                    <div class="task-title">本周完成率</div>
                    <div class="task-num">50%</div>
                  </div>
                </div>
                <div class="line-container">
                  <!-- <div class="already-complete">已完成：4423</div>
                  <div class="wait-complete">待完成：4423</div> -->
                  <el-progress :text-inside="true" :stroke-width="20" :percentage="70"></el-progress>
                </div>
              </div>
              <div class="complete-rate">
                <div class="rate-item">
                  <div class="rate-title">门店：</div>
                  <div class="rate-num"> 50%</div>
                </div>
                <div class="rate-item">
                  <div class="rate-title">连锁：</div>
                  <div class="rate-num"> 50%</div>
                </div>
                <div class="rate-item">
                  <div class="rate-title">生产：</div>
                  <div class="rate-num"> 50%</div>
                </div>
                <div class="rate-item">
                  <div class="rate-title">批发：</div>
                  <div class="rate-num"> 50%</div>
                </div>
              </div>
            </div>
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
              <div :class="{'dimension-item':true, 'current-item': currentItem == 0}"  @click="clickTab(0)">今日</div>
              <div :class="{'dimension-item':true, 'current-item': currentItem == 1}"  @click="clickTab(1)">本周</div>
              <div :class="{'dimension-item':true, 'current-item': currentItem == 2}"  @click="clickTab(2)">本月</div>
              <div :class="{'dimension-item':true, 'current-item': currentItem == 3}"  @click="clickTab(3)">全年</div>
              <!-- <div class="dimension-item">本周</div>
              <div class="dimension-item">本月</div>
              <div class="dimension-item">全年</div> -->
            </div>
        </div>
        <div id="chain-bar"></div>
        </div>
        <div class="visit-rank">
          <div style="display:flex;justify-content:space-between;"><div class="complete-title">拜访排名</div><div class="view-more">更多></div></div>
          <div class="rank-content">
            <div class="rank-item">
              <div class="rank-index"></div>
              <div class="rank-num" style="cursor:pointer">数量<i class="el-icon-d-caret"></i></div>
              <div class="rank-rate" style="cursor:pointer">比例<i class="el-icon-d-caret"></i></div>
            </div>
            <div class="rank-item" v-for="item in 7" :key="item">
              <div class="rank-index"><span :class="{'rank-index-left':true,'rank-index-top': item == 1 || item == 2 || item == 3 }">{{item}}</span><span>广东校区</span></div>
              <div class="rank-num">324,389</div>
              <div class="rank-rate">100%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 今日任务 -->
      <full-dialog
        v-model="dayVisible"
        :title="dialogTitle"
        @change="dayVisible = false"
      >
        <dailyWork :mode="mode" v-if="dayVisible"/>
      </full-dialog>

      <!-- 排名统计 -->
      <full-dialog
        v-model="rankVisible"
        :title="'排名统计'"
        @change="rankVisible = false"
      >
        <rankStatics  v-if="rankVisible"/>
      </full-dialog>

  </div>
</template>

<script>
import echarts from 'echarts'
import dailyWork from './daily-work'
import rankStatics from './rank-statics'
export default {
  name:"team-work",
  data(){
    return {
      rankVisible: false,
      dialogTitle:'今日任务',
      mode:'day',
      weekVisible:false,
      dayVisible: false,
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
  components: {
    dailyWork,
    rankStatics
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

        window.addEventListener("resize",  ()=> {
          this.chart.resize();
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
     clickTab(index){
       this.currentItem = index;
     },
     showDayWork(){
       this.dayVisible = true;
       this.mode = 'day';
       this.dialogTitle = '今日任务';
     },
     showWeekWork(){
       this.dayVisible = true;
       this.mode = 'week';
       this.dialogTitle = '本周任务';
     },
     showOverdueWork(){
        this.dayVisible = true;
       this.mode = 'overdue';
       this.dialogTitle = '逾期任务';
     }
  }
}
</script>

<style lang="scss" scoped>
.team-work {
  .team-work-top {
    /deep/{
      .el-card__body {
        padding: 0;
        border-radius: 14px;
      }
    }
    margin-bottom: 12px;
    .pane-item {
      height: 220px;
      border-radius: 14px;
      cursor: pointer;
      .line-container {
        margin-top: 18px;
      }
      .total-info {
        padding: 33px;
        border-bottom: 1px dashed #999999;
        .total-info-top {
          display: flex;
          align-items: center;
          
          .task-img {
            width: 56px;
            height: 56px;
            margin-right: 20px;
          }
          .task {
            color: #333333;
            .task-title {
              font-size: 18px;
            }
            .task-num {
              font-size: 28px;
              margin-top: 6px;
            }
          }
        }
        .total-info-bottom {
          display: flex;
          justify-content: space-between;
          margin: 20px 0 0 0;
          color: #999999;
          // border-bottom: 1px dashed #999999;
        }
      }
      .complete-rate {
        padding: 22px 33px 0 33px;
        color: #666666;
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .w-container{
    padding: 28px;
    display: flex;
    justify-content: space-between;
  }
  .complete {
    width: 65%;
    #chain-bar {
      width: 100%;
      height: 400px;
    }
    .complete-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .complete-title {
        color: #333;
        font-size: 18px;
        font-weight: bold;
      }
      .complete-dimension {
        display: flex;
        margin-right: 20px;
        .dimension-item {
          cursor: pointer;
          margin-right: 28px;
        }
        .current-item {
          color: #409eff;
        }
      }
    }
  }
  .visit-rank{
    width: 26%;
    margin-right: 4%;
    .view-more {
      cursor: pointer;
    }
    .complete-title {
        color: #333;
        font-size: 18px;
        font-weight: bold;
    }
    .rank-content {
      .rank-item {
        display: flex;
        justify-content: space-between;
        margin-top: 28px;
        .rank-index {
          width: 120px;
          text-align: center;
          display: flex;
          align-items: center;
          .rank-index-left {
            display: inline-block;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: #A7ADB4;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            margin-right: 5px;
          }
          .rank-index-top {
            background-color: #408AFF;
          }
        }
        .rank-num {
          width: 80px;
           text-align: center;
        }
        .rank-rate {
          width: 80px;
           text-align: center;
        }
      }
    }
  }
}
</style>

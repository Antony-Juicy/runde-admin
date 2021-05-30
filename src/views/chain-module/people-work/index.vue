<template>
  <div class="people-work">
    <div class="people-work-top">
      <el-row :gutter="22">
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="pane-item" @click="showDayWork">
              <div class="total-info">
                <div class="total-info-top">
                  <img src="@/assets/icon/jinri.png" alt="" class="task-img">
                  <div class="task">
                    <div class="task-title">今日任务</div>
                    <div class="task-num">{{todayTask.totalTaskCount}}</div>
                  </div>
                </div>
                <div class="total-info-bottom">
                  <div class="already-complete">已完成：{{todayTask.completeCount}}</div>
                  <div class="wait-complete">待完成：{{todayTask.unfinishedCount}}</div>
                  <div class="wait-complete">逾期：{{todayTask.overdueCount}}</div>
                </div>
              </div>
              <div class="complete-rate">
                完成率：{{todayTask.completePercentage}}%
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
                    <div class="task-num">{{weekTask.totalTaskCount}}</div>
                  </div>
                </div>
                <div class="total-info-bottom">
                  <div class="already-complete">已完成：{{weekTask.completeCount}}</div>
                  <div class="wait-complete">待完成：{{weekTask.unfinishedCount}}</div>
                  <div class="wait-complete">逾期：{{weekTask.overdueCount}}</div>
                </div>
              </div>
              <div class="complete-rate">
                完成率：{{weekTask.completePercentage}}%
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
                    <div class="task-num">{{overdueTask.totalTaskCount}}</div>
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
                  <div class="rate-num"> {{overdueTask.storeCount}}</div>
                </div>
                <div class="rate-item">
                  <div class="rate-title">连锁：</div>
                  <div class="rate-num"> {{overdueTask.chainCount}}</div>
                </div>
                <div class="rate-item">
                  <div class="rate-title">生产：</div>
                  <div class="rate-num"> {{overdueTask.produceCount}}</div>
                </div>
                <div class="rate-item">
                  <div class="rate-title">批发：</div>
                  <div class="rate-num"> {{overdueTask.wholesaleCount}}</div>
                </div>
              </div>
            </div>
           <!-- <el-progress :text-inside="true" :stroke-width="20" :percentage="70"></el-progress> -->
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="pane-item">
              <div class="total-info" style="    padding-bottom: 18px;">
                <div class="total-info-top">
                  <img src="@/assets/icon/wancheng.png" alt="" class="task-img">
                  <div class="task">
                    <div class="task-title">本周完成率</div>
                    <div class="task-num">{{weekCompletePercentage.completePercentage}}%</div>
                  </div>
                </div>
                <div class="line-container">
                  <!-- <div class="already-complete">已完成：4423</div>
                  <div class="wait-complete">待完成：4423</div> -->
                  <el-progress :text-inside="true" :stroke-width="20" :percentage="weekCompletePercentage.completePercentage"></el-progress>
                </div>
              </div>
              <div class="complete-rate">
                <div class="rate-item">
                  <div class="rate-title">门店：</div>
                  <div class="rate-num"> {{weekCompletePercentage.storePercentage}}%</div>
                </div>
                <div class="rate-item">
                  <div class="rate-title">连锁：</div>
                  <div class="rate-num"> {{weekCompletePercentage.chainPercentage}}%</div>
                </div>
                <div class="rate-item">
                  <div class="rate-title">生产：</div>
                  <div class="rate-num"> {{weekCompletePercentage.producePercentage}}%</div>
                </div>
                <div class="rate-item">
                  <div class="rate-title">批发：</div>
                  <div class="rate-num"> {{weekCompletePercentage.wholesalePercentage}}%</div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        </el-row>
    </div>
      <!-- <search-form
        :formOptions="formOptions"
        :showNum="7"
        @onSearch="onSearch"
        ref="dataForm2"
      ></search-form> -->
      <div class="w-container">
        <div class="complete">
          <div class="complete-top">
            <div class="complete-title">完成情况</div>
            <div class="complete-dimension">
              <div :class="{'dimension-item':true, 'current-item': currentItem == 'DAY'}"  @click="clickTab('DAY')">今日</div>
              <div :class="{'dimension-item':true, 'current-item': currentItem == 'WEEK'}"  @click="clickTab('WEEK')">本周</div>
              <div :class="{'dimension-item':true, 'current-item': currentItem == 'MONTH'}"  @click="clickTab('MONTH')">本月</div>
              <div :class="{'dimension-item':true, 'current-item': currentItem == 'YEAR'}"  @click="clickTab('YEAR')">全年</div>
            </div>
          </div>
          <div style="overflow:hidden"><div id="chain-bar"></div></div>
        </div>
        <div class="visit-rank">
          <div style="display:flex;justify-content: flex-end;">
            <!-- <div class="complete-title">拜访排名</div> -->
            <div class="complete-dimension">
              
              <div :class="{'dimension-item':true, 'current-item': currentRankItem == 'COMPLETED'}"  @click="clickTab('COMPLETED',1)">已完成</div>
              <div :class="{'dimension-item':true, 'current-item': currentRankItem == 'UNFINISHED'}"  @click="clickTab('UNFINISHED',1)">待完成</div>
              <div :class="{'dimension-item':true, 'current-item': currentRankItem == 'OVERDUE'}"  @click="clickTab('OVERDUE',1)">已逾期</div>
              <div :class="{'dimension-item':true, 'current-item': currentRankItem == 'OVERDUE_COMPLETE'}"  @click="clickTab('OVERDUE_COMPLETE',1)">逾期完成</div>
            </div>
          </div>
          <div class="rank-content">
            <!-- <rd-table
              :tableData="chainList"
              :tableKey="rankingKey"
              :border="false"
              fixedTwoRow
              @sortChange="handelSortChange"
            >
               <template slot="name" slot-scope="scope">
                  <div class="rank-index"><span :class="{'rank-index-left':true,'rank-index-top': Number(scope.row.ranking) < 3 }">{{scope.row.ranking}}</span><span>{{scope.row.name}}</span></div>
               </template>
            </rd-table> -->
             <!-- <div class="rank-item" v-if="chainList.length" style="text-align:center;cursor:pointer;display: flex;justify-content: center;" @click="rankVisible = true">查看更多></div> -->
            <template v-if="chainList.length">
              <div class="rank-item" v-for="item in chainList" :key="item.ranking">
                <div class="rank-index"><span :class="{'rank-index-left':true,'rank-index-top': item.ranking == 1 || item.ranking == 2 || item.ranking == 3 }">{{item.ranking}}</span><span>{{item.chainName}}</span></div>
                <div class="rank-time">拜访时间：{{item.date}}</div>
              </div>
              <div class="rank-item" style="text-align:center;cursor:pointer;display: flex;justify-content: center;color:#409eff" @click="showWeekWork">查看更多></div>
            </template>
            <template v-else>
              <div style="text-align:center">
                <img src="@/assets/empty-image.png" alt="" class="img-empty" style="margin-top: 70px;width: 200px"/>
                <p style="color: #a9a8a8">暂无数据</p>
              </div>
            </template>
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
  name:"people-work",
  data(){
    return {
      orderForm:{},
      defaultData:{},
      currentRankItem:'COMPLETED',
      rankVisible: false,
      dialogTitle:'今日任务',
      mode:'day',
      weekVisible:false,
      dayVisible: false,
      currentItem: 'WEEK',
      chart: null,
      formOptions: [
         {
          prop: "organizationId",
          element: "el-select",
          placeholder: "所属组织",
          options: [],
          events: {},
          disabled: false
        },
        {
          prop: "provincialSchoolId",
          element: "el-select",
          placeholder: "所属校区",
          options: [],
          events: {},
          disabled: false
        },
        {
          prop: "branchSchoolId",
          element: "el-select",
          placeholder: "所属分校",
          options: [],
          events: {},
          disabled: false
        },
      ],
      searchForm: {},
      organizationArr: [],
      provincialSchoolArr:[],
      branchSchoolArr: [],
      overdueTask: {},
      todayTask: {},
      weekCompletePercentage: {},
      weekTask: {},
      chainList: [],
      rankingKey: [
         {
          name: "",
          value: "name",
          operate: true,
          width: 180
        },
         {
          name: "数量",
          value: "count",
           sortable: 'custom',
        },
         {
          name: "比例",
          value: "percentage",
            sortable: 'custom',
        },
      ]
    }
  },
  components: {
    dailyWork,
    rankStatics
  },
  mounted(){
    // this.getSelectList();
    // this.$nextTick(() => {
    //   this.initChart()
    // })

    this.getStatics(); //获取金刚区数据
    // 获取图标数据
    this.compeleteStatics();
    

  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
   methods: {
     handelSortChange(val){
      console.log(val,'valll')
      let sortBy;
      if(val.order == "descending"){
        sortBy = 'DESC'
      }else if(val.order == "ascending"){
        sortBy = 'ASC'
      }else {
        sortBy = null
      }
      if(sortBy){
        this.orderForm = {
          sortBy,
          sortField: val.prop
        };
      }else {
        this.orderForm = {};
      }
      this.compeleteStatics(this.orderForm);
    },
     getStatics(){
       this.$fetch("chain_getPeopleStatisticsSynopsis").then(res => {
         const { overdueTask,todayTask,weekCompletePercentage,weekTask }  = res.data;
        this.overdueTask = overdueTask;
        this.todayTask = todayTask;
        this.weekCompletePercentage = weekCompletePercentage;
        this.weekTask = weekTask;
       })
     },
     compeleteStatics(param={}){
       this.$fetch('chain_getPeopleStatisticsData',{
         dateType: this.currentItem,
         completeStatus: this.currentRankItem,
         ...this.searchForm,
         ...param
       }).then(res => {
         const { completeList,chainList } = res.data;
         let xData = completeList.map(item => (item.date));
         let yData = completeList.map(item => (item.count));
          this.initChart(xData,yData);
          this.chainList = chainList;
          return;
          this.chainList = [
            {
              ranking: 1,
              percentage: 50,
              chainName: '广东校区',
              date: 60
            },
            {
              ranking: 2,
              percentage: 50,
              chainName: '广东校区2',
              date: 60
            },
            {
              ranking: 3,
              percentage: 50,
              chainName: '广东校区3',
              date: 60
            },
             {
              ranking: 4,
              percentage: 50,
              chainName: '广东校区4',
              date: 60
            },
          ]
       })
     },
     initChart(xData = [],yData = []){
       this.chart = echarts.init(document.querySelector("#chain-bar"));
       this.chart.setOption({
          xAxis: {
              type: 'category',
              data: xData
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: yData,
              type: 'bar',
              barWidth: 20,
              itemStyle:{
                normal: {
                  // label: {
                  //       show: true, //开启显示
                  //       position: 'top', //在上方显示
                  //       textStyle: { //数值样式
                  //           color: 'black',
                  //           fontSize: 16
                  //       }
                  //   },
                    color: function(params) { 
                    //首先定义一个数组 
                      let colorList = ['#307FF1','#75B1FF']; 
                      if(params.dataIndex % 2 == 0){
                            return colorList[0]
                        }else{
                            return colorList[1]
                        }
                    },
                   
                }
              }
          }],
          tooltip : {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
          }
          
        });

        window.addEventListener("resize",  ()=> {
          this.chart.resize();
        });
     },
     onSearch(val){
       this.searchForm = {
          ...val
        };
        this.compeleteStatics();
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
     clickTab(index,type){
       if(type == 1){
         this.currentRankItem = index;
       }else {
         this.currentItem = index;
       }
       
       this.compeleteStatics();
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
.people-work {
   
  .people-work-top {
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
        .rate-num {
          padding-left: 8px;
        }
      }
    }
  }
  .w-container{
    padding: 28px;
    display: flex;
    justify-content: space-between;
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
      
    }
  }
  .visit-rank{
    width: 28%;
    margin-right: 2%;
    /deep/ {
      overflow-x: hidden;
    }
    .view-more {
      cursor: pointer;
    }
    .complete-title {
        color: #333;
        font-size: 18px;
        font-weight: bold;
    }
    .complete-dimension {
      margin-right: -10px;
    }
    .dimension-item {
      margin-right: 10px;
    }
    .rank-index {
          // width: 120px;
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
    .rank-content {
      margin-top: 44px;
      .rank-item {
        // display: flex;
        // justify-content: space-between;
        margin-top: 20px;

        .rank-time {
          margin-left: 19px;
          font-size: 12px;
          margin-top: 5px;
          color: #999999;
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

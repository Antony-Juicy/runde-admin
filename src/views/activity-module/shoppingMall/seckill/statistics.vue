<template>
  <div class="statistics">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="合计" name="first">
            <div class="card-wrapper">
                <el-card shadow="hover">
                    <div class="call-total">
                        <div class="call-title">累计送出</div>
                        <div class="call-content">{{jsglData.totalNum || 0 }}</div>
                    </div>
                </el-card>
                <el-card shadow="hover" v-for="(item,index) in jsglData.subjectArray || []" :key="index">
                    <div class="call-total">
                        <div class="call-title">{{item.name}}</div>
                        <div class="call-content">{{item.value || 0 }}</div>
                    </div>
                </el-card>
                <el-card shadow="hover">
                    <div class="call-total">
                        <div class="call-title">线上战队</div>
                        <div class="call-content">{{jsglData.onlineTotalNum || 0 }}</div>
                    </div>
                </el-card>
                <el-card shadow="hover">
                    <div class="call-total">
                        <div class="call-title">线下分校</div>
                        <div class="call-content">{{jsglData.offlineTotalNum || 0 }}</div>
                    </div>
                </el-card>
                <el-card shadow="hover">
                    <div class="call-total">
                        <div class="call-title">加盟</div>
                        <div class="call-content">{{jsglData.activitySum || 0 }}</div>
                    </div>
                </el-card>
            </div>
        </el-tab-pane>
        <el-tab-pane label="全国" name="second">
            <div id="sjfxMain" style="width: 1024px;"></div>
        </el-tab-pane>
        <el-tab-pane label="线下" name="third">
            <div id="xxfxpmMain" style="width: 1024px;"></div>
        </el-tab-pane>
        <el-tab-pane label="线上" name="fourth">
            <div id="xszdpmMain" style="width: 1024px;"></div>
        </el-tab-pane>
        <el-tab-pane label="个人TOP100" name="fifith">
            <div id="grpmMain" style="width: 1024px;"></div>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
let myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
export default {
  name:"statistics",
  data(){
    return {
        activeName: 'first',
        jsglData:{},
        subjectArray:[],
        roleName:""
    }
  },
  props: {
      data: {
          type: Object,
          default: {}
      }
  },
  mounted(){
      scrollTo(0, 800)
      this.getStaticsData()
      this.getQgsjfxData()
      this.getxxfxData()
      this.getXszdData()
      this.getgrpmData()
  },
   methods: {
       handleClick(tab, event) {
        // console.log(tab, event);
      },
      getStaticsData(){
        const { code, startTime, endTime, goodsName } = this.data;
        this.$fetch("mobilegoodspaylog_toStatisticsJsp",{
            code, startTime, endTime, goodsName,
            type: "new"
        }).then(res => {
            const { jsglData,roleName} = res.data;
            this.jsglData = jsglData;
            this.roleName = roleName;
        })
      },
      getQgsjfxData(){
          const { code, startTime, endTime, goodsName } = this.data;
         let qgsjfxmChart;
          this.$fetch("mobilegoodspaylog_getQgsjxqActivityNumRank",{
              code, startTime, endTime,campusId: 5
          }).then(async res => {
            //   模拟数据
            //   res = {
            //       dataJson: {
            //           campusNameList: ["1 广东校区"],
            //           campusNumList:  ["6"]
            //       }
            //   }
              const { dataJson: {campusNameList,campusNumList,campusOrderList} } = res;
                let p1 = new Promise((resolve) => {
                    setTimeout(() => {
                        document.querySelector("#sjfxMain").style.height = campusNameList.length*60+150 + 'px';
                        resolve();
                    }, 10);
                })
                await p1;
	     	    qgsjfxmChart = echarts.init(document.querySelector("#sjfxMain"));
                qgsjfxmChart.hideLoading();
                qgsjfxmChart.setOption({
	     			title:{
	       		        text: goodsName,
	       		        subtext: '全国校区 数据截止'+startTime+' ~ '+endTime,
	       		        x: 'center',
				        textStyle: {
				            color: '#ffffff',
				            fontFamily: '等线',
				            fontSize: 20
				        },
				        subtextStyle:{
				            fontSize:15,
				            fontFamily:'等线'
				        }
	       		    },
	         		backgroundColor: '#0e2147',
	         	    grid: {
	         	        left: '15%',
	         	        top: '5%',
	         	        right: '15%',
	         	        bottom: '1%',
	         	        containLabel: true
	         	    },
	         	    xAxis: [{
	         	        show: false,
	         	    }],
	         	    yAxis: [{
	         	        axisTick: 'none',
	         	        axisLine: 'none',
	         	        offset: '27',
	         	        axisLabel: {
	         	            textStyle: {
	         	                color: '#ffffff',
	         	                fontSize: '16',
	         	            }
	         	        },
	         	        data: campusNameList
	         	    }, {
	         	        axisTick: 'none',
	         	        axisLine: 'none',
	         	        axisLabel: {
	         	            textStyle: {
	         	                color: '#ffffff',
	         	                fontSize: '0',
	         	            }
	         	        },
	         	        data: campusOrderList
	         	    }],
	         	    series: [{
	         	            name: '条',
	         	            type: 'bar',
	         	            yAxisIndex: 0,
	         	            data: campusNumList,
	         	            label: {
	         	                normal: {
	         	                    show: true,
	         	                    position: 'right',
	         	                    textStyle: {
	         	                        color: '#ffffff',
	         	                        fontSize: '16',
	         	                    }
	         	                }
	         	            },
	         	            barWidth: 12,
	         	            itemStyle: {
	         	                normal: {
	         	                    color: function(params) {
	         	                        let num = myColor.length;
	         	                        return myColor[params.dataIndex % num]
	         	                    },
	         	                }
	         	            },
	         	            z: 2
	         	        }
	         	    ]
	         	});
          })
      },
      getxxfxData(){
          const { code, startTime, endTime, goodsName } = this.data;
         let xxfxymChart;
          this.$fetch("mobilegoodspaylog_getQgxxfxActivityNumRank",{
              code, startTime, endTime,campusId: 5
          }).then(async res => {
               //   模拟数据
            //   res = {
            //       dataJson: {
            //           campusNameList: ["1 汕头分校"],
            //           campusNumList:  ["6"]
            //       }
            //   }
              const { dataJson: {campusNameList,campusNumList,campusOrderList} } = res;
                let p1 = new Promise((resolve) => {
                    setTimeout(() => {
                        document.querySelector("#xxfxpmMain").style.height = campusNameList.length*60+150 + 'px';
                        resolve();
                    }, 10);
                })
                await p1;
	     	    xxfxymChart = echarts.init(document.querySelector("#xxfxpmMain"));
                let heightPercent;
                if(campusNameList.length >= 50){
                   heightPercent = '1.5%';
                }else {
                    heightPercent = '5%';
                }
                xxfxymChart.setOption({
	          		title:{
	       		        text: goodsName,
	       		        subtext: '线下分校  数据截止'+startTime+' ~ '+endTime,
	       		        x: 'center',
				        textStyle: {
				            color: '#ffffff',
				            fontFamily: '等线',
				            fontSize: 20
				        },
				        subtextStyle:{
				            fontSize:15,
				            fontFamily:'等线'
				        }
	       		    },
	          		backgroundColor: '#0e2147',
	          	    grid: {
	          	        left: '15%',
	          	        top: heightPercent,
	          	        right: '15%',
	          	        bottom: '1%',
	          	        containLabel: true
	          	    },
	          	    xAxis: [{
	          	        show: false,
	          	    }],
	          	    yAxis: [{
	          	        axisTick: 'none',
	          	        axisLine: 'none',
	          	        offset: '27',
	          	        axisLabel: {
	          	            textStyle: {
	          	                color: '#ffffff',
	          	                fontSize: '16',
	          	            }
	          	        },
	          	        data: campusNameList
	          	    }, {
	          	        axisTick: 'none',
	          	        axisLine: 'none',
	          	        axisLabel: {
	          	            textStyle: {
	          	                color: '#ffffff',
	          	                fontSize: '0',
	          	            }
	          	        },
	          	        data: campusOrderList
	          	    }],
	          	    series: [{
	          	            name: '条',
	          	            type: 'bar',
	          	            yAxisIndex: 0,
	          	            data: campusNumList,
	          	            label: {
	          	                normal: {
	          	                    show: true,
	          	                    position: 'right',
	          	                    textStyle: {
	          	                        color: '#ffffff',
	          	                        fontSize: '16',
	          	                    }
	          	                }
	          	            },
	          	            barWidth: 12,
	          	            itemStyle: {
	          	                normal: {
	          	                    color: function(params) {
	          	                        let num = myColor.length;
	          	                        return myColor[params.dataIndex % num]
	          	                    },
	          	                }
	          	            },
	          	            z: 2
	          	        }
	          	    ]
	          	});
          })
      },
      getXszdData(){
          const { code, startTime, endTime, goodsName } = this.data;
         let xszdymChart;
          this.$fetch("mobilegoodspaylog_getQgxxfxActivityNumRank",{
              code, startTime, endTime,campusId: 6
          }).then(async res => {
               //   模拟数据
            //   res = {
            //       dataJson: {
            //           campusNameList: [],
            //           campusNumList:  []
            //       }
            //   }
              const { dataJson: {campusNameList,campusNumList,campusOrderList} } = res;
                let p1 = new Promise((resolve) => {
                    setTimeout(() => {
                        document.querySelector("#xszdpmMain").style.height = campusNameList.length*60+150 + 'px';
                        resolve();
                    }, 10);
                })
                await p1;
	     	    xszdymChart = echarts.init(document.querySelector("#xszdpmMain"));
                xszdymChart.setOption({
	          		title:{
	       		        text: goodsName,
	       		        subtext: '线上战队  数据截止'+startTime+' ~ '+endTime,
	       		        x: 'center',
				        textStyle: {
				            color: '#ffffff',
				            fontFamily: '等线',
				            fontSize: 20
				        },
				        subtextStyle:{
				            fontSize:15,
				            fontFamily:'等线'
				        }
	       		    },
	          		backgroundColor: '#0e2147',
	          	    grid: {
	          	        left: '15%',
	          	        top: '10%',
	          	        right: '15%',
	          	        bottom: '1%',
	          	        containLabel: true
	          	    },
	          	    xAxis: [{
	          	        show: false,
	          	    }],
	          	    yAxis: [{
	          	        axisTick: 'none',
	          	        axisLine: 'none',
	          	        offset: '27',
	          	        axisLabel: {
	          	            textStyle: {
	          	                color: '#ffffff',
	          	                fontSize: '16',
	          	            }
	          	        },
	          	        data: campusNameList
	          	    }, {
	          	        axisTick: 'none',
	          	        axisLine: 'none',
	          	        axisLabel: {
	          	            textStyle: {
	          	                color: '#ffffff',
	          	                fontSize: '0',
	          	            }
	          	        },
	          	        data: campusOrderList
	          	    }],
	          	    series: [{
	          	            name: '条',
	          	            type: 'bar',
	          	            yAxisIndex: 0,
	          	            data: campusNumList,
	          	            label: {
	          	                normal: {
	          	                    show: true,
	          	                    position: 'right',
	          	                    textStyle: {
	          	                        color: '#ffffff',
	          	                        fontSize: '16',
	          	                    }
	          	                }
	          	            },
	          	            barWidth: 12,
	          	            itemStyle: {
	          	                normal: {
	          	                    color: function(params) {
	          	                        let num = myColor.length;
	          	                        return myColor[params.dataIndex % num]
	          	                    },
	          	                }
	          	            },
	          	            z: 2
	          	        }
	          	    ]
	          	});
          })
      },
      getgrpmData(){
          const { code, startTime, endTime, goodsName } = this.data;
         let grpmChart;
          this.$fetch("mobilegoodspaylog_getPersonalActivityNumRank",{
              code, startTime, endTime
          }).then(async res => {
               //   模拟数据
            //   res = {
            //       dataJson: {
            //           staffNameList: [["1 孙华理 汕头分校"]],
            //           campusNumList:  ["6"]
            //       }
            //   }
              const { dataJson: {staffNameList,campusNumList,campusOrderList} } = res;
                let p1 = new Promise((resolve) => {
                    setTimeout(() => {
                        document.querySelector("#grpmMain").style.height = staffNameList.length*60+150 + 'px';
                        resolve();
                    }, 10);
                })
                await p1;
	     	    grpmChart = echarts.init(document.querySelector("#grpmMain"));
                let heightPercent;
          		let dataLength = staffNameList.length;
          		if( dataLength >= 100){
          			heightPercent = '1.5%';
          		}else{
          			heightPercent = '5%';
          		}
                grpmChart.setOption({
	          		title:{
	       		        text: goodsName,
	       		        subtext: '个人Top'+dataLength+'  数据截止'+startTime+' ~ '+endTime,
	       		        x: 'center',
				        textStyle: {
				            color: '#ffffff',
				            fontFamily: '等线',
				            fontSize: 20
				        },
				        subtextStyle:{
				            fontSize:15,
				            fontFamily:'等线'
				        }
	       		    },
	          		backgroundColor: '#0e2147',
	          	    grid: {
	          	        left: '15%',
	          	        top: heightPercent,
	          	        right: '15%',
	          	        bottom: '1%',
	          	        containLabel: true
	          	    },
	          	    xAxis: [{
	          	        show: false,
	          	    }],
	          	    yAxis: [{
	          	        axisTick: 'none',
	          	        axisLine: 'none',
	          	        offset: '27',
	          	        axisLabel: {
	          	            textStyle: {
	          	                color: '#ffffff',
	          	                fontSize: '16',
	          	            }
	          	        },
	          	        data: staffNameList
	          	    }, {
	          	        axisTick: 'none',
	          	        axisLine: 'none',
	          	        axisLabel: {
	          	            textStyle: {
	          	                color: '#ffffff',
	          	                fontSize: '0',
	          	            }
	          	        },
	          	        data: campusOrderList
	          	    }],
	          	    series: [{
	          	            name: '条',
	          	            type: 'bar',
	          	            yAxisIndex: 0,
	          	            data: campusNumList,
	          	            label: {
	          	                normal: {
	          	                    show: true,
	          	                    position: 'right',
	          	                    textStyle: {
	          	                        color: '#ffffff',
	          	                        fontSize: '16',
	          	                    }
	          	                }
	          	            },
	          	            barWidth: 12,
	          	            itemStyle: {
	          	                normal: {
	          	                    color: function(params) {
	          	                        let num = myColor.length;
	          	                        return myColor[params.dataIndex % num]
	          	                    },
	          	                }
	          	            },
	          	            z: 2
	          	        }
	          	    ]
	          	});
          })
      },
  }
}
</script>

<style lang="scss" scoped>
.statistics {
    .card-wrapper {
    //   display: flex;
    //   & > div {
    //     flex: 1;
    //   }
      .call-total {
        .call-title {
          font-size: 14px;
          color: #999;
        }
        .call-content {
          font-size: 30px;
          font-weight: 300;
          color: #ff5722;
        }
      }
      /deep/ {
          .el-card  {
              display: inline-block;
              margin-right: 5px;
          }
        .el-card__body {
          background-color: #f8f8f8;
          border: none;
          width: 160px;

        }
      }
    }
}
</style>

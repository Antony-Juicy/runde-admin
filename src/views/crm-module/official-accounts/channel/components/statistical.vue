<template>
  
  <div class="statistical">
    <div class="head">
      <i class="el-icon-arrow-left" style="font-size:18px;font-weight: bold;"></i>
      <span>渠道码数据统计</span>
    </div>

    <div class="choose">
      <span>选择渠道码:</span>
      <div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="data">
      <div class="data-box">
        <div class="data-box-top">
          <p>10</p>
          <p>今日关注人数</p>
        </div>
        <div class="data-box-bottom">
          <p>今日取关人数：2</p>
          <p>今日净关注人数：8</p>
        </div>
      </div>
      <div class="data-box">
        <div class="data-box-top">
          <p>15</p>
          <p>今日扫码人数</p>
        </div>
        <div class="data-box-bottom">
          <p>新用户：8</p>
          <p>老用户：7</p>
        </div>
      </div>
      <div class="data-box">
        <div class="data-box-top">
          <p>10</p>
          <p>总关注人数</p>
        </div>
        <div class="data-box-bottom">
          <p>总取关人数：20</p>
          <p>总净关注人数：80</p>
        </div>
      </div>
      <div class="data-box">
        <div class="data-box-top">
          <p>10</p>
          <p>总扫码人数</p>
        </div>
        <div class="data-box-bottom">
          <p>新用户：200</p>
          <p>老用户：50</p>
        </div>
      </div>
    </div>
    <div class="line">
      <div class="line-top">
        <span>图表数据</span> 
        <div class="line-list">
          <p>今日</p>
          <p>最近7天</p>
          <p>最近15天</p>
          <p>最近30天</p>
        </div>
      </div>
      <line-chart :chart-data="lineChartData" />
    </div>

    <!-- 表格 -->
    <div class="form">






      
    </div>


  </div>
</template>

<script>

import LineChart from '../components/LineChart';
export default {
  props: {
    
  },
  

  components: {
    LineChart
  },
  data() {
    return {
      options: [{
          value: '选项1',
          label: '黄金糕'
      }, {
          value: '选项2',
          label: '双皮奶'
      }, {
          value: '选项3',
          label: '蚵仔煎'
      }, {
          value: '选项4',
          label: '龙须面'
      }, {
          value: '选项5',
          label: '北京烤鸭'
      }],
      value: '',
      lineChartData: {
          expectedData: [100, 120, 161, 134, 105, 160, 165],
          actualData: [120, 82, 91, 154, 162, 140, 145]
      },
    }
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {

  }
}
</script>



<style lang='scss' scoped>

.statistical{
    width: 100%;
    background:#fff;
    padding:15px 30px;
    box-sizing: border-box;
    overflow-x: auto;
    overflow-y: auto;
}
.head p{
    font-size: 18px;
}
.choose{
    display: flex;
    align-items: center;
    margin: 40px 0;
}
.choose span{
    flex:0 0 100px;
    font-size: 14px;
    margin-right: 30px;
}
.choose div{
    width: 500px;
    flex:0 0 500px;
}
.data{
    display: flex;
    align-items: center;
}
.data-box{
    flex:1;
    height: 167px;
    margin-right: 35px;
}
.data-box:nth-child(4){
    margin-right: 0;
}
.data-box-top{
    height: 117px;
    background:#ECF2FB;
}
.data-box-top p:nth-child(1){
    text-align: center;
    font-size: 30px;
    color:#26B957;
    padding: 20px 0;
    margin: 0;
}
.data-box-top p:nth-child(2){
    font-size: 14px;
    text-align: center;
    margin: 0;
}
.data-box-bottom{
    background: #E0E6EF;
    display: flex;
    align-items: center;
    height: 50px;
}
.data-box-bottom p{
    width: 50%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    margin: 0;
}
.line{
    padding:0 30px;
    box-sizing: border-box;
    border:1px solid #F3F3F7;
    margin: 20px 0;
}
.line-top{
    display: flex;
    align-items: center;
}
.line-top span{
    font-size:14px;
    margin-right: 20px;
}
.line-list{
    display: flex;
    align-items: center;
}
.line-list p{
    width: 127px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color:#333;
    background: #F3F3F7;
    font-size: 12px;
}














</style>
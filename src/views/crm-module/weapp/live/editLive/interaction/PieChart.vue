<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/utils/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    answerId:{
      type: Number
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    console.log(this.answerId,'pie')
    this.getData();
    // this.$nextTick(() => {
    //   this.initChart()
    // })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch:{
    answerId(){
      this.getData();
    }
  },
  methods: {
    getData(){
      this.$fetch("live_get_options_statistics",{
        liveAnswerSheetId: this.answerId
      }).then(res => {
        this.$emit("getOptions",res.data.options);
        this.initChart(res.data)
      })
    },
    initChart(data) {
      console.log(data,'data---')
      const {options,statistics} = data;
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: options
        },
        series: [
          {
            name: '分类销量',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: statistics.map(item => ({
              name: item.option,
              value: item.count
            })),
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>

<template>
  <div class="callout-table">
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :loading="loading"
      :fixedTwoRow="fixedTwoRow"
      :pageConfig.sync="pageConfig"
      :tbodyHeight="650"
      :pager-count="5"
      @select="handleSelect"
      @pageChange="pageChange"
    >
      <template slot="type" slot-scope="scope">
       {{scope.row.type | CallTypeFilter}}
     </template>
      <template slot="data_type" slot-scope="scope">
       {{scope.row.data_type | dataTypeFilter}}
     </template>
    </rd-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      tableKey: [
        { name: '类型',value: 'type',operate: true },
        { name: '类别',value: 'data_type' ,operate: true },
        { name: '通话时长(单位秒)',value: 'duration' },
        { name: '员工姓名',value: 'staff_name' },
        { name: '校区名',value: 'campus_name' },
        { name: '接通时间',value: 'start_time' },
        { name: '结束时间',value: 'end_time' }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      loading: false,
    }
  },
  props: {
     id: {
      type:Number | String,
      default: 0
    },
    phone: {
      type: Number | String,
      default:""
    }
  },
  watch: {
    id(){
      this.getTableData();
    }
  },
  filters:{
    CallTypeFilter(val){
      switch(val){
        case 1:
          return '呼出';
        case 2:
          return '呼入';
        case 3:
          return '呼出未接';
        case 4:
          return '呼入未接';
      }
    },
     dataTypeFilter(val){
      switch(val){
        case 0:
          return '系统电话';
        case 1:
          return '语音通话';
        case 2:
          return '视频通话';
      }
    }
  },
  mounted(){
    this.getTableData();
  },
  methods: {
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    getTableData(params = {}) {
      this.$fetch("chance_feedback_sjwh", {
        ...this.pageConfig,
        ...params,
        studentPhone: this.phone
      }).then((res) => {
        if(res.msg == "数据为空！"){
          return;
        }
        let data = JSON.parse(res.msg);
        this.tableData = data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.nextDate = this.$common._formatDates(item.nextDate);
          return item;
        });
        this.pageConfig.totalCount = data.count;
      });
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
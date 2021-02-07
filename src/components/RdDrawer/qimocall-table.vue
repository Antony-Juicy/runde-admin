<template>
  <div class="qimocall-table">
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
    <template slot="CallType" slot-scope="scope">
       {{scope.row.CallType | CallTypeFilter}}
     </template>
     <template slot="State" slot-scope="scope">
       {{scope.row.State | StateFilter}}
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
        { name: '通话类型',value: 'CallType' ,operate: true},
        { name: '通话状态',value: 'State',operate: true },
        { name: '通话时长(单位秒)',value: 'dealingTime' },
        { name: '招生老师',value: 'AgentName' },
        { name: '校区名',value: 'campus_name' },
        { name: '接通时间',value: 'Begin' },
        { name: '结束时间',value: 'End' },
        { name: '录音',value: 'record' }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        showCount: 10,
      },
      loading: false,
    }
  },
  watch: {
    dialogVisible(newVal){
      this.visible = newVal;
    },
     id(){
      this.getTableData();
    }
  },
  filters:{
    StateFilter(val){
      switch(val){
        case 'dealing':
          return '已接';
        case 'notDeal':
          return '振铃未接听';
        case 'leak':
          return '放弃';
        case 'queueLeak':
          return '排队放弃';
        case 'blackList':
          return '黑名单';
        case 'voicemail':
          return '留言';
      }
    },
    CallTypeFilter(val){
      switch(val){
        case 'dialout':
          return '呼出';
        case 'normal':
          return '普通来电';
        case 'transfer':
          return '呼入转接';
        case 'dialTransfer':
          return '外呼转接';
      }
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
      const loading = this.$loading({
        lock: true,
        target: ".qimocall-table .el-table",
      });
      this.$fetch("chance_feedback_zbwh", {
        ...this.pageConfig,
        ...params,
        calledNo: this.phone
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          return item;
        });
        this.pageConfig.totalCount = res.data.count;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
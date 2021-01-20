<template>
  <div class="branchcall-table">
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :loading="loading"
      :fixedTwoRow="fixedTwoRow"
      :pageConfig="pageConfig"
      :tbodyHeight="650"
      :pager-count="5"
      @select="handleSelect"
      @pageChange="pageChange"
    >
    </rd-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      tableKey: [
        { name: '通话类型',value: 'callType' },
        { name: '通话人号码',value: 'userNumber' },
        { name: '通话状态',value: 'status' },
        { name: '通话时长(单位秒）',value: 'dealingTime' },
        { name: '招生老师',value: 'staffName' },
        { name: '校区名',value: 'campusName' },
        { name: '接通时间',value: 'connectTime' },
        { name: '结束时间',value: 'endTime' },
        { name: '录音',value: 'nextDate' },
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
        target: ".branchcall-table .el-table",
      });
      this.$fetch("chance_feedback_fxwh", {
        ...this.pageConfig,
        ...params,
        userNumber: this.phone
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.nextDate = this.$common._formatDates(item.nextDate);
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
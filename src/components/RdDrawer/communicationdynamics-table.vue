<template>
  <div class="communicationdynamics-container">
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
    </rd-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      tableKey: [
        { name: '跟进人',value: 'marketName' },
        { name: '跟进时间',value: 'createAt' },
        { name: '跟进状态',value: 'feedbackStatus' },
        { name: '跟进详情',value: 'content' },
        { name: '下次跟进',value: 'nextDate' }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      loading: false
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
      this.$fetch("chance_feedback_commuity", {
        ...this.pageConfig,
        ...params,
        opportunityId: this.id
      }).then((res) => {
        this.tableData = res.data.data&&res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.nextDate = this.$common._formatDates(item.nextDate);
          return item;
        });
        this.pageConfig.totalCount = res.data.pager.totalRows;
      });
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
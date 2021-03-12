<template>
  <div class="diaryrecords-table">
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
        { name: '归属销售',value: 'marketName' },
        { name: '操作类型',value: 'operateType' },
        { name: '备注',value: 'remark' },
        { name: '创建时间',value: 'createAt' },
        { name: '更新时间',value: 'updateAt' }
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
  mounted(){
    this.getTableData();
  },
  watch: {
    id(){
      this.getTableData();
    }
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
      this.$fetch("chance_feedback_log", {
        ...this.pageConfig,
        ...params,
        opportunityId: this.id
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
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
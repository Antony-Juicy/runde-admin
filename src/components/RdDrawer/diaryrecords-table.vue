<template>
  <div class="diaryrecords-container">
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :loading="loading"
      :fixedTwoRow="fixedTwoRow"
      :pageConfig="pageConfig"
      :tbodyHeight="500"
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
      fixedTwoRow: false,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
    }
  },
  methods: {
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val,'pagechange')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
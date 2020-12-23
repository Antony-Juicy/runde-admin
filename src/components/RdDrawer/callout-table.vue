<template>
  <div class="callout-container">
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
        { name: '类型',value: 'type' },
        { name: '类别',value: 'data_type' },
        { name: '通话时长(单位秒)',value: 'duration' },
        { name: '员工姓名',value: 'staff_name' },
        { name: '校区名',value: 'campus_name' },
        { name: '接通时间',value: 'start_time' },
        { name: '结束时间',value: 'end_time' }
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
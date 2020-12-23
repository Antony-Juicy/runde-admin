<template>
  <div class="branchcall-container">
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
        { name: '通话类型',value: 'callType' },
        { name: '通话人号码',value: 'userNumber' },
        { name: '通话状态',value: 'status' },
        { name: '通话时长(单位秒)',value: 'dealingTime' },
        { name: '招生老师',value: 'staffName' },
        { name: '校区名',value: 'campusName' },
        { name: '接通时间',value: 'connectTime' },
        { name: '结束时间',value: 'endTime' },
        { name: '录音',value: '9' }
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
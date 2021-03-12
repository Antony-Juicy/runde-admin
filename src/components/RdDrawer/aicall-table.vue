<template>
  <div class="aicall-container">
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :loading="loading"
      :fixedTwoRow="fixedTwoRow"
      :pageConfig.sync="pageConfig"
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
        { name: '挂断状态',value: 'hangupBy' },
        { name: '通话状态',value: 'resultStatus' },
        { name: '通话时长(单位秒)',value: 'chatDuration' },
        { name: '招生老师',value: 'marketName' },
        { name: '校区名',value: 'campusName' },
        { name: '意向等级',value: '5' },
        { name: '接通时间',value: 'startTime' },
        { name: '录音',value: '7' }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: false,
      pageConfig: {
        totalCount: 0,
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
<template>
  <div class="communicationdynamics-container">
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
        { name: '归属销售',value: 'marketName' },
        { name: '操作类型',value: 'operateType' },
        { name: '备注',value: 'remark' },
        { name: '创建时间',value: 'createAt' },
        { name: '更新时间',value: 'upadteAt' }
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
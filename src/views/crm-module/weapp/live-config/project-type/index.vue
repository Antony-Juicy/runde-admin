<template>
  <div class="projecttype-container">
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small">新增项目分类</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
      </rd-table>
    </div>
  </div>
</template>

<script>

export default {
  name:"project-type",
  data(){
    return {
      tableData: [],
      tableKey: [
        { name: 'id',value: 'id' },
        { name: '项目名称',value: 'projectName' },
        { name: '排序',value: 'paixu' },
        { name: '状态',value: 'status' },
        { name: '操作',value: 'edit',operate: true,width: 120 }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false
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
.projecttype-container {

}
</style>

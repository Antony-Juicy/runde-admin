<template>
  <div class="goodslist-container">
    <search-form :formOptions="formOptions" :showNum="7" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">添加商品</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :multiple="true"
        :pageConfig="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
      </rd-table>
    </div>
  </div>
</template>

<script>

export default {
  name:"goods-list",
  data(){
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'goodsId', element: 'el-input', placeholder: '请输入商品id/名称' },
        { prop: 'project', element: 'el-select', placeholder: '请输入项目' },
        { prop: 'goodsname', element: 'el-input', placeholder: '请选择商品名称' },
        { prop: 'status', element: 'el-select', placeholder: '请选择状态' },
      ],
      tableData: [],
      tableKey: [
        { name: '商品id',value: 'goodsId' },
        { name: '项目类型',value: 'projectType' },
        { name: '商品缩略图',value: 'goodsImg' },
        { name: '商品名称',value: 'goodsName' },
        { name: '商品价格',value: 'goodsPrice' },
        { name: '总销售量',value: 'allSales' },
        { name: '状态',value: 'status' },
        { name: '创建时间',value: 'createTime' },
        { name: '操作',value: 'edit',operate: true,width: 120 }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
    }
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      console.log(val,this.searchForm , 'val---')
    },
    handleAdd() {
      console.log(666)
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val,'pagechange')
    },
  }
}
</script>

<style lang="scss" scoped>
.goodslist-container {

}
</style>

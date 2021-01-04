<template>
  <div class="goodscoupon-container">
    <search-form :formOptions="formOptions" :showNum="7" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">添加优惠券</el-button>
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
  name:"goods-coupon",
  data(){
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'couponName', element: 'el-input', placeholder: '请输入优惠券名称' },
        { prop: 'couponType', element: 'el-select', placeholder: '请输入优惠券类型' },
        { prop: 'status', element: 'el-select', placeholder: '请选择状态' }
      ],
      tableData: [],
      tableKey: [
        { name: '优惠券名称',value: 'couponName' },
        { name: '面值',value: 'couponmz' },
        { name: '优惠券类型',value: 'couponType' },
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
.goodscoupon-container {

}
</style>

<template>
  <div class="goodsorders-container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small">导出</el-button>
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
  name:"goods-orders",
  data(){
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'ordersID', element: 'el-input', placeholder: '订单id' },
        { prop: 'shopID', element: 'el-input', placeholder: '商品名称/id' },
        { prop: 'liveName', element: 'el-input', placeholder: '直播名称' },
        { prop: 'marketName', element: 'el-input', placeholder: '推广老师' },
        { prop: 'userPhone', element: 'el-input', placeholder: '用户手机号' },
        { prop: 'shopProject', element: 'el-select', placeholder: '商品项目' },
        { prop: 'ordersStatus', element: 'el-select', placeholder: '订单状态' },
        { prop: 'status', element: 'el-select', placeholder: '收费类型' },
        { prop: 'ordersTime', element: 'el-date-picker', startPlaceholder: "下单开始时间", endPlaceholder: "下单结束时间" }
      ],
      tableData: [],
      tableKey: [
        { name: '订单id',value: 'ordersID',operate: true,sortable: true },
        { name: '商品',value: 'shopID' },
        { name: '直播活动名称',value: 'liveactivityName' },
        { name: '姓名',value: 'userName' },
        { name: '订单手机号',value: 'ordersPhone' },
        { name: '实付金额',value: 'payment' },
        { name: '订单状态',value: 'ordersStatus' },
        { name: '下单时间',value: 'ordersTime' },
        { name: '邀请老师',value: 'marketName' },
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
.goodsorders-container {
  
}
</style>

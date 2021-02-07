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
        :pageConfig.sync="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="orderStatus" slot-scope="scope">
          <span>{{ scope.row.orderStatus | orderStatusFilter }}</span>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="openConfig(scope.row)" type="text" size="small">查看明细</el-button>
        </template>
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
        { prop: 'orderId', element: 'el-input', placeholder: '订单id' },
        { prop: 'goodsName', element: 'el-input', placeholder: '商品名称' },
        { prop: 'sourceName', element: 'el-input', placeholder: '直播名称' },
        { prop: 'teacherName', element: 'el-input', placeholder: '推广老师' },
        { prop: 'phone', element: 'el-input', placeholder: '用户手机号' },
        { prop: 'typeId', element: 'el-select', placeholder: '项目分类' },
        { 
          prop: 'orderStatus',
          element: 'el-select',
          placeholder: '订单状态',
          options: [
            {
              label: "待支付",
              value: "WaitPay",
            },
            {
              label: "已支付",
              value: "Finish",
            },
            {
              label: "已失效",
              value: "Cancel",
            }
          ],
        },
        { prop: 'ordersTime', element: 'el-date-picker', startPlaceholder: "下单开始时间", endPlaceholder: "下单结束时间" }
      ],
      tableData: [],
      tableKey: [
        { name: '订单id',value: 'orderId' },
        { name: '商品',value: 'goodsName' },
        { name: '直播活动名称',value: 'sourceName' },
        { name: '姓名',value: 'consignee' },
        { name: '订单手机号',value: 'phone' },
        { name: '实付金额',value: 'paymentAmount' },
        { name: '订单状态',value: 'orderStatus',operate: true },
        { name: '下单时间',value: 'createAt' },
        { name: '邀请老师',value: 'teacherName' },
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
  mounted () {
    this.getTableData();
    this.getTypeData();
  },
  methods: {
    onSearch(val) {
      if(val.ordersTime) {
        this.searchForm = {
          createDateStart: val.ordersTime[0],
          createDateEnd: val.ordersTime[1]
        }
      } else {
        this.searchForm = {
          ...val,
        };
      }
      this.pageConfig.pageNum = 1;
      this.getTableData();
      console.log(this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    // 获取项目类型
    getTypeData() {
      this.$fetch(
        "projectType_normalList",
        {
          loginUserId: this.$common.getUserId()
        }
      ).then((res) => {
        this.typeOptions = res.data.map((item) => ({
          label: item.typeName,
          value: item.typeId,
        }));
        this.formOptions.splice(5,1,{ prop: 'typeId', element: 'el-select', placeholder: '项目分类', options: this.typeOptions })
      });
    },
    getTableData(params) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch(
        "orders_list",
        params || {
          ...this.pageConfig,
          ...this.searchForm
        }
      ).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.totalCount;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
    pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getTableData();
    }
  },
  filters: {
    orderStatusFilter(status){
      switch(status){
        case "WaitPay":
          return '待支付';
        case "Finish":
          return '已支付';
        case "Cancel":
          return '已失效';
        default:
          return '';
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.goodsorders-container {
  
}
</style>

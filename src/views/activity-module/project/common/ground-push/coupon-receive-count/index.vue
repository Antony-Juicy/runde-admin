<template>
  <div class="count-container">
    <search-form :formOptions="formOptions" :showNum="7" @onSearch="onSearch"></search-form>
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
      </rd-table>
    </div>
  </div>
</template>

<script>

export default {
  name:"coupon-receive-count",
  data(){
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入优惠券名称",
        }
      ],
      searchForm: {},
      emptyText: "暂无数据",
      fixedTwoRow: true,
      tableData: [
        
      ],
      tableKey: [
        {
          name: "邀请码",
          value: "staffName",
        },
        {
          name: "优惠券id",
          value: "staffName",
        },
        {
          name: "优惠券名称",
          value: "staffName",
        },
        {
          name: "领取总数",
          value: "staffName",
        },
        {
          name: "操作",
          value: "staffName",
        }
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },

      loading: false,
    }
  },
  mounted () {
    // this.getTableData()
  },
  methods: {
    onSearch(val){
       this.searchForm = {
        ...val
      };
      this.pageConfig.pageNum = 1;
      this.getTableData();
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    getTableData(){
      console.log('统计的页面')
    },
    pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
  }
}
</script>

<style lang="scss" scoped>
.count-container {
  
}
</style>

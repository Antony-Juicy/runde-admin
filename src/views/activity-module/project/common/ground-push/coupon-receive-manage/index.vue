<template>
  <div class="manage-container">
    <search-form :formOptions="formOptions" :showNum="7" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small">打包</el-button>
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
  name:"coupon-receive-manage",
  data(){
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入优惠券名称",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入手机号码",
        }
      ],
      searchForm: {},
      emptyText: "暂无数据",
      fixedTwoRow: true,
      tableData: [
        
      ],
      tableKey: [
        {
          name: "ID",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "优惠券名称",
          value: "staffName",
        },
        {
          name: "优惠券id",
          value: "staffName",
        },
        {
          name: "用户id",
          value: "staffName",
        },
        {
          name: "手机号码",
          value: "staffName",
        },
        {
          name: "openId",
          value: "staffName",
        },
        {
          name: "目标id",
          value: "staffName",
        },
        {
          name: "目标名称",
          value: "staffName",
        },
        {
          name: "邀请码",
          value: "staffName",
        },
        {
          name: "创建时间",
          value: "staffName",
        },
        {
          name: "更新时间",
          value: "staffName",
        }
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },

      loading: false,
    }
  },
  mounted () {
    this.getTableData()
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
      console.log('管理的页面')
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
.manage-container {
  
}
</style>

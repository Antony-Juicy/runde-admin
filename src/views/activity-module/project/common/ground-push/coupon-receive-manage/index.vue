<template>
  <div class="manage-container">
    <search-form :formOptions="formOptions" :showNum="7" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="exportFile">打包</el-button>
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
          prop: "couponName",
          element: "el-input",
          placeholder: "请输入优惠券名称",
        },
        {
          prop: "phone",
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
          value: "couponName",
        },
        {
          name: "优惠券id",
          value: "couponId",
        },
        {
          name: "用户id",
          value: "userId",
        },
        {
          name: "手机号码",
          value: "phone",
        },
        {
          name: "openId",
          value: "openid",
        },
        {
          name: "目标id",
          value: "tragetId",
        },
        {
          name: "目标名称",
          value: "tragetName",
        },
        {
          name: "邀请码",
          value: "invitationCode",
        },
        {
          name: "创建时间",
          value: "createAt",
        },
        {
          name: "更新时间",
          value: "updateAt",
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
    getTableData(params = {}){
       this.$fetch("groundPush_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          return item;
        });;
        this.pageConfig.totalCount = res.data.page.totalResult;
      })
     },
    pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    exportFile(){
      this.$fetch("groundPush_export")
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-container {
  
}
</style>

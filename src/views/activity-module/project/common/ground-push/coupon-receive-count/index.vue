<template>
  <div class="count-container">
    <search-form :formOptions="formOptions" :showNum="7" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleExport">导出</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig.sync="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="edit" slot-scope="scope">
           <el-button @click="handleDetail(scope.row)" type="text" size="small"
            >明细</el-button
          >
        </template>
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
          prop: "couponName",
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
          value: "invitationCode",
        },
        {
          name: "优惠券id",
          value: "couponId",
        },
        {
          name: "优惠券名称",
          value: "couponName",
        },
        {
          name: "领取总数",
          value: "countNum",
        },
        {
          name: "操作",
          value: "edit",
          operate: true
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
       this.$fetch("groundPush_statisticslistJsp", {
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
    handleDetail(data){

    },
    handleExport(){
      this.$fetch("groundPush_exportExcelJsp",{
        ...this.searchForm
      }).then(res => {
        this.$common.downLoadFile(res);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.count-container {
  
}
</style>

<template>
  <div class="campus-list">
      <search-form
        :formOptions="formOptions"
        @onSearch="onSearch"
      ></search-form>
      <div class="w-container">
        <!-- <div class="btn-wrapper">
        <el-button type="warning" size="small" @click="handleAdd"
          >导出数据</el-button
        >
      </div> -->
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        :pager-count="5"
        :tbodyHeight="600"
        fixedTwoRow
        @pageChange="pageChange"
        @sortChange="handelSortChange"
      >
        <template slot="index" slot-scope="scope">
          {{scope.$index}}
        </template>
        <template slot="orderCount" slot-scope="scope">
            <span class="link" @click="gotoOrder(scope.row)">{{ scope.row.orderCount }}</span>
        </template>
        <template slot="invitationCount" slot-scope="scope">
            <span class="link" @click="gotoInvite(scope.row)">{{ scope.row.invitationCount }}</span>
        </template>
      </rd-table>
      </div>
  </div>
</template>

<script>

export default {
  name:"campus-list",
  data(){
    return {
      formOptions: [
        {
          prop: "provincialSchoolName",
          element: "el-input",
          placeholder: "请输入省校名称",
        },
         {
          prop: "branchSchoolName",
          element: "el-input",
          placeholder: "请输入分校名称",
        },
      ],
      tableData: [
        // {
        //   "completeOrderCount": 0,
        //   "invitationCount": 0,
        //   "orderCount": 0,
        //   "provincialSchoolId": 0,
        //   "provincialSchoolName": "",
        //   "ranking": 0,
        //   "turnover": 0
        // }
      ],
      tableKey: [
        {
          name: "排名",
          value: "ranking",
          width: 80
        },
         {
          name: "组织",
          value: "provincialSchoolName"
        },
         {
          name: "校区",
          value: "branchSchoolName"
        },
        {
          name: "订单量",
          value: "orderCount",
          sortable: 'custom',
          operate: true
        },
        {
          name: "已成交数",
          value: "completeOrderCount",
          sortable: 'custom'
        },
        {
          name: "实际邀请人数",
          value: "invitationCount",
          sortable: 'custom',
          operate: true
        },
        {
          name: "成交金额",
          value: "turnover",
          sortable: 'custom'
        }
      ],
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      searchForm: {},
       orderForm: {}
    }
  },
  props:{
    liveId: {
      type: Number
    }
  },
  mounted() {
    this.getTableData();
  },
   methods: {
     handleAdd(){},
    onSearch(val) {
      this.searchForm = {
        ...val,
      };
      this.getTableData();
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getTableData();
    },
    handelSortChange(val){
      console.log(val,'valll')
      let sortBy;
      if(val.order == "descending"){
        sortBy = 'DESC'
      }else if(val.order == "ascending"){
        sortBy = 'ASC'
      }else {
        sortBy = null
      }
      if(sortBy){
        this.orderForm = {
          sortBy,
          sortField: val.prop
        };
      }else {
        this.orderForm = {};
      }
      this.getTableData(this.orderForm);
    },
    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".campus-list .el-table",
      });
      this.$fetch("live_branch_school_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        liveId : this.liveId,
        ...this.orderForm
      }).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.totalCount;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
    gotoOrder(val){
      this.$router.push('/crm-module/weapp/live-details/goods-orders')
      this.$emit("close")
    },
    gotoInvite(val){
      this.$router.push('/crm-module/weapp/live-details/goods-orders')
      this.$emit("close")
    }
  }
}
</script>

<style lang="scss" scoped>
.campus-list {
    padding-left: 20px;
    .link {
      color: #409EFF;
      cursor: pointer;
      text-decoration: underline;
    }
}
</style>

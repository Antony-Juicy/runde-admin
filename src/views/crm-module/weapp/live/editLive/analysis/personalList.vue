<template>
  <div class="personal-list">
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
        :emptyText="emptyText"
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
  name:"personal-list",
  data(){
    return {
      emptyText:"暂无数据",
      formOptions: [
        {
          prop: "branchSchoolName",
          element: "el-input",
          placeholder: "请输入校区名称",
        },
         {
          prop: "teacherName",
          element: "el-input",
          placeholder: "请输入老师姓名",
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
          name: "校区",
          value: "branchSchoolName"
        },
         {
          name: "姓名",
          value: "teacherName"
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
        totalCount: 0,
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
    },
    liveName: {
      type: String
    },
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
      this.$fetch("live_page_all_personal_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        liveId : this.liveId,
        ...this.orderForm
      }).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.totalCount;
      })
    },
    gotoOrder(val){
      this.$router.push({
        name: '/crm-module/weapp/live-details/goods-orders'  + '?' + sessionStorage.getItem("router-timeStamp"),
        params: {
          sourceName: this.liveName,
          teacherName: val.teacherName
        } 
      })
      this.$emit("close")
    },
    gotoInvite(val){
      this.$router.push({
        name: '/crm-module/weapp/live-details/invite-count'  + '?' + sessionStorage.getItem("router-timeStamp"),
        params: {
          liveName: this.liveName,
          teacherName: val.teacherName
        } 
      })
      this.$emit("close")
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-list {
    padding-left: 20px;
    .link {
      color: #409EFF;
      cursor: pointer;
      text-decoration: underline;
    }
}
</style>

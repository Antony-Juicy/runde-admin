<template>
  <div class="coupon-detail">
      <search-form
        :formOptions="formOptions"
        @onSearch="onSearch"
      ></search-form>
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
      </rd-table>
  </div>
</template>

<script>

export default {
  name:"coupon-detail",
  data(){
    return {
      formOptions: [
        {
          prop: "nickName",
          element: "el-input",
          placeholder: "昵称",
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "用户手机号",
        },
           {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "领取时间(开始)",
          endPlaceholder: "领取时间(结束)",
          initWidth: true,
          popperClass: "coupon-date"
        },
      ],
      tableData: [
      ],
      tableKey: [
        {
          name: "微信昵称",
          value: "nickName"
        },
         {
          name: "手机号",
          value: "phone"
        },
        {
          name: "领取时间",
          value: "createAt",
        },
        {
          name: "使用时间",
          value: "usageTime"
        },
        {
          name: "是否使用",
          value: "used",
          width: 100
        }
      ],
      pageConfig: {
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
      },
      searchForm:{}
    }
  },
  props: {
    liveCouponId: {
      type: Number
    }
  },
  mounted(){
    this.getTableData();
  },
   methods: {
     handleAdd(){},
      onSearch(val) {
        if(val.time&& val.time.length>0){
          this.searchForm = {
            ...val,
            receiveStart: val.time[0],
            receiveEnd: val.time[1]
          }
        }else {
          this.searchForm = {...val};
        }
        
        this.getTableData();
      },
    pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getTableData();
    },
    handelSortChange(val){
      console.log(val,'valll')
    },
    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".coupon-detail .el-table",
      });
      this.$fetch("live_page_coupon_receive_record", {
        ...this.pageConfig,
        ...params,
        ...this.searchForm,
        liveCouponId: this.liveCouponId
      }).then((res) => {
        this.tableData = res.data.records.map(item => {
          item.used = item.used?'是':'否'
          return item
        });
        this.pageConfig.totalCount = res.data.totalCount;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.coupon-detail {
    padding-left: 20px;
    padding-right: 20px;
    border-top: 1px solid #eee;
}
</style>

<style lang="scss">
.coupon-date {
  .el-time-panel {
    left: -33px;
  }
}
</style>

<template>
  <div class="coupon-detail">
      <search-form
        :formOptions="formOptions"
        @onSearch="onSearch"
      ></search-form>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig="pageConfig"
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
          prop: "menuName",
          element: "el-input",
          placeholder: "昵称",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "用户手机号",
        },
           {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "领取时间(开始)",
          endPlaceholder: "领取时间(结束)",
          initWidth: true,
        },
      ],
      tableData: [
       { id: 1, name: "飞翔的荷兰人3", cutdown: 1608897351706, visit: 2,phone:'15692026183' },
        { id: 2, name: "飞翔的荷兰人2",cutdown: new Date().getTime(),phone:'17092026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 4,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 5,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 6,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 7,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 8,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 9,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 10,name: "飞翔的荷兰人1", phone:'18892026183'  }
      ],
      tableKey: [
        {
          name: "微信昵称",
          value: "index"
        },
         {
          name: "手机号",
          value: "phone"
        },
        {
          name: "领取时间",
          value: "cutdown",
        },
        {
          name: "使用时间",
          value: "menuUrl"
        }
      ],
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        pageSize: 10,
      },
    }
  },
   methods: {
     handleAdd(){},
      onSearch() {},
      pageChange(val) {
      // this.pageConfig.currentPage = val.page;
      // this.pageConfig.pageSize = val.limit;
      // console.log(this.searchForm,'this.searchForm--')
      // this.getTableData({
      //   currentPage: (val && val.page) || 1,
      //   pageSize: (val && val.limit) || 10,
      //   loginUserId,
      //   ...this.searchForm,
      //   parentId: this.parentId
      // });
    },
    handelSortChange(val){
      console.log(val,'valll')
    }
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

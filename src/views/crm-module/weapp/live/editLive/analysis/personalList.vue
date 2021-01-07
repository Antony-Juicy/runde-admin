<template>
  <div class="personal-list">
      <search-form
        :formOptions="formOptions"
        @onSearch="onSearch"
      ></search-form>
      <div class="w-container">
        <div class="btn-wrapper">
        <el-button type="warning" size="small" @click="handleAdd"
          >导出数据</el-button
        >
      </div>
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
  </div>
</template>

<script>

export default {
  name:"personal-list",
  data(){
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入校区名称",
        },
         {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入老师姓名",
        }
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
          name: "排名",
          value: "index",
          operate: true,
          width: 80
        },
         {
          name: "校区",
          value: "phone"
        },
        {
          name: "姓名",
          value: "phone"
        },
        {
          name: "订单量",
          value: "cutdown",
          sortable: 'custom'
        },
        {
          name: "已成交数",
          value: "menuUrl",
          sortable: 'custom'
        },
        {
          name: "实际邀请人数",
          value: "visit",
          sortable: 'custom'
        },
        {
          name: "成交金额",
          value: "menuOrder",
          sortable: 'custom'
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
.personal-list {
    padding-left: 20px;
}
</style>

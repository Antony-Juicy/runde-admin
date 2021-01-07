<template>
  <div class="answer-detail">
    <PieChart/>
      <search-form
        :formOptions="formOptions"
        @onSearch="onSearch"
      ></search-form>
      <div class="w-container">
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig="pageConfig"
        :pager-count="5"
        :tbodyHeight="600"
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
import PieChart from './PieChart'
export default {
  name:"answer-detail",
  data(){
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入昵称",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入用户手机号",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请选择",
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
          name: "微信昵称",
          value: "phone"
        },
        {
          name: "手机号",
          value: "phone"
        },
        {
          name: "选择选项",
          value: "phone"
        },
      ],
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        pageSize: 10,
      },
    }
  },
  components:{
    PieChart
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
.answer-detail {
     padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}
</style>

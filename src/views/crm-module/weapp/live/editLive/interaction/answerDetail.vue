<template>
  <div class="answer-detail">
      <div class="content">
        <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig="pageConfig"
        fixedTwoRow
        highlight-current-row
        @pageChange="pageChange"
      >
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >领取明细</el-button
          >
        </template>
      </rd-table>
      </div>
  </div>
</template>

<script>

export default {
  name:"answer-detail",
  data(){
    return {
      tableData: [
        { id: 1, name: "飞翔的荷兰人3", cutdown: 1608897351706, visit: 2,phone:'15692026183' },
        { id: 2, name: "飞翔的荷兰人2",cutdown: new Date().getTime(),phone:'17092026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
      ],
      tableKey: [
        {
          name: "题型",
          value: "name",
        },
         {
          name: "答题卡题目",
          value: "phone"
        },
        {
          name: "答案",
          value: "cutdown"
        },
        {
          name: "派发时间",
          value: "menuUrl",
        },
        {
          name: "答题人数",
          value: "visit"
        },
        {
          name: "答对人数",
          value: "visit"
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 120
        }
      ],
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        pageSize: 10,
      }
    }
  },
   methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.answer-detail {
  
}
</style>

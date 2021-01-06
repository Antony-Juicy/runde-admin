<template>
  <div class="playback">
      <search-form
      :formOptions="formOptions"
      @onSearch="onSearch"
    ></search-form>
     <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig="pageConfig"
        fixedTwoRow
        @pageChange="pageChange"
      >
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small" style="color: #ffa500"
            >链接</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >导出视频</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >删除</el-button
          >
        </template>
      </rd-table>
  </div>
</template>

<script>

export default {
  name:"playback",
  data(){
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入省校名称"
        }
      ],
       tableData: [
        { id: 1, name: "飞翔的荷兰人3", cutdown: 1608897351706, visit: 2,phone:'15692026183' },
        { id: 2, name: "飞翔的荷兰人2",cutdown: new Date().getTime(),phone:'17092026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
      ],
      tableKey: [
        {
          name: "排名",
          value: "name",
          width: 80
        },
         {
          name: "回放id",
          value: "phone"
        },
        {
          name: "回放名称",
          value: "cutdown"
        },
        {
          name: "开始时间",
          value: "menuUrl",
        },
        {
          name: "结束时间",
          value: "visit"
        },
        {
          name: "来源",
          value: "menuOrder"
        },
        {
          name: "操作",
          value: "edit",
          operate: true
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
     onSearch(){

     },
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
.playback {
    padding-left: 20px;
}
</style>

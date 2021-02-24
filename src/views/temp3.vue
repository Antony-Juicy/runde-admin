<template>
  <div class="post-manage">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        :tbodyHeight="600"
        fixedTwoRow
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >查阅/编辑</el-button
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
    
  </div>
</template>

<script>

export default {
  name:"post-manage",
  data(){
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "商品名称",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "活动名称",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "海报名称",
        }
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
         {
          id: 1,
          name: "飞翔的荷兰人3",
          cutdown: 1608897351706,
          visit: 2,
          phone: "15692026183",
        },
      ],
      tableKey: [
        {
          name: "ID",
          value: "name",
        },
        {
          name: "项目类型",
          value: "phone",
        },
        {
          name: "活动名称",
          value: "cutdown",
        },
        {
          name: "公众号名称",
          value: "menuUrl",
        },
        {
          name: "邀请码类型",
          value: "visit",
        },
        {
          name: "活动时间",
          value: "menuOrder",
        },
        {
          name: "是否强制关注",
          value: "description1",
        },
        {
          name: "是否强制分享",
          value: "description2",
        },
        {
          name: "活动是否隐藏",
          value: "description3",
        },
        {
          name: "活动状态",
          value: "description4",
        },
        {
          name: "活动描述",
          value: "description4",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 140,
        },
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
    }
  },
   methods: {
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(){

     },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>

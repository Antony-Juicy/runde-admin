<template>
  <div class="signupanswer-container">
    <search-form :formOptions="formOptions" :showNum="7" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small">导出</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        :tbodyHeight="600"
        fixedTwoRow
        @pageChange="pageChange"
        :emptyText="emptyText">
        <!-- <template slot="edit" slot-scope="scope">
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
        </template> -->
      </rd-table>
    </div>
  </div>
</template>

<script>
export default {
  name:"signup-answer",
  data(){
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入学员姓名",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入学员手机号",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入科目名称",
        }
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
        
      ],
      tableKey: [
        {
          name: "主键",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "学员名称",
          value: "staffName",
        },
        {
          name: "学员手机号",
          value: "goodsName",
        },
        {
          name: "员工名称",
          value: "activityName",
        },
        {
          name: "校区名称",
          value: "posterName",
        },
        {
          name: "科目名称",
          value: "posterPic",
        },
        {
          name: "遇见问题",
          value: "posterCopyFirst",
        },
        {
          name: "信息类型",
          value: "posterCopySecond",
        }
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
    }
  },
  methods: {
    onSearch(val){
      this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.pageConfig.pageNum = 1;
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
    handleAdd(){
      
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    },
    handleEdit(data){
      
    },
    handleDelete(row) {
      let info = '海报';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$fetch("projectType_delete", {
          typeId: row.typeId,
          loginUserId,
        }).then((res) => {
          if (res) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            setTimeout(() => {
              this.getTableData();
            }, 50);
          }
        });
      }).catch(() => {

      });
    }
  }
}
</script>

<style lang="scss" scoped>
.signupanswer-container {

}
</style>

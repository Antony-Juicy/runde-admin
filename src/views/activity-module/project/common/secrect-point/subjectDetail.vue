<template>
  <div class="subject-detail">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
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
            >编辑</el-button
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

      <rd-dialog
        :title="'编辑'"
        :dialogVisible="addVisible"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
        append-to-body
      >
        <RdForm :formOptions="addFormOptions" :rules="addRules" ref="dataForm3">
          <template slot="temp">
            <el-button size="small" type="primary">点击下载模板</el-button>
        </template>
        </RdForm>
      </rd-dialog>

  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"temp",
  data(){
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入题号",
        }
      ],
      searchForm: {},
      tableData:[
        {name: 123}
      ],
      tableKey: [
        {
          name: "id主键",
          value: "name",
        },
        {
          name: "科目名称",
          value: "name",
        },
        {
          name: "题目序号",
          value: "name",
        },
        {
          name: "题目内容",
          value: "name",
        },
        {
          name: "描述",
          value: "name",
        },
        {
          name: "数据状态",
          value: "name",
        },
        {
          name: "创建时间",
          value: "name",
        },
        {
          name: "更新时间",
          value: "name",
        },
        {
          name: "操作",
          value: "edit",
          operate: true
        }
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      emptyText:"暂无数据",
      addVisible: false,
      addFormOptions:[
        {
          prop: "roleName",
          element: "el-input",
          placeholder: "请输入题目内容",
          label: "题目内容",
          type:"textarea",
          rows: 3
        },
         {
          prop: "roleName",
          element: "el-input",
          placeholder: "请输入题目图片",
          label: "题目图片",
          type:"textarea",
          rows: 3
        },
          {
          prop: "roleName",
          element: "el-input",
          placeholder: "请输入描述",
          label: "描述",
          type:"textarea",
          rows: 2
        },
         {
          prop: "roleName",
          element: "el-input",
          placeholder: "请输入题目序号",
          label: "题目序号"
        }
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      },
    }
  },
  components:{
    RdForm
  },
   methods: {
      onSearch(val) {
        this.searchForm = {
          ...val
        };
      },
      pageChange(val) {
        console.log(val,'pagechange')
        this.pageConfig.currentPage = val.page;
        this.pageConfig.showCount = val.limit;
        this.getTableData();
      },
      getTableData(){

      },
      handleEdit(data){
        this.addVisible = true;
      },
      submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    },
    handleDelete(row) {
      let info = '题目';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
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
        })
        .catch(() => {});
    }
  }
}
</script>

<style lang="scss" scoped>
.subject-detail {

}
</style>

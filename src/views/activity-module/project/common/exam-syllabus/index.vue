<template>
  <div class="post-manage">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >添加</el-button
        >
      </div>
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
          <el-button @click="handlePreview(scope.row)" type="text" size="small" style="color: #ffa500"
            >预览答案图片</el-button
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
    
    <!-- 添加海报 -->
    <rd-dialog
        :title="addStatus?'添加科目':'编辑科目'"
        :dialogVisible="addVisible"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3">
          <template slot="post">
            <el-button size="small" type="primary">上传海报</el-button>
          </template>
        </RdForm>
      </rd-dialog>

       <!-- 预览答案图片 -->
      <rd-dialog
        :title="'预览答案图片'"
        :dialogVisible="previewVisible"
        :showFooter="false"
        @handleClose="previewVisible = false"
      >
        预览答案图片
      </rd-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"post-manage",
  data(){
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "项目",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "科目名称",
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
          name: "ID主键",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "项目名称",
          value: "staffName",
        },
        {
          name: "科目名称",
          value: "goodsName",
        },
        {
          name: "科目启动时间",
          value: "activityName",
        },
        {
          name: "科目结束时间",
          value: "posterName",
        },
        {
          name: "是否分享",
          value: "posterPic",
          width: 60
        },
        {
          name: "答案图片",
          value: "posterCopyFirst",
        },
        {
          name: "题库版本号",
          value: "posterCopySecond",
          width: 60
        },
        {
          name: "视频链接",
          value: "posterCopyThird",
          width: 60
        },
        {
          name: "视频首页图",
          value: "posterCopyFourth",
          width: 60
        },
        {
          name: "排序",
          value: "posterCopyFifth",
          width: 60
        },
        {
          name: "创建时间",
          value: "createAt",
        },
        {
          name: "更新时间",
          value: "updateAt",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 200,
          fixed: "right"
        },
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      addVisible: false,
      addFormOptions: [
         {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "项目名称",
          options: [
          ]
        },  
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入",
          label: "科目名称"
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "科目启动时间",
          endPlaceholder: "科目结束时间",
          initWidth: true,
          label: "科目启动时间",
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "是否分享",
          options: [
            {
              label: "是",
              value: "0",
            },
            {
              label: "否",
              value: 1,
            },
          ],
        },
         {
          prop: "upload",
          element: "el-input",
          placeholder: "请输入",
          label: "图片上传",
          operate: true
        },
         {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入",
          label: "视频链接",
          type: "textarea",
          rows: 2
        },
         {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入",
          label: "视频首页图",
          type: "textarea",
          rows: 2
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入",
          label: "排序"
        },
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      },
      addStatus: true,
      previewVisible: false
    }
  },
  components:{
    RdForm
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
    handleAdd(){
      this.addVisible = true;
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    },
    handleEdit(data){
      this.addStatus = false;
      this.addVisible = true;
    },
    handleDelete(row) {
      let info = '海报';
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
    },
    handlePreview(data){
      this.previewVisible = true;
    },
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>

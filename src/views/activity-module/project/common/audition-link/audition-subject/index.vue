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
          <el-button @click="uploadSubject(scope.row)" type="text" size="small" style="color: #ffa500"
            >上传题目</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDetail(scope.row)" type="text" size="small" style="color: #ffa500"
            >查看题目详情</el-button
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
    
    <!-- 添加/编辑 -->
    <rd-dialog
        :title="addStatus?'添加':'编辑'"
        :dialogVisible="addVisible"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3">
        </RdForm>
      </rd-dialog>

      <!-- 上传 -->
      <rd-dialog
        :title="'上传题目'"
        :dialogVisible="uploadVisible"
        @handleClose="uploadVisible = false"
        @submitForm="submitAddForm('dataForm4')"
      >
        <el-button type="primary">点击上传</el-button>
      </rd-dialog>

      <!-- 题目详情 -->
      <fullDialog
          v-model="detailVisible"
          title="题目详情"
          @change="detailVisible = false"
        >
          <subjectRecord
            ref="subjectRecord"
            @close="detailVisible = false"
            v-if="detailVisible"
          />
      </fullDialog>
      <!-- <editSubject/> -->
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import subjectRecord from "./subjectRecord";
import fullDialog from "@/components/FullDialog";
import editSubject from './editSubject';
export default {
  name:"link-manage",
  data(){
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "APP名称",
          options: [
            {
              label:"考药狮",
              value: "1"
            },
            {
              label:"考医狮",
              value: "2"
            },
            {
              label:"考护狮",
              value: "3"
            }
          ]
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
          name: "APP名称",
          value: "staffName",
        },
        {
          name: "考药狮项目id",
          value: "goodsName",
        },
        {
          name: "考药狮项目名称",
          value: "activityName",
        },
        {
          name: "科目类型(中文)",
          value: "posterName",
        },
        {
          name: "科目类型(英文)",
          value: "posterPic",
        },
        {
          name: "科目名",
          value: "posterCopyFirst",
        },
        {
          name: "视频id",
          value: "posterCopySecond",
        },
        {
          name: "视频名称",
          value: "posterCopyThird",
        },
        {
          name: "视频时长",
          value: "posterCopyFourth",
        },
        {
          name: "科目学习人数",
          value: "posterCopyFifth",
        },
        {
          name: "虚拟人数",
          value: "createAt",
        },
        {
          name: "数据状态",
          value: "updateAt",
        },
         {
          name: "排序",
          value: "updateAt",
        },
         {
          name: "创建时间",
          value: "updateAt",
        },
         {
          name: "更新时间",
          value: "updateAt",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 170,
          fixed: "right"
        },
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      addVisible: false,
      addFormOptions: [
          
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择",
          label: "APP名称"
        },
        {
          prop: "post",
          element: "el-select",
          placeholder: "请选择",
          label: "项目名称",
        },
        {
          prop: "post",
          element: "el-select",
          placeholder: "请选择",
          label: "科目类型",
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "科目名称"
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "视频名称"
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "视频id"
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "视频时长"
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "虚拟人数"
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "排序"
        },
        {
          prop: "menuName3",
          element: "el-select",
          placeholder: "请选择",
          label: "状态"
        },
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      },
      addStatus: true,
      uploadVisible: false,
      detailVisible: false
    }
  },
  components:{
    RdForm,
    subjectRecord,
    fullDialog,
    editSubject
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
      let info = '项';
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
    uploadSubject(data){
      this.uploadVisible = true;
    },
    handleDetail(data){
      this.detailVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>

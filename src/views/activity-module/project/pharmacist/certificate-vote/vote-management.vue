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
        <el-button type="info" size="small" @click="handleAdd"
          >下载</el-button
        >
        <el-button type="danger" size="small" @click="handleAdd"
          >全部暂停</el-button
        >
        <el-button type="success" size="small" @click="handleAdd"
          >全部恢复</el-button
        >
        <el-button type="warning" size="small" @click="handleAdd"
          >导出作品图片</el-button
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
          <el-button @click="handleDetail(scope.row)" type="text" size="small" style="color: #ffa500"
            >下载</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDetail(scope.row)" type="text" size="small" style="color: #ffa500"
            >换模板</el-button
          >
        </template>
      </rd-table>
    </div>
    
    <!-- 添加 -->
    <fullDialog
        v-model="addVisible"
        title="添加"
        @change="addVisible = false"
      >
        <AddVote
          ref="AddAct"
          @close="addVisible = false"
          @refresh="refresh"
          v-if="addVisible"
        />
      </fullDialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import fullDialog from "@/components/FullDialog";
import AddVote from "./AddVote"
export default {
  name:"post-manage",
  data(){
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "活动名称",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "项目类型",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "微信用户",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "作品状态",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "自动投票",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "排序字段",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "排序方式",
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "参赛时间(开始)",
          endPlaceholder: "参赛时间(结束)",
          initWidth: true,
        },
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
          name: "作品",
          value: "staffName",
        },
        {
          name: "姓名",
          value: "goodsName",
        },
        {
          name: "昵称",
          value: "activityName",
        },
        {
          name: "手机",
          value: "posterName",
        },
        {
          name: "活动名称",
          value: "posterPic",
        },
        {
          name: "项目类型",
          value: "posterCopyFirst",
        },
        {
          name: "投票信息",
          value: "posterCopySecond",
        },
        {
          name: "自动投票",
          value: "posterCopyThird",
        },
        {
          name: "状态",
          value: "posterCopyFourth",
        },
        {
          name: "描述",
          value: "posterCopyFifth",
        },
        {
          name: "参赛时间",
          value: "createAt",
        },
        {
          name: "操作人",
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
          element: "el-input",
          placeholder: "请输入海报名称",
          label: "海报名称"
        },
        {
          prop: "post",
          element: "el-input",
          placeholder: "",
          label: "上传海报",
          operate: true,
          initValue: 0
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "所属九块九包邮",
          options: [
            {
              label: "博士",
              value: "0",
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "所属活动",
          options: [
            {
              label: "博士",
              value: "0",
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案一",
          type:"textarea",
          rows: 2
        },
         {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案二",
          type:"textarea",
          rows: 2
        },
         {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案三",
          type:"textarea",
          rows: 2
        },
         {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案四",
          type:"textarea",
          rows: 2
        },
           {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案五",
          type:"textarea",
          rows: 2
        }
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      },
      addStatus: true
    }
  },
  components:{
    RdForm,
    fullDialog,
    AddVote
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
    refresh(){

    }
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>

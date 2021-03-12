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
    
    <!-- 添加 -->
    <rd-dialog
        :title="addStatus?'添加':'编辑'"
        :dialogVisible="addVisible"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3">
          <template slot="post">
            <el-button size="small" type="primary">上传</el-button>
          </template>
        </RdForm>
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
          element: "el-input",
          placeholder: "微信昵称",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "手机",
        },
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
          placeholder: "参赛选手",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "微信用户",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "投票类型",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "投票状态",
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
          name: "头像",
          value: "staffName",
        },
        {
          name: "昵称",
          value: "goodsName",
        },
        {
          name: "手机",
          value: "activityName",
        },
        {
          name: "本次投票",
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
          name: "参赛者姓名",
          value: "posterCopySecond",
        },
        {
          name: "地理位置",
          value: "posterCopyThird",
        },
        {
          name: "投票类型",
          value: "posterCopyFourth",
        },
        {
          name: "投票状态",
          value: "posterCopyFifth",
        },
        {
          name: "投票时间",
          value: "createAt",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 140,
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
          label: "微信用户"
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择",
          label: "参赛选手"
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入",
          label: "本次投票数"
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择",
          label: "投票类型"
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择",
          label: "投票状态"
        }
      ]
        
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
      let info = '';
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
.post-manage {

}
</style>

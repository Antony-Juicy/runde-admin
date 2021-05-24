<template>
  <div class="view-detail">
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
        <el-button type="warning" size="small" @click="importVisible = true"
          >导入</el-button
        >
        <el-button type="success" size="small" @click="handleDistribute"
          >批量分配</el-button
        >
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        fixedTwoRow
        :multiple="true"
        @pageChange="pageChange"
        @select="handelSelect"
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
            style="color: #67c23a"
            >分配</el-button
          >
        </template>
      </rd-table>
    </div>
    
    <!-- 分配 -->
    <rd-dialog
        :title="'分配'"
        :dialogVisible="distributeStatus"
        @handleClose="distributeStatus = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <RdForm :formOptions="distributeFormOptions" formLabelWidth="150px" :rules="addRules" ref="dataForm3">
          <template slot="post">
            <el-button size="small" type="primary">上传</el-button>
          </template>
        </RdForm>
      </rd-dialog>

      <!-- 添加、编辑 -->
      <full-dialog
        v-model="addVisible"
        :title="addStatus?'添加':'编辑'"
        @change="addVisible = false"
      >
        <CreatChain v-if="addVisible" :chainId="editId" :editData="editData" :addStatus="addStatus" @close="handleAddClose"/>
      </full-dialog>

      <!-- 导入 -->
      <rd-dialog
        :title="'导入'"
        :dialogVisible="importVisible"
        @handleClose="importVisible = false"
        @submitForm="submitImportForm('dataForm4')"
      >
        <el-form ref="dataForm4" :model="importForm" label-width="80px">
          <el-form-item label="文件" prop="excel">
            <uploadFile :file.sync="importForm.excel"/>
          </el-form-item>
        </el-form>
    </rd-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import CreatChain from "./creat-chain";
import uploadFile from "@/components/Activity/uploadFile";
export default {
  name:"view-detail",
  data(){
    return {
      importForm:{
        excel:""
      },
      importVisible: false,
      formOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "客户名称",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "是否分配",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "合作等级",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "状态",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "所属校区",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "所属分校",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "跟进老师",
          options: []
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
          name: "连锁名称",
          value: "chainName",
        },
        {
          name: "所属集团",
          value: "group",
        },
        {
          name: "规模排名",
          value: "scaleRanking",
        },
        {
          name: "门店数量",
          value: "storeCount",
        },
        {
          name: "员工数量",
          value: "employeeCount",
        },
        {
          name: "是否签订协议",
          value: "signAgreement",
        },
        {
          name: "合作等级",
          value: "cooperationLevel",
        },
        {
          name: "学员数量",
          value: "studentCount",
        },
        {
          name: "跟进情况",
          value: "followUpSituation",
        },
        {
          name: "省校",
          value: "provincialSchool",
        },
        {
          name: "分校",
          value: "branchSchool",
        },
        {
          name: "跟进人",
          value: "followUpUser",
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
        pageNum: 1,
        pageSize: 10,
      },
      addVisible: false,
      distributeStatus:false,
      distributeFormOptions:[
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "所属组织",
          options: [
          ],
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "所属校区",
          options: [
          ],
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "所属分校",
          options: [
          ],
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "跟进老师",
          options: [
          ],
        },
        {
          prop: "roleName2",
          element: "el-date-picker",
          placeholder: "请选择",
          label: "首次跟进截止时间",
          type: "datetime"
        },
      ],
      addFormOptions: [
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "所属九块九包邮",
          options: [
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
      addStatus: true,
      editId:"",
      selectedData:"",
      editData:{}
    }
  },
  components:{
    RdForm,
    CreatChain,
    uploadFile
  },
  mounted(){
    this.getTableData();
  },
   methods: {
     handleAddClose(){
       this.addVisible = false;
       this.getTableData();
     },
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(params = {}) {
      this.$fetch("chain_pageList", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        chainType:"CHAIN_CUSTOMER"
      }).then((res) => {
        this.tableData = res.data.records.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          return item;
        });
        this.pageConfig.totalCount = res.data.totalCount;
      })
    },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.pageNum = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleAdd(){
      this.addStatus = true;
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
      this.editId = data.chainId;
      this.editData = data;
    },
    handleDelete(row) {
      let info = '';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$fetch("projectType_delete", {
            id: row.chainId
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
    handelSelect(val) {
      console.log(val, "valll");
      this.selectedData = val;
    },
    handleDistribute(){
      this.distributeStatus = true;
    },
    submitImportForm(){
      if(!this.importForm.excel){
        this.$message.warning("请上传文件")
        return
      }
      let obj = new FormData();
      obj.append("file",this.importForm.excel)
      this.$fetch("chain_importChainByExcel",obj).then(res => {
        this.$message.success("操作成功")
        this.getTableData()
        this.importVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.view-detail {

}
</style>

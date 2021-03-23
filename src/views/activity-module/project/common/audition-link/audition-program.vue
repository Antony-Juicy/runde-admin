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
          <el-button @click="handleUpload(scope.row)" type="text" size="small" style="color: #ffa500"
            >上传AI题目</el-button
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
    
    <!-- 添加 -->
    <rd-dialog
        :title="addStatus?'添加':'编辑'"
        :dialogVisible="addVisible"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('ruleForm')"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="APP名称" prop="appName">
            <el-select v-model="ruleForm.appName" placeholder="请选择" @change="appNameChange">
              <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in appNameArr" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称" prop="productType">
            <el-select v-model="ruleForm.productType" placeholder="请选择">
              <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in productTypeArr"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择文件" prop="excel" v-if="addStatus">
            <uploadFile :file.sync="ruleForm.excel"/>
          </el-form-item>
        </el-form>
      </rd-dialog>

      <!-- 上传题目 -->
      <uploadFileDialog 
        :importVisible.sync="importVisible" 
        :importId="importId"
        url="auditionproduct_importIssueExcel" 
        @refresh="getTableData"/>

      <!-- 题目详情 -->
      <el-drawer
          :visible.sync="detailVisible"
          title="题目详情"
          size="50%"
        >
          <subjectDetail
            ref="subjectDetail"
            @close="detailVisible = false"
            :id="drawerId"
          />
      </el-drawer>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import uploadFile from '@/components/Activity/uploadFile';
import uploadFileDialog from '@/components/Activity/uploadFileDialog';
import subjectDetail from "@/components/Activity/subjectDetail";
export default {
  name:"audition-program",
  data(){
    return {
      file:"",
      formOptions: [
        {
          prop: "appName",
          element: "el-select",
          placeholder: "APP名称",
          options: [
          ]
        }
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
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
          value: "appName",
        },
        {
          name: "考药狮项目id",
          value: "productId",
        },
        {
          name: "考药狮项目名称",
          value: "productName",
        },
        {
          name: "数据状态",
          value: "status",
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
          width: 160,
          fixed: "right"
        },
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      addVisible: false,
      addStatus: true,
      detailVisible: false,
      ruleForm:{
        appName:"",
        productType:"",
        excel: ""
      },
      rules: {
        appName:  [
          { required: true, message: "请选择", trigger: "blur" },
        ]
      },
      appNameArr: [],
      productTypeArr:[],
      editId:"",
      importId:"",
      importVisible: false,
      drawerId:""
    }
  },
  components:{
    RdForm,
    subjectDetail,
    uploadFile,
    uploadFileDialog
  },
  mounted(){
    this.getTableData();
  },
   methods: {
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(params = {}){
       this.$fetch("auditionproduct_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          return item;
        });;
        this.pageConfig.totalCount = res.data.page.totalResult;

        let appNameList = res.data.appNameList.map(item => ({
          label: item.value,
          value: item.key
        }))

        // this.productTypeArr = appNameList;
        this.appNameArr = appNameList;
      })
     },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleAdd(){
      this.addStatus = true;
      this.addVisible = true;
      this.ruleForm = {
        appName:"",
        productType:"",
        excel: ""
      }
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          const { appName, productType, excel } = this.ruleForm;
            let productObj = this.productTypeArr.find(item => (item.value == productType));
            let productTypeName = (productObj && productObj.label) || '';
          if(this.addStatus){  
            let obj = new FormData();
            obj.append("appName", appName);
            obj.append("productType", productTypeName?`${productType}/${productTypeName}`: ``);
            obj.append("excel", excel);
            this.$fetch("auditionproduct_importIssueExcel",obj).then(res => {
              this.$message.success("操作成功")
              this.getTableData();
              this.addVisible = false;
            })
          }else {
            const { appName, productType} = this.ruleForm;
            this.$fetch("auditionproduct_editJsp",{
               appName, 
               productType: productTypeName?`${productType}/${productTypeName}`: ``,
               id: this.editId
            }).then(res => {
              this.$message.success("操作成功")
              this.getTableData();
              this.addVisible = false;
            })
          }
        }
          
      });
    },
    handleEdit(data){
      this.addStatus = false;
      this.addVisible = true;
      this.ruleForm.appName = data.appName_text;
      this.appNameChange(data.appName_text, data.productId)
      this.editId = data.id;
      // this.ruleForm.productType = data.productId;
    },
    handleDelete(row) {
      let info = '项';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("auditionproduct_deleteJsp", {
            id: row.id
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
    handleDetail(data){
      this.detailVisible = true;
      this.drawerId = data.id;
    },
    appNameChange(data,val){
      this.ruleForm.productType = "";
      // 获取项目名称下拉
      this.$fetch("auditionitemsubject_getProductName",{
        appName: data
      }).then(res => {
        this.productTypeArr = res.data.map(item => ({
          label: item.typeName,
          value: item.id
        }))
        if(val){
          this.ruleForm.productType = val;
        }
      })
    },
    handleUpload(data){
      this.importVisible = true;
      this.importId = data.id;
    }
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>

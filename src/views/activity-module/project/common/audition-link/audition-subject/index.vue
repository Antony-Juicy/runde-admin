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
          <template slot="appName">
            <el-select v-model="appName" placeholder="请选择" @change="appNameChange">
              <el-option
                v-for="item in appNameArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
          <template slot="productId">
            <el-select v-model="productId" placeholder="请选择" @change="productIdChange">
              <el-option
                v-for="item in productIdArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
          <template slot="subjectType">
            <el-select v-model="subjectType" placeholder="请选择">
              <el-option
                v-for="item in subjectTypeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </RdForm>
      </rd-dialog>

      <!-- 上传 -->
      <!-- <rd-dialog
        :title="'上传题目'"
        :dialogVisible="uploadVisible"
        @handleClose="uploadVisible = false"
        @submitForm="submitAddForm('dataForm4')"
      >
        <el-button type="primary">点击上传</el-button>
      </rd-dialog> -->
      <uploadFile 
        :importVisible.sync="uploadVisible" 
        :importId="importId"
        url="auditionitemsubject_importIssueExcel" 
        @refresh="getTableData"/>

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
import uploadFile from '@/components/Activity/uploadFileDialog';
export default {
  name:"audition-subject",
  data(){
    return {
      importId:"",
      appName:"",
      productId:"",
      subjectType:"",
      appNameArr:[],
      productIdArr:[],
      subjectTypeArr:[],
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
          options: [
          ]
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
          name: "科目类型(中文)",
          value: "subjectTypeText",
        },
        {
          name: "科目类型(英文)",
          value: "subjectType",
        },
        {
          name: "科目名",
          value: "subjectName",
        },
        {
          name: "视频id",
          value: "videoId",
        },
        {
          name: "视频名称",
          value: "videoName",
        },
        {
          name: "视频时长",
          value: "videoTimes",
        },
        {
          name: "科目学习人数",
          value: "count",
        },
        {
          name: "虚拟人数",
          value: "virtualCount",
        },
        {
          name: "数据状态",
          value: "status",
        },
         {
          name: "排序",
          value: "orderValue",
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
          width: 170,
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
          prop: "appName",
          element: "el-select",
          placeholder: "请选择",
          label: "APP名称",
          operate: true,
          initValue:"1",
          options:[]
        },
        {
          prop: "productId",
          element: "el-select",
          placeholder: "请选择",
          label: "项目名称",
          operate: true,
          options: []
        },
        {
          prop: "subjectType",
          element: "el-select",
          placeholder: "请选择",
          label: "科目类型",
          operate: true,
          options: []
        },
        {
          prop: "subjectName",
          element: "el-input",
          placeholder: "请输入",
          label: "科目名称"
        },
        {
          prop: "videoName",
          element: "el-input",
          placeholder: "请输入",
          label: "视频名称"
        },
        {
          prop: "videoId",
          element: "el-input",
          placeholder: "请输入",
          label: "视频id"
        },
        {
          prop: "videoTimes",
          element: "el-input",
          placeholder: "请输入",
          label: "视频时长"
        },
        {
          prop: "virtualCount",
          element: "el-input",
          placeholder: "请输入",
          label: "虚拟人数"
        },
        {
          prop: "orderValue",
          element: "el-input",
          placeholder: "请输入",
          label: "排序"
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择",
          label: "状态",
          options: [
               {
              label: "已开放",
              value: "Open",
            },
            {
              label: "未开放",
              value: "Close",
            }
          ]
        },
      ],
      addRules:{
        appName: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        subjectName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        videoName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        videoId: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        videoTimes: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        virtualCount: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        orderValue: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        status: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
      },
      addStatus: true,
      uploadVisible: false,
      detailVisible: false,
      editId:""
    }
  },
  components:{
    RdForm,
    subjectRecord,
    fullDialog,
    editSubject,
    uploadFile
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
       this.$fetch("auditionitemsubject_listJsp", {
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

        this.formOptions[0].options = appNameList;
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
      this.addVisible = true;
      this.addStatus = true;
      this.resetForm();
    },
    submitAddForm(formName){
      if(!this.appName){
        this.$message.error("请选择APP名称")
        return
      }
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          let obj1 = this.productIdArr.find(item => (item.value == this.productId));
          let productName = obj1 && obj1.label;
          let obj2 = this.subjectTypeArr.find(item => (item.value == this.subjectType));
          let subjectTypeName = obj2 && obj2.label;
          let subjectTypeNameEn = obj2 && obj2.enName;
          this.$fetch(this.addStatus?"auditionitemsubject_save":"auditionitemsubject_editJsp",{
            ...formData,
            id: this.addStatus?"":this.editId,
            appName: this.appName,
            productId: this.productId,
            productType: `${this.productId}/${productName}`,
            subjectType: `${this.subjectType}/${subjectTypeNameEn}/${subjectTypeName}`
          }).then(res => {
            this.$message.success("操作成功")
            this.addVisible = false;
            this.getTableData();
            
          })
          
        }
          
      });
    },
    handleEdit(data){
      this.addStatus = false;
      this.addVisible = true;
      this.editId = data.id;
       this.$fetch("auditionitemsubject_goEdit",{
        id: data.id
      }).then( async res => {
        this.addFormOptions.forEach(item => {
          item.initValue = res.data.pd[item.prop];
        })
        setTimeout(() => {
          this.$refs.dataForm3.addInitValue();
        }, 0);
        this.appName = res.data.pd.appName;
        await this.appNameChange(this.appName,res.data.pd.productId);
        this.productIdChange(res.data.pd.productId,res.data.pd.subjectTypeId);
      })
      
      
    },
    handleDelete(row) {
      let info = '项';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("auditionitemsubject_deleteJsp", {
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
    uploadSubject(data){
      this.uploadVisible = true;
      this.importId = data.id;
    },
    handleDetail(data){
      // this.detailVisible = true;
      // 跳转科目题目
      this.$router.push({
        name: '/activity-module/project/common/audition-link/subject-title'  + '?' + sessionStorage.getItem("router-timeStamp"),
        params: {
          subjectId: data.id,
        } 
      })
    },
    appNameChange(data,val){
      return new Promise((resolve,reject) => {
        this.$fetch("auditionitemsubject_getProductName",{
            appName: data
          }).then(res => {
            
            this.productIdArr = res.data?res.data.map(item => ({
              label: item.typeName,
              value: item.id
            })):[]
            this.productId = ""
            this.subjectType = ""
            this.subjectTypeArr = []
            if(val) {
              this.productId = val;
            }
            resolve();
          })
      })
      
    },
    productIdChange(data,val){
      let obj = this.productIdArr.find(item => (item.value == data));
      let productTypeName = obj && obj.label;
      this.$fetch("auditionitemsubject_getSubjectType",{
        appName: this.appName,
        productType: `${data}/${productTypeName}`
      }).then(res => {
     
        this.subjectTypeArr = res.data?res.data.map(item => ({
          label: item.subjectTypeText,
          value: item.id,
          enName: item.subjectType
        })):[]
        this.subjectType = ""
        if(val){
          this.subjectType = val;
        }
      })
    },
    resetForm(){
      this.appName = "";
      this.productId = "";
      this.subjectType = "";
      this.productIdArr = [];
      this.subjectTypeArr = [];
      this.addFormOptions.forEach(item => {
        item.initValue = "";
      })
      this.addFormOptions[0].initValue = 0;
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);
    }
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>

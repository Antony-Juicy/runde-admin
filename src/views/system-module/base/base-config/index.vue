<template>
  <div class="base-config">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="success" size="small" @click="handleAdd" icon="el-icon-plus"
          >添加</el-button
        >
        <el-button type="primary" size="small" @click="handleContract" icon="el-icon-upload"
          >上传电子合同生成模板ID</el-button
        >
        <el-button type="danger" size="small" @click="handleBg" icon="el-icon-upload"
          >上传登陆页背景图</el-button
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
        @handleClose="handleClose"
        @submitForm="submitAddForm('dataForm3')"
      >
        <RdForm :formOptions="addFormOptions" formLabelWidth="100px" :rules="addRules" ref="dataForm3">
          <template slot="post">
            <el-button size="small" type="primary">上传</el-button>
          </template>
        </RdForm>
    </rd-dialog>

    <!-- 上传电子合同 -->
    <rd-dialog
        :title="'上传电子合同'"
        :dialogVisible="contractVisible"
        @handleClose="contractVisible = false"
        @submitForm="submitContractForm()"
      >
        <el-form ref="form" label-width="80px">
            <el-form-item label="文件">
                <uploadFile :file.sync="contractFile" accept=".pdf"/>
            </el-form-item>
        </el-form>
    </rd-dialog>

    <!-- 上传登陆页背景图片 -->
    <rd-dialog
        :title="'上传登陆页背景图片'"
        :dialogVisible="bgVisible"
        @handleClose="bgVisible = false"
        @submitForm="submitBgForm()"
      >
        <el-form ref="form" label-width="80px">
            <el-form-item label="登陆页背景图">
                {{bgPic}}
                <Upload-oss
                    :objConfig="{module: 'bg', project: 'runde_jiaowu', dir:'web', name:'bg.png', raw: true}"
                    :src.sync="bgPic"
                    @change="bgChange"
                    />
            </el-form-item>
        </el-form>
    </rd-dialog>

  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import uploadFile from "@/components/Activity/uploadFile";
import UploadOss from "@/components/UploadOss";
export default {
  name:"base-config",
  data(){
    return {
      formOptions: [
        {
          prop: "configKey",
          element: "el-input",
          placeholder: "key主键",
        },
        {
          prop: "configValue",
          element: "el-input",
          placeholder: "属性值",
        }
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
      ],
      tableKey: [
        {
          name: "key主键(键值对key)",
          value: "configKey",
        },
        {
          name: "属性值(键值对value)",
          value: "configValue",
        },
        {
          name: "描述说明",
          value: "remark",
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
      contractVisible: false,
      bgVisible: false,
      contractFile: null,
      bgPic:"",
      bgPic2:"",
      addFormOptions: [
          
        {
          prop: "configKey",
          element: "el-input",
          placeholder: "请输入",
          label: "key主键(键值对key)"
        },
        {
          prop: "configValue",
          element: "el-input",
          placeholder: "请输入",
          label: "属性值(键值对value)",
          type:"textarea",
          rows: 5
        },
         {
          prop: "remark",
          element: "el-input",
          placeholder: "请输入",
          label: "描述说明",
          type:"textarea",
          rows: 5
        }
      ],
      addRules:{
        configKey: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        configValue: [
          { required: true, message: "请输入", trigger: "blur" },
        ]
      },
      addStatus: true,
      editId:""
    }
  },
  components:{
    RdForm,
    uploadFile,
    UploadOss
  },
  mounted(){
    this.getTableData()
  },
   methods: {
     bgChange(){
       console.log('change')
       this.$forceUpdate();
       this.bgPic = this.bgPic + `?${Date.now()}`
     },
     getTableData(params = {}){
       this.$fetch("baseconfig_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.phone = this.$common.hidePhone(item.phone);
          
          return item;
        });;
        this.pageConfig.totalCount = res.data.page.totalResult;
      })
     },
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
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
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          this.$fetch(this.addStatus?"baseconfig_save":"baseconfig_editJsp",{
            id: this.addStatus?"": this.editId,
            ...formData
          }).then(res => {
            this.$message.success("操作成功")
            this.addVisible = false;
            this.getTableData();
          })
        }
          
      });
    },
    submitContractForm(){
      if(!this.contractFile){
        this.$message.error("请上传文件")
        return
      }
      let obj = new FormData();
      obj.append("file",this.contractFile)
      this.$fetch("baseconfig_saveImport",obj).then(res => {
        this.$message.success("操作成功")
        this.getTableData()
        this.contractVisible = false
      })
    },
    submitBgForm(){
        
    },
    handleBg(){
      this.bgVisible = true;
    },
    handleEdit(data){
      this.addStatus = false;
      this.addVisible = true;
      this.editId = data.id;
      this.addFormOptions.forEach(item => {
           item.initValue = data[item.prop];
      })
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);
    },
    handleDelete(row) {
      let info = '';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("baseconfig_deleteJsp", {
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
    handleContract(){
        this.contractVisible = true;
    },
    handleClose(){
      this.addVisible = false;
       this.$refs.dataForm3.onReset();
    }
  }
}
</script>

<style lang="scss" scoped>
.base-config {

}
</style>

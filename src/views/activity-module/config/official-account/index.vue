<template>
  <div class="official-account">
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
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="appAccount" slot-scope="scope">
          公众号账号： {{scope.row.appAccount}}<br>
          公众号AppID： {{scope.row.appId}}<br>
          公众号AppSecret： {{scope.row.secretKey}}<br>
          公众号模板： {{scope.row.templateContent}}<br>
        </template>
        <template slot="partner" slot-scope="scope">
          商户号： {{scope.row.partner}}<br>
          微信APIKEY： {{scope.row.partnerKey}}<br>
        </template>
        <template slot="appImage" slot-scope="scope">
           <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.appImage"
            fit="cover"
          >
           </el-image>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            size="small"
            style="color: #ec5b56"
            >查看详情</el-button
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
        <RdForm :formOptions="addFormOptions" formLabelWidth="90px" :rules="addRules" ref="dataForm3">
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
  name:"official-account",
  data(){
    return {
      formOptions: [
        {
          prop: "appName",
          element: "el-input",
          placeholder: "公众号名称",
        },
        {
          prop: "state",
          element: "el-select",
          placeholder: "公众号状态",
          options: []
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
          name: "公众号名称",
          value: "appName",
        },
        {
          name: "公众号账户信息",
          value: "appAccount",
          operate: true,
          width: 400
        },
        {
          name: "微信商户信息",
          value: "partner",
        },
        {
          name: "状态",
          value: "state",
        },
        {
          name: "微信二维码",
          value: "appImage",
          operate: true
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
        showCount: 10,
      },
      addVisible: false,
      addFormOptions: [
          
        {
          prop: "id",
          element: "el-input",
          placeholder: "请输入",
          label: "公众号ID"
        },
         {
          prop: "appAccount",
          element: "el-input",
          placeholder: "请输入公众号账号，不知道账号请不要填",
          label: "公众号账号"
        },
        {
          prop: "appName",
          element: "el-input",
          placeholder: "请输入",
          label: "微信公众号名称"
        },
        {
          prop: "secretKey",
          element: "el-input",
          placeholder: "请输入APPSECRET",
          label: "微信密钥"
        },
        {
          prop: "post",
          element: "el-input",
          placeholder: "",
          label: "微信二维码",
          operate: true,
          initValue: 0
        },
        {
          prop: "partner",
          element: "el-input",
          placeholder: "请输入",
          label: "微信商户号"
        },
        {
          prop: "partnerKey",
          element: "el-input",
          placeholder: "请输入",
          label: "微信商户支付APIKEY"
        },
        {
          prop: "templateContent",
          element: "el-input",
          placeholder: "请输入推送消息模板，不知道怎么配置请不要填",
          label: "推送消息模板",
          type:"textarea",
          rows: 3
        },
        {
          prop: "state",
          element: "el-select",
          placeholder: "请选择",
          label: "微信公众号状态",
          options: []
        },
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
    RdForm
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
       this.$fetch("wechatmanage_listJsp", {
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
        let statusArr = res.data.weChatStateList.map(item => ({
          label: item.value,
          value: item.key
        }));
        this.formOptions[1].options = statusArr;
        this.addFormOptions[8].options = statusArr;
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
.official-account {
  /deep/ {
    .el-form-item__label {
      line-height: 24px;
    }
  }
}
</style>

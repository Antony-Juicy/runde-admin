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
          >导入快递数据</el-button
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
      </rd-table>
    </div>
    
    <!-- 导入数据 -->
    <rd-dialog
        :title="'导入模板'"
        :dialogVisible="addVisible"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <el-form ref="dataForm3" :model="importForm" label-width="80px">
          <el-form-item label="导入模版">
            <el-button type="primary" size="small" @click="downLoad">点击下载模板</el-button>
          </el-form-item>
          <el-form-item label="文件" prop="excel">
            <uploadFile :file.sync="importForm.excel"/>
          </el-form-item>
        </el-form>
    </rd-dialog>
  </div>
</template>

<script>
import uploadFile from "@/components/Activity/uploadFile";
export default {
  name:"post-manage",
  data(){
    return {
      importForm: {
        excel: ""
      },
      formOptions: [
        {
          prop: "name",
          element: "el-input",
          placeholder: "收货人姓名",
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "联系电话",
        },
        {
          prop: "expressNo",
          element: "el-input",
          placeholder: "快递单号",
        },
        {
          prop: "expressCompany",
          element: "el-input",
          placeholder: "快递公司名称",
        },
        {
          prop: "goodsName",
          element: "el-input",
          placeholder: "商品名称",
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
          name: "收货人姓名",
          value: "name",
        },
        {
          name: "电话号码",
          value: "phone",
        },
        {
          name: "联系地址",
          value: "address",
        },
        {
          name: "订单ID",
          value: "payId",
        },
        {
          name: "润德老师",
          value: "staffName",
        },
        {
          name: "快递单号",
          value: "expressNo",
        },
        {
          name: "快递公司",
          value: "expressCompany",
        },
        {
          name: "商品名称",
          value: "goodsName",
        },
        {
          name: "导入时间",
          value: "createAt",
        }
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      addVisible: false,
      addFormOptions: [
          
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入名称",
          label: "名称"
        },
        {
          prop: "post",
          element: "el-input",
          placeholder: "",
          label: "上传",
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
  components: {
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
       this.$fetch("mobilegoodsexpresslog_listJsp", {
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
      if(!this.importForm.excel){
        this.$message.warning("请上传文件")
        return
      }
      let obj = new FormData();
      obj.append("excel",this.importForm.excel)
      this.$fetch("mobilegoodsexpresslog_saveImport",obj).then(res => {
        this.$message.success("操作成功")
        this.getTableData()
        this.addVisible = false
      })
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
    },
    downLoad(){
      window.location.href = "/temp/express_import.xlsx"
    }
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>

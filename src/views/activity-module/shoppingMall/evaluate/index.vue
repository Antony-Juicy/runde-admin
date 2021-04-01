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
          >导入数据</el-button
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
        <!-- <template slot="edit" slot-scope="scope">
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
        </template> -->
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
import RdForm from "@/components/RdForm";
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
          prop: "nickName",
          element: "el-input",
          placeholder: "昵称",
        },
        {
          prop: "content",
          element: "el-input",
          placeholder: "评论内容",
        },
        {
          prop: "activityName",
          element: "el-input",
          placeholder: "活动名称",
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "审核状态",
          options: [
            {
              label:"审核通过",
              value:"YES"
            },
            {
              label:"审核拒绝",
              value:"NO"
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
          name: "序号",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "昵称",
          value: "nickName",
        },
        {
          name: "头像",
          value: "headimgurl",
        },
        {
          name: "评论内容",
          value: "content",
        },
        {
          name: "等级",
          value: "satisfaction",
        },
        {
          name: "审核状态",
          value: "status",
        },
        {
          name: "创建时间",
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
        showCount: 10,
      },
      addVisible: false,
      addStatus: true
    }
  },
  components:{
    RdForm,
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
       this.$fetch("mobilegoodsurl_listJspComments", {
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
      obj.append("file",this.importForm.excel)
      this.$fetch("mobilegoodsurl_saveImport",obj).then(res => {
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
      window.location.href = "/temp/mobilegoods_comment_import.xlsx"
    }
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>

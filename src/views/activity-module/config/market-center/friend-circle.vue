<template>
  <div class="post-manage">
      <div class="w-container card-wrapper">
        <el-row :gutter="12">
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">累计发圈数</div>
                <div class="call-content">{{totalObj.hjzs || 0}}</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">昨日发圈总数</div>
                <div class="call-content">{{totalObj.wjt || 0}}</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">分校发圈汇总</div>
                <div class="call-content">{{totalObj.zsc || 0}}</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">网校发圈汇总</div>
                <div class="call-content">{{totalObj.yxhj || 0}}</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
          </el-col>
          <el-col :span="4">
          </el-col>
        </el-row>
      </div>
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >导出</el-button
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
          placeholder: "省校",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "分校",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "微信号",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "朋友圈数量",
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "上传时间(开始)",
          endPlaceholder: "上传时间(结束)",
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
          name: "序号",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "上传日期",
          value: "staffName",
        },
        {
          name: "省校",
          value: "goodsName",
        },
        {
          name: "分校",
          value: "activityName",
        },
        {
          name: "老师名称",
          value: "posterName",
        },
        {
          name: "绑定到的手机号",
          value: "posterPic",
        },
        {
          name: "微信号",
          value: "posterCopyFirst",
        },
        {
          name: "朋友圈数量",
          value: "posterCopySecond",
        },
        {
          name: "上传的截图",
          value: "posterCopyThird",
        }
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      totalObj: {}
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
  .card-wrapper {
      display: flex;
      & > div {
        flex: 1;
      }
      .call-total {
        .call-title {
          font-size: 12px;
          color: #999;
        }
        .call-content {
          font-size: 30px;
          font-weight: 300;
          color: #ff5722;
        }
      }
      /deep/ {
        .el-card__body {
          background-color: #f8f8f8;
          border: none;
        }
      }
    }
}
</style>

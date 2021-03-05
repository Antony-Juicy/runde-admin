<template>
  <div class="post-manage">
      <!-- <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form> -->
    <div class="w-container">
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        :tbodyHeight="600"
        fixedTwoRow
        @pageChange="pageChange"
      >
       <template slot="edit" slot-scope="scope">
          <el-button @click="handleDetail(scope.row)" type="text" size="small"
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
    <!-- 编辑题目详情 -->
       <rd-dialog
        :title="'编辑'"
        :dialogVisible="editVisible"
        append-to-body
        @handleClose="editVisible = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <editSubject/>
      </rd-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import editSubject from './editSubject';
export default {
  name:"link-manage",
  data(){
    return {
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
          name: "题目序号",
          value: "staffName",
          width: 60
        },
        {
          name: "题目类型",
          value: "goodsName",
          width: 60
        },
        {
          name: "题目",
          value: "activityName",
        },
         {
          name: "操作",
          value: "edit",
          operate: true,
          width: 100
        },
       
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      editVisible: false
    }
  },
  components:{
    RdForm,
    editSubject
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
     handleDelete(row) {
      let info = '项';
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
    handleDetail(data){
      this.editVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>

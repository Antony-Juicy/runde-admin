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
    <!-- 题目详情 -->
      <el-drawer
          :visible.sync="detailVisible"
          title="题目详情"
          append-to-body
          size="50%"
        >
          <subjectDetail
            ref="subjectDetail"
            @close="detailVisible = false"
            v-if="detailVisible"
          />
      </el-drawer>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import subjectDetail from "./subjectDetail";
import fullDialog from "@/components/FullDialog";
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
          name: "id主键",
          value: "staffName",
        },
        {
          name: "科目id",
          value: "goodsName",
        },
        {
          name: "科目名",
          value: "activityName",
        },
        {
          name: "数据状态",
          value: "posterName",
        },
        {
          name: "排序",
          value: "posterPic",
        },
          {
          name: "创建时间",
          value: "posterPic",
        },
          {
          name: "更新时间",
          value: "posterPic",
        },
         {
          name: "操作",
          value: "edit",
          operate: true
        },
       
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      detailVisible: false
    }
  },
  components:{
    RdForm,
    subjectDetail,
    fullDialog
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
      this.detailVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>

<template>
  <div class="post-manage">
      <!-- <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form> -->
    <div class="w-container">
      <!-- <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >添加</el-button
        >
      </div> -->
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
          <!-- <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          ><el-divider direction="vertical"></el-divider> -->
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
import subjectDetail from "@/components/Activity/subjectDetail";
export default {
  name:"subject-title",
  data(){
    return {
      formOptions: [
        {
          prop: "subjectId",
          element: "el-input",
          placeholder: "科目id",
        },
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
          name: "科目id",
          value: "subjectId",
          width: 80
        },
        {
          name: "科目名",
          value: "subjectName",
        },
        {
          name: "数据状态",
          value: "status",
        },
        {
          name: "排序",
          value: "orderValue",
          width: 80
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
      drawerId:""
    }
  },
  components:{
    RdForm,
    subjectDetail
  },
  mounted(){
    this.getTableData();
    
  },
  watch: {
    "$route.params.subjectId"(newVal){
      if(newVal){
        this.getTableData();
      }
    }
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
       const { subjectId } = this.$route.params;
       this.$fetch("auditionitem_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        subjectId: subjectId || ''
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
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
      let info = '项';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("auditionitem_deleteJsp", {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>

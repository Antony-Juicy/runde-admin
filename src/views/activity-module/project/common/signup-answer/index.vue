<template>
  <div class="signupanswer-container">
    <search-form :formOptions="formOptions" :showNum="7" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleExport">导出</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        :tbodyHeight="600"
        fixedTwoRow
        @pageChange="pageChange"
        :emptyText="emptyText">
      </rd-table>
    </div>
  </div>
</template>

<script>
export default {
  name:"signup-answer",
  data(){
    return {
      formOptions: [
        {
          prop: "studentName",
          element: "el-input",
          placeholder: "请输入学员姓名",
        },
        {
          prop: "studentPhone",
          element: "el-input",
          placeholder: "请输入学员手机号",
        },
        {
          prop: "subjectName",
          element: "el-input",
          placeholder: "请输入科目名称",
        }
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
        
      ],
      tableKey: [
        {
          name: "主键",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "学员名称",
          value: "studentName",
        },
        {
          name: "学员手机号",
          value: "studentPhone",
        },
        {
          name: "员工名称",
          value: "staffName",
        },
        {
          name: "校区名称",
          value: "campusName",
        },
        {
          name: "科目名称",
          value: "subjectName",
        },
        {
          name: "遇见问题",
          value: "issue",
        },
        {
          name: "信息类型",
          value: "informationType",
        }
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
    }
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
      this.pageConfig.pageNum = 1;
      this.getTableData();
     },
    getTableData(params = {}){
       this.$fetch("cmssignupanswer_listJsp", {
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
      })
     },
    pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleAdd(){
      
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    },
    handleEdit(data){
      
    },
    handleExport(row) {
      this.$confirm(`
      <p style="font-size:16px;font-weight:bold">1. 导出数据建议加上【条件筛选】,例如科目名称!</p>
      <p style="font-size:16px;font-weight:bold">2. 当导出大量数据的时候，可能会比较慢，请耐心等待！请勿多次点击导出按钮!</p>`, "导出须知", {
        confirmButtonText: "是的，这是第一次点击",
        cancelButtonText: "不是，刚才已经点击一次了",
        type: "warning",
        dangerouslyUseHTMLString: true,
        customClass:"confirm-box"
      }).then(async () => {
          this.$fetch("cmssignupanswer_toExcel",{
            ...this.searchForm
          })
      }).catch(() => {

      });
    }
  }
}
</script>

<style lang="scss" scoped>
.signupanswer-container {
  /deep/ {
    .confirm-box {
      width: 439px;
      .el-message-box__container {
        padding: 38px 0;
      }
    }
  }
}
</style>

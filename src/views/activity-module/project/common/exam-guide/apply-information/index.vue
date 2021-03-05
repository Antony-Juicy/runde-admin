<template>
  <div class="information-container">
    <search-form :formOptions="formOptions" :showNum="7" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig.sync="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
      </rd-table>
      <rd-dialog
        :title="addStatus?'添加报考信息':'编辑报考信息'"
        :dialogVisible="addVisible"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm')">
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm"></RdForm>
      </rd-dialog>
    </div>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"apply-information",
  components:{
    RdForm
  },
  data(){
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择项目",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择状态",
        }
      ],
      searchForm: {},
      emptyText: "暂无数据",
      fixedTwoRow: true,
      tableData: [
        
      ],
      tableKey: [
        {
          name: "主键id",
          value: "staffName",
        },
        {
          name: "项目",
          value: "staffName",
        },
        {
          name: "报考信息",
          value: "staffName",
        },
        {
          name: "排序",
          value: "staffName",
        },
        {
          name: "状态",
          value: "posterCopyFirst",
        },
        {
          name: "创建时间",
          value: "posterCopySecond",
        },
        {
          name: "更新时间",
          value: "posterCopyThird",
        },
        {
          name: "操作",
          value: "staffName",
        }
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },

      loading: false,

      addStatus: true,
      addVisible: false,
      addFormOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择项目",
          label: "项目",
          options: [
            {
              label: "2019执业药师",
              value: 0,
            },
            {
              label: "2020执业医师",
              value: 1,
            },
            {
              label: "2020执业医师(新)",
              value: 2,
            },
          ],
        },
        {
          prop: "roleName",
          element: "el-input",
          placeholder: "请输入报考信息",
          label: "报考信息"
        },
        {
          prop: "menuName3",
          element: "el-input-number",
          placeholder: "请输入排序",
          label: "排序"
        },
        {
          prop: "menuName3",
          element: "el-select",
          placeholder: "请选择状态",
          label: "状态",
          options: [
            {
              label: "已开放",
              value: 0,
            },
            {
              label: "未开放",
              value: 1,
            }
          ],
        },
      ],
      addRules: {},
    }
  },
  mounted () {
    // this.getTableData()
  },
  methods: {
    onSearch(val){
       this.searchForm = {
        ...val
      };
      this.pageConfig.pageNum = 1;
      this.getTableData();
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    getTableData(){
      console.log('信息的页面')
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
  }
}
</script>

<style lang="scss" scoped>
.information-container {
  
}
</style>

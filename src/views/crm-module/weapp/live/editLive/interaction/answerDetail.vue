<template>
  <div class="answer-detail">
    <PieChart :answerId="answerId" @getOptions="getOptions"/>
    <search-form :formOptions="formOptions" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        :pager-count="5"
        :tbodyHeight="600"
        @pageChange="pageChange"
        @sortChange="handelSortChange"
      >
        <template slot="index" slot-scope="scope">
          {{ scope.$index }}
        </template>
      </rd-table>
    </div>
  </div>
</template>

<script>
import PieChart from "./PieChart";
export default {
  name: "answer-detail",
  data() {
    return {
      formOptions: [
        {
          prop: "nickName",
          element: "el-input",
          placeholder: "请输入昵称",
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "请输入用户手机号",
        },
        {
          prop: "option",
          element: "el-select",
          placeholder: "请选择",
        },
      ],
      tableData: [
      ],
      tableKey: [
        {
          name: "微信昵称",
          value: "nickName",
        },
        {
          name: "手机号",
          value: "phone",
        },
        {
          name: "选择选项",
          value: "option",
        },
      ],
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      searchForm: {},
    };
  },
  components: {
    PieChart,
  },
  props: {
    answerId: {
      type: Number,
    },
  },
  mounted() {
    console.log(this.answerId, "this.answerId");
    this.getTableData();
  },
  watch: {
    answerId(newVal) {
      console.log(newVal, "answerid");
    },
  },
  methods: {
    getOptions(val){
      this.formOptions[2].options = val.map(item => ({
        label: item,
        value: item
      }))
      this.formOptions = [...this.formOptions];
    },
    handleAdd() {},
    onSearch(val) {
      this.searchForm = {
        ...val,
      };
      this.getTableData();
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getTableData();
    },
    handelSortChange(val) {
      console.log(val, "valll");
    },
    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".answer-detail .el-table",
      });
      this.$fetch("live_page_user_answer_data", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        liveAnswerSheetId : this.answerId
      }).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.totalCount;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.answer-detail {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}
</style>

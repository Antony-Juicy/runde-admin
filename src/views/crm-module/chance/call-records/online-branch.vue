<template>
  <div class="onlineoutcall-container">
    <search-form :formOptions="formOptions" @onSearch="onSearch"></search-form>
    <div class="btn-wrapper">
      <el-radio-group v-model="radio1" @change="handleTabClick">
        <el-radio-button label="0">全部</el-radio-button>
        <el-radio-button label="1">拨号呼入</el-radio-button>
        <el-radio-button label="2">后台外呼</el-radio-button>
        <el-radio-button label="3">拨号外呼</el-radio-button>
        <el-radio-button label="4">点击外呼</el-radio-button>
      </el-radio-group>
    </div>
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :loading="loading"
      :fixedTwoRow="fixedTwoRow"
      :pageConfig.sync="pageConfig"
      @select="handleSelect"
      @pageChange="pageChange"
    >
    <template slot="callType" slot-scope="scope">
                {{scope.row.callType | CallTypeFilter}}
              </template>
               <template slot="status" slot-scope="scope">
                {{scope.row.status | statusFilter}}
              </template>
    </rd-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {},
      formOptions: [
        {
          prop: "staffId",
          element: "el-select",
          initValue: "",
          placeholder: "招生老师",
        },
        {
          prop: "userNumber",
          element: "el-input",
          initValue: "",
          placeholder: "通话人号码",
        },
        {
          prop: "campusId",
          element: "el-select",
          initValue: "",
          placeholder: "校区名（所属组织）",
        },
        {
          prop: "endTime",
          element: "el-date-picker",
          initValue: "",
          startPlaceholder: "通话时间(开始)",
          endPlaceholder: "通话时间(结束)",
          initWidth: true,
        },
      ],
      tableData: [],
      tableKey: [
        { name: "通话类型", value: "callType",operate: true },
        { name: "通话人号码", value: "userNumber" },
        { name: "通话状态", value: "status",operate: true },
        {
          name: "通话时长(单位秒)",
          value: "dealingTime",
          sortable: true,
        },
        { name: "招生老师", value: "staffName" },
        { name: "校区名", value: "campusName" },
        { name: "接通时间", value: "connectTime" },
        { name: "结束时间", value: "endTime" },
        { name: "录音", value: "9" },
      ],
      emptyText: "暂无数据，请选择相应的组织架构",
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        showCount: 10,
      },
      loading: false,

      //
      radio1: 0,
    };
  },
  props: {
    staffOptions: {
      type: Array,
      default: () => [],
    },
    campusOptions: {
      type: Array,
      default: () => [],
    },
  },
  filters: {
    CallTypeFilter(val){
      switch(val){
        case "1":
          return '拨号呼入';
        case "2":
          return '后台外呼';
        case "3":
          return '拨号外呼';
        case "4":
          return '点击外呼';
      }
    },
    statusFilter(val){
      switch(val){
        case "0":
          return '呼叫成功';
        case "13":
          return '内部错误，座席号码非法';
        case "41":
          return '回呼坐席成功，呼叫客户未通';
        case "44":
          return '回呼座席未通';
      }
    },
  },
  watch: {
    staffOptions() {
      this.formOptions = [
        {
          prop: "staffId",
          element: "el-select",
          initValue: "",
          placeholder: "招生老师",
          options: this.staffOptions,
          filterable: true,
        },
        {
          prop: "userNumber",
          element: "el-input",
          initValue: "",
          placeholder: "通话人号码",
        },
        {
          prop: "campusId",
          element: "el-select",
          initValue: "",
          placeholder: "校区名（所属组织）",
          options: this.campusOptions,
          filterable: true,
        },
        {
          prop: "endTime",
          element: "el-date-picker",
          initValue: "",
          startPlaceholder: "通话时间(开始)",
          endPlaceholder: "通话时间(结束)",
          initWidth: true,
        },
      ];
    },
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    onSearch(val) {
      this.searchForm = { 
        ...val ,
         endTime: val.endTime?val.endTime.join(' ~ '):""
      };
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },

    // 点击权限组的分类
    handleTabClick(data) {
      console.log(data, 99966);
      this.pageConfig.currentPage = 1;
       this.getTableData({
        callType: data=="0"?"": data
      });
    },
    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch("chance_call_zhibo", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        // token:'123'
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          return item;
        });
        this.pageConfig.totalCount = res.data.count;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.onlineoutcall-container {
  .btn-wrapper {
    margin-bottom: 8px;
  }
}
</style>
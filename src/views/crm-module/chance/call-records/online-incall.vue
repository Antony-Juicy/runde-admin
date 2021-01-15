<template>
  <div class="onlineincall-container">
    <search-form :formOptions = "formOptions" @onSearch = onSearch></search-form>
    <div class="btn-wrapper">
      <el-radio-group v-model="radio1" @change="handleTabClick">
        <el-radio-button label="0">全部</el-radio-button>
        <el-radio-button label="1">呼出</el-radio-button>
        <el-radio-button label="2">普通来电</el-radio-button>
        <el-radio-button label="3">呼入转接</el-radio-button>
        <el-radio-button label="4">外呼转接</el-radio-button>
      </el-radio-group>
    </div>
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :loading="loading"
      :fixedTwoRow="fixedTwoRow"
      :pageConfig="pageConfig"
      @select="handleSelect"
      @pageChange="pageChange"
    >
    </rd-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {},
      formOptions: [
        { prop: 'AgentName', element: 'el-select', initValue: '', placeholder: '招生老师' },
        { prop: 'CalledNo', element: 'el-input', initValue: '', placeholder: '通话人号码' },
        { prop: 'campus_name', element: 'el-select', initValue: '', placeholder: '校区名（所属组织）' },
        { prop: 'End', element: 'el-date-picker', initValue: '',  startPlaceholder: "通话时间(开始)",
          endPlaceholder: "通话时间(结束)",initWidth: true }
      ],
      tableData: [],
      tableKey: [
        { name: '通话类型',value: 'CallType' },
        { name: '通话人号码',value: 'CalledNo' },
        { name: '通话状态',value: 'State' },
        { name: '通话时长(单位秒)',value: 'dealingTime', operate: true,sortable: true },
        { name: '招生老师',value: 'AgentName' },
        { name: '校区名',value: 'campus_name' },
        { name: '接通时间',value: 'start_time' },
        { name: '结束时间',value: 'end_time' },
        { name: '录音',value: '9' },
      ],
      emptyText: '暂无数据，请选择相应的组织架构',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        showCount: 10,
      },
      loading: false,

      //
      radio1: 0,
    }
  },
  mounted(){
    this.getTableData();
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val,'pagechange')
    },
    
    // 点击权限组的分类
    handleTabClick(data){
      console.log(data,99966)
      // this.pageConfig.currentPage = 1;
      // this.getTableData();
    },
    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch("chance_call_qimo", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
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
  }
}
</script>

<style lang="scss" scoped>
.onlineincall-container {
  .btn-wrapper {
    margin-bottom: 8px;
  }
}
</style>
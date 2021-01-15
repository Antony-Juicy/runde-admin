<template>
  <div class="aicall-container">
    <search-form :formOptions = "formOptions" @onSearch = onSearch></search-form>
    <div class="btn-wrapper">
      <el-radio-group v-model="radio1" @change="handleTabClick">
        <el-radio-button label="0">全部</el-radio-button>
        <el-radio-button label="1">客户挂断</el-radio-button>
        <el-radio-button label="2">AI挂断</el-radio-button>
        <el-radio-button label="3">人工坐席挂断</el-radio-button>
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
import searchForm from '@/components/Searchform';
export default {
  components: {
    searchForm
  },
  data () {
    return {
      searchForm: {},
      formOptions: [
        { prop: 'marketName', element: 'el-select', initValue: '', placeholder: '招生老师' },
        { prop: 'calledPhoneNumber', element: 'el-input', initValue: '', placeholder: '通话人号码' },
        { prop: 'campusName', element: 'el-select', initValue: '', placeholder: '校区名（所属组织）' },
        { prop: 'startTime', element: 'el-date-picker', initValue: '',  startPlaceholder: "通话时间(开始)",
          endPlaceholder: "通话时间(结束)", initWidth: true }
      ],
      tableData: [],
      tableKey: [
        { name: '挂断状态',value: 'hangupBy' },
        { name: '通话人号码',value: 'calledPhoneNumber' },
        { name: '通话状态',value: 'resultStatus' },
        { name: '通话时长(单位秒)',value: 'chatDuration', operate: true,sortable: true },
        { name: '招生老师',value: 'marketName' },
        { name: '校区名',value: 'campusName' },
        { name: '意向等级',value: '7' },
        { name: '接通时间',value: 'startTime' }
      ],
      emptyText: '暂无数据，请选择相应的组织架构',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,

      //
      radio1: 0,
    }
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      console.log(val,this.searchForm , 'val---')
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
    }
  }
}
</script>

<style lang="scss" scoped>
.aicall-container {
  .btn-wrapper {
    margin-bottom: 8px;
  }
}
</style>
<template>
  <div class="akeycall-container">
    <search-form :formOptions = "formOptions" @onSearch = onSearch></search-form>
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :loading="loading"
      :fixedTwoRow="fixedTwoRow"
      :pageConfig.sync="pageConfig"
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
        { prop: 'staffName', element: 'el-select', initValue: '', placeholder: '招生老师' },
        { prop: 'fwdDstNum', element: 'el-input', initValue: '', placeholder: '通话人号码' },
        { prop: 'campusName', element: 'el-select', initValue: '', placeholder: '校区名（所属组织）' },
        { prop: 'callEndTime', element: 'el-date-picker', initValue: '', startPlaceholder: "通话时间(开始)",
          endPlaceholder: "通话时间(结束)", initWidth: true }
      ],
      tableData: [],
      tableKey: [
        { name: '呼叫类型',value: 'serviceType' },
        { name: '通话人号码',value: 'fwdDstNum' },
        { name: '通话状态',value: '3' },
        { name: '通话时长(单位秒)',value: 'dealingTime', operate: true,sortable: true },
        { name: '招生老师',value: 'staffName' },
        { name: '校区名',value: 'campusName' },
        { name: '接通时间',value: 'recordStartTime' },
        { name: '结束时间',value: 'callEndTime' },
        { name: '录音',value: '9' }
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
.akeycall-container {
  .btn-wrapper {
    margin-bottom: 8px;
  }
}
</style>
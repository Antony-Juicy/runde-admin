<template>
  <div class="registrantlist_container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="w-container">
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig="pageConfig"
        :filterColumn="true"
        :tbodyHeight="600"
        @select="handleSelect"
        @pageChange="pageChange"
      >
      </rd-table>
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/Searchform';
export default {
  name:'registrant-list',
  components: {
    searchForm
  },
  data () {
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'studentName', element: 'el-input', initValue: '', placeholder: '请输入学员姓名' },
        { prop: 'phone', element: 'el-input', initValue: '', placeholder: '请输入学员手机' },
        { prop: 'project', element: 'el-select', initValue: '', placeholder: '请选择机会来源' },
        { prop: 'phone', element: 'el-select', initValue: '', placeholder: '请选择学历' },
        { prop: 'invalidStatus', element: 'el-select', initValue: '', placeholder: '请选择根据状态' },
        { prop: 'saleSource', element: 'el-select', initValue: '', placeholder: '请选择机会状态' },
        { prop: 'marketName', element: 'el-select', initValue: '', placeholder: '归属销售' },
        { prop: 'enquireProductNameOne', element: 'el-select', initValue: '', placeholder: '请选择资询项目' },
        { prop: 'enquireSubjectNameOne', element: 'el-select', initValue: '', placeholder: '请先选择资询项目' },
        { prop: 'phone', element: 'el-select', initValue: '', placeholder: '请先选择资询课目' },
        { prop: 'phone', element: 'el-select', initValue: '', placeholder: '选择查询排列方法' }
      ],
      tableData: [],
      tableKey: [
        { name: '机会ID',value: 'id' },
        { name: '姓名',value: 'studentName' },
        { name: '手机号',value: 'phone' },
        { name: '回访',value: 'feedbackCount' },
        { name: '咨询项目',value: 'enquireProductNameOne' },
        { name: '咨询科目',value: 'enquireSubjectNameOne' },
        { name: '咨询班型',value: 'enquireClassOne' },
        { name: '创建时间',value: 'createAt' },
        { name: '注册人',value: 'createStaffName' },
        { name: '机会截止',value: 'recoveryTime' },
        { name: '最近跟进时间',value: 'recentFeedbackTime',operate: true,width: 110 },
        { name: '跟进状态',value: 'status' },
        { name: '机会状态',value: 'invalidStatus' },
        { name: '机会状态',value: 'saleSource' },
        { name: '归属销售',value: 'marketName' },
        { name: '分校/战队',value: 'campusName' },
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
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
    }
  }
}
</script>

<style lang='scss' scoped>
.registrantlist_container {
  .w-container {
    padding-top: 50px;
  }
}
</style>
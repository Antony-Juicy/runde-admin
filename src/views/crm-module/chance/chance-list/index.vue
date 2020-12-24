<template>
  <div class="chancelist_container">
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
  name:'chance-list',
  components: {
    searchForm
  },
  data () {
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'name', element: 'el-select', initValue: '', placeholder: '停留模块' },
        { prop: 'phone', element: 'el-select', initValue: '', placeholder: '机会类型' },
        { prop: 'studentName', element: 'el-input', initValue: '', placeholder: '学员姓名' },
        { prop: 'phone', element: 'el-input', initValue: '', placeholder: '学员手机' },
        { prop: 'labelInfoName', element: 'el-input', initValue: '', placeholder: '活动名' },
        { prop: 'campusName', element: 'el-input', initValue: '', placeholder: '校区名', },
        { prop: 'marketName', element: 'el-select', initValue: '', placeholder: '跟进老师' },
        { prop: 'phone', element: 'el-input', initValue: '', placeholder: '省份' },
        { prop: 'phone', element: 'el-input', initValue: '', placeholder: '城市' },
        { prop: 'phone', element: 'el-input', initValue: '', placeholder: '地址' },
        { prop: 'enquireProductNameOne', element: 'el-select', initValue: '', placeholder: '请选择资讯项目' },
        { prop: 'enquireSubjectNameOne', element: 'el-select', initValue: '', placeholder: '请选择资讯科目' },
        { prop: 'enquireCourseNameOne', element: 'el-select', initValue: '', placeholder: '请选择资讯课程' },
        { prop: 'phone', element: 'el-select', initValue: '', placeholder: '客户分类' },
        { prop: 'phone', element: 'el-select', initValue: '', placeholder: '销售来源' },
        { prop: 'eduBackground', element: 'el-select', initValue: '', placeholder: '学历' },
        { prop: 'invalidStatus', element: 'el-select', initValue: '', placeholder: '机会状态' },
        { prop: 'phone', element: 'el-select', initValue: '', placeholder: '归属人' },
        { prop: 'createAt', element: 'el-date-picker', initValue: '', placeholder: '请选择创建时间' },
      ],
      tableData: [],
      tableKey: [
        { name: '机会ID',value: 'id',operate: true,fixed: "left" },
        { name: '姓名',value: 'studentName',operate: true,fixed: "left" },
        { name: '手机号',value: 'phone' },
        { name: '校区名',value: 'campusName' },
        { name: '机会截止',value: 'recoveryTime' },
        { name: '回访',value: 'feedbackCount' },
        { name: '微信',value: 'wechat' },
        { name: '性别',value: 'gender' },
        { name: '跟进老师',value: 'marketName' },
        { name: '学历',value: 'eduBackground' },
        { name: '咨询项目',value: 'enquireProductNameOne' },
        { name: '咨询科目',value: 'enquireSubjectNameOne' },
        { name: '咨询课程',value: 'enquireCourseNameOne' },
        { name: '咨询班型',value: 'enquireClassOne' },
        { name: '意向内容',value: 'intention' },
        { name: '机会来源',value: 'saleSource' },
        { name: '活动名称',value: 'labelInfoName' },
        { name: '备注',value: 'remark' },
        { name: '最近回访内容',value: 'recentFeedbackContent',operate: true,width: 110 },
        { name: '最近回访时间',value: 'recentFeedbackTime',operate: true,width: 110 },
        { name: '下次回访时间',value: 'nextFeedBackTime',operate: true,width: 110 },
        { name: '分配时间',value: 'allotTime' },
        { name: '状态',value: 'invalidStatus' },
        { name: '跟进状态',value: 'status' },
        { name: '创建时间',value: 'createAt' },
        { name: '赛道',value: 'opportunityCampusNature',operate: true,fixed: "right" },
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
.chancelist_container {
  .w-container {
    padding-top: 50px;
  }
}
</style>
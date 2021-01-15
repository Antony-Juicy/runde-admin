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
        { prop: 'createAt', element: 'el-date-picker', initValue: '', startPlaceholder: "创建时间(开始)",
          endPlaceholder: "创建时间(结束)"},
      ],
      tableData: [],
      tableKey: [
        { name: '机会ID',value: 'id',fixed: "left" ,width: 80},
        { name: '姓名',value: 'studentName',fixed: "left" },
        { name: '手机号',value: 'phone',width:100 },
        { name: '校区名',value: 'campusName',width:100 },
        { name: '机会截止',value: 'recoveryTime',width:132 },
        { name: '回访',value: 'feedbackCount',width:50 },
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
        { name: '最近回访内容',value: 'recentFeedbackContent'},
        { name: '最近回访时间',value: 'recentFeedbackTime',width:132 },
        { name: '下次回访时间',value: 'nextFeedBackTime',width:132 },
        { name: '分配时间',value: 'allotTime',width:132 },
        { name: '状态',value: 'invalidStatus' },
        { name: '跟进状态',value: 'status' },
        { name: '创建时间',value: 'createAt',width:132 },
        { name: '赛道',value: 'opportunityCampusNature',fixed: "right" },
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        showCount: 10,
      },
      loading: false,
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
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch("chance_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.recoveryTime = item.recoveryTime&&this.$common._formatDates(item.recoveryTime);
          item.recentFeedbackTime = item.recentFeedbackTime&&this.$common._formatDates(item.recentFeedbackTime);
          item.nextFeedBackTime = item.nextFeedBackTime&&this.$common._formatDates(item.nextFeedBackTime);
          item.allotTime = item.allotTime&&this.$common._formatDates(item.allotTime);
          item.phone = this.$common.hidePhone(item.phone)
          if(item.enquireClassOne){
            item.enquireClassOne = item.enquireClassOne.map(ele=>(ele.name)).join(",")
          }
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

<style lang='scss' scoped>
.chancelist_container {
  .w-container {
    padding-top: 50px;
  }
}
</style>
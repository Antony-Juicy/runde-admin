<template>
  <div class="Invalidationchange_container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="openDrawer">质检</el-button>
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
      <rd-drawer :dialogVisible="dialogVisible" :size="drawerSize" @handleClose="closeDrawer()"></rd-drawer>
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/Searchform';
import rdDrawer from '@/components/RdDrawer';
export default {
  name:'invalidation-chance',
  components: {
    searchForm,
    rdDrawer
  },
  data () {
    return {
      showNum: 5,
      searchForm: {},
      formOptions: [
        {
          prop: 'studentName',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入学员姓名',
        },
        {
          prop: 'phone',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入学员手机',
        },
        {
          prop: 'project',
          element: 'el-select',
          initValue: '',
          placeholder: '请选择项目',
        },
        {
          prop: 'eduBackground',
          element: 'el-select',
          initValue: '',
          placeholder: '请选择学历',
        },
        {
          prop: 'invalidReason',
          element: 'el-select',
          initValue: '',
          placeholder: '请选择失效原因',
        },
        {
          prop: 'zjstatus',
          element: 'el-select',
          initValue: '',
          placeholder: '请选择是否质检',
        },
        {
          prop: 'marketName',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入归属销售',
        },
        {
          prop: 'campusName',
          element: 'el-select',
          initValue: '',
          placeholder: '请选择组织架构',
        },
        {
          prop: 'updateAt',
          element: 'el-date-picker',
          initValue: '',
          placeholder: '请选择失效时间',
        }
      ],
      tableData: [],
      tableKey: [
        { name: '机会ID',value: 'id' },
        { name: '姓名',value: 'studentName' },
        { name: '手机号码',value: 'phone' },
        { name: '跟进次数',value: 'feedbackCount' },
        { name: '创建时间',value: 'createAt' },
        { name: '失效时间',value: 'updateAt' },
        { name: '失效原因',value: 'invalidReason' },
        { name: '备注',value: 'remark' },
        { name: '机会状态',value: 'status' },
        { name: '归属销售',value: 'marketName' },
        { name: '分校/战队',value: 'campusName' },
        { name: '质检状态',value: 'zjstatus' },
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,

      // 抽屉部分参数
      dialogVisible: false,
      drawerSize: '50%'
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
    openDrawer() {
      this.dialogVisible = true;
      console.log(this.dialogVisible, 666)
    },
    // 关闭
    closeDrawer(formName) {
      this.dialogVisible = false;
      // this.$refs[formName].resetFields();
    },
  }
}
</script>

<style lang='scss' scoped>
.Invalidationchange_container {
  .btn-wrapper {
    margin-bottom: 8px;
  }
}
</style>
<template>
  <div class="importphonequery_container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small">导入查询</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig="pageConfig"
        :tbodyHeight="600"
        @select="handleSelect"
        @pageChange="pageChange"
      >
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <!-- <el-divider direction="vertical"></el-divider> -->
          >
        </template>
      </rd-table>
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/Searchform';
export default {
  name:'importphone-query',
  components: {
    searchForm
  },
  data () {
    return {
      showNum: 4,
      searchForm: {},
      formOptions: [
        { prop: 'staff_name', element: 'el-input', initValue: '', placeholder: '请输入操作人' },
        { prop: '_id', element: 'el-input', initValue: '', placeholder: '请输入id' },
        { prop: 'remark', element: 'el-input', initValue: '', placeholder: '请输入备注' },
        { prop: 'campus_name', element: 'el-select', initValue: '', placeholder: '请选择分校' },
        { prop: 'createAt', element: 'el-date-picker', initValue: '', placeholder: '请选择创建时间' }
      ],
      tableData: [],
      tableKey: [
        { name: 'ID',value: '_id' },
        { name: '操作人',value: 'staff_name' },
        { name: '所在分校',value: 'campus_name' },
        { name: '导入的手机号码数量',value: 'phone_count' },
        { name: '导出的订单数量',value: 'order_count' },
        { name: '创建时间',value: 'create_at' },
        { name: '操作人IP',value: 'staff_ip' },
        { name: '备注',value: 'remark' },
        { name: '操作',value: 'edit',operate: true,width: 120 },
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
    },
  }
}
</script>

<style lang="scss" scoped>
.importphonequery_container {
  .btn-wrapper {
    margin-bottom: 8px;
  }
}
</style>
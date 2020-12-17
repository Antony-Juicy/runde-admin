<template>
  <div class="assignchange_container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="w-container">
    <div class="btn-wrapper">
      <el-button size="small" @click="handleAll">全部</el-button>
      <el-button type="primary" size="small">已分配</el-button>
      <el-button type="warning" size="small">未分配</el-button>
      <el-button type="warning" size="small">【查看分配情况】</el-button>
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
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleAuthority(scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >配置权限</el-button
          >
        </template>
      </rd-table>
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/Searchform';
export default {
  name:'assign-chance',
  components: {
    searchForm
  },
  data () {
    return {
      showNum: 3,
      searchForm: {},
      formOptions: [
        {
          prop: 'name',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入姓名',
        },
        {
          prop: 'phone',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入手机号',
        },
        {
          prop: 'time',
          element: 'el-date-picker',
          initValue: '',
          placeholder: '',
        }
      ],
      tableData: [],
      tableKey: [
        { name: '学员',value: 'name' },
        { name: '手机号',value: 'phone' },
        { name: '机会状态',value: 'chancestatus',operate: true },
        { name: '录入日期',value: 'entrydate' },
        { name: '分配时间',value: 'assigntime' },
        { name: '分配状态',value: 'assignstatus',operate: true },
        { name: '跟进老师',value: 'teacher' },
        { name: '操作',value: 'edit',operate: true,width: 120},
      ],
      emptyText: '暂无数据，请选择相应的组织架构',
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
    // 打开新增弹窗
    handleAll() {
      // console.log(666)
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

<style lang='scss' scoped>
.assignchange_container {
  .btn-wrapper {
    margin-bottom: 8px;
  }
}
</style>
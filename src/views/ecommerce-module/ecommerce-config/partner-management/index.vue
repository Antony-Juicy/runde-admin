<template>
  <div>
    <div style="padding-bottom: 0px;">
      <search-form :formOptions = "formOptions" @onSearch = onSearch></search-form>
      <!-- <el-row style="width:50%;padding:10px 0">
        <el-button icon="el-icon-search" type="primary" round >查询</el-button>
        <el-button icon="el-icon-refresh-left" type="warning" round plain>重置</el-button>
        <el-button icon="el-icon-document-add" type="success" round  @click="add">新增</el-button>
        <el-button icon="el-icon-document-remove" type="danger" round >批量删除</el-button>
      </el-row> -->
    </div>
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :multiple="multiple"
      :pageConfig="pageConfig"
      @select="handleSelect"
    >
      <template slot="name" slot-scope="scope">
        <el-tag size="medium">{{ scope.row.name }}</el-tag>
      </template>
      <template slot="edit" slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </rd-table>
  </div>

</template>

<script>
import searchForm from '@/components/Searchform';
export default {
  inject: ['reload'],
  components: { searchForm },
  data () {
    return {
      formOptions : [
        {
          // label: '合作方名称',
          prop: 'username',
          element: 'el-input',
          initValue: '',
          placeholder: '合作方名称',
        },
        {
          // label: '负责人姓名',
          prop: 'password',
          element: 'el-input',
          initValue: '',
          placeholder: '负责人姓名',
        },
        {
          // label: '人数',
          prop: 'people',
          element: 'el-input-number',
          initValue: '',
          placeholder: '',
        },
        {
          // label: '分类',
          prop: 'classNames',
          element: 'el-select',
          initValue: '',
          placeholder: '请选择分类',
        },
        {
          // label: '日期',
          prop: 'date',
          element: 'el-date-picker',
          initValue: '',
          placeholder: '请选择日期',
        },
        {
          // label: '日期',
          prop: 'dateNew',
          element: 'el-date-picker',
          initValue: '',
          placeholder: '请选择日期',
        }
      ],
      // btnItems: "search, reset", // 配置可操作按钮显示,如：search=搜索,export=导出,reset=重置
      tableData: [],
      tableKey: [
        {
          name: "id",
          value: "id",
          width: 80,
        },
        {
          name: "合作方信息",
          value: "",
        },
        {
          name: "银行账号",
          value: "",
        },
        {
          name: "户名",
          value: "",
        },
        {
          name: "店铺数量",
          value: "",
        },
        {
          name: "兑换码数量",
          value: "",
        },
        {
          name: "购课学员数量",
          value: "",
        },
        {
          name: "店铺数量",
          value: "",
        },
        {
          name: "已提现金额",
          value: "",
        },
        {
          name: "状态",
          value: "",
        },
        {
          name: "修改时间",
          value: "",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
        },
      ],
      multiple: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
    }
  },
  mounted () {
    
  },
  methods: {
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      this.getTableData({
        currentPage: val.page,
        showCount: val.limit,
      });
    },
    add() {
      console.log(666)
    },
    onSearch(val) {
      console.log(val, 999)
    }
  },
  computed: {
    
  }
}
</script>

<style lang="scss">
// .el-form-item {
//   margin-bottom: 10px;
// }
</style>
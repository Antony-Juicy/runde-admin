<template>
  <div class="callrecordscount_container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="w-container">
      <div class="card-wrapper">
        <el-row :gutter="12">
          <el-col :span="4" v-for="item in 6" :key="item">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">今日有效呼叫</div>
                <div class="call-content">0</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="mt-15 w-container">
      <search-form :formOptions = "formOptions2" :showNum="3" @onSearch = onSearch></search-form>
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
        <template slot="opportunityNum" slot-scope="scope">
          <el-button @click="handleNumbel(scope.row)" type="default" size="small">{{scope.row.opportunityNum}}</el-button>
        </template>
      </rd-table>
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/Searchform';
export default {
  name:'callrecords-count',
  components: {
    searchForm
  },
  data () {
    return {
      showNum: 4,
      searchForm: {},
      formOptions: [
        { prop: 'campus_name', element: 'el-select', initValue: '', placeholder: '请选择分校' },
        { 
          prop: 'campus_name',
          element: 'el-select',
          initValue: '',
          placeholder: '请选择呼叫',
          options: [
            {
              value: "0",
              label: "全部",
            },
            {
              value: "1",
              label: "手机外呼",
            },
            {
              value: "2",
              label: "在线外呼（总部）",
            },
            {
              value: "3",
              label: "在线外呼（分校）",
            },
            {
              value: "4",
              label: "一键回呼",
            }
          ]
        }
      ],
      formOptions2: [
        { prop: 'campus_name', element: 'el-input', initValue: '', placeholder: '请输入姓名' },
        { prop: 'campus_name', element: 'el-input', initValue: '', placeholder: '请输入职位' },
        { prop: 'campus_name', element: 'el-input', initValue: '', placeholder: '请输入手机号码' },
      ],
      tableData: [],
      tableKey: [
        { name: 'ID',value: 'id' },
        { name: '姓名',value: 'staffName' },
        { name: '职位',value: 'positionName' },
        { name: '分校',value: 'campusName' },
        { name: '手机号码',value: 'staffPhone' },
        { name: '机会持有数量',value: 'opportunityNum' },
        { name: '状态',value: 'status',operate: true,width: 120 }
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
    handleNumbel() {
      console.log(6666)
    }
  }
}
</script>

<style lang="scss" scoped>
.callrecordscount_container {
  .card-wrapper {
    display: flex;
    & > div {
      flex: 1;
    }
    .call-total {
      .call-title {
        font-size: 12px;
        color: #999;
      }
      .call-content {
        font-size: 30px;
        font-weight: 300;
        color: #ff5722;
      }
    }
    /deep/ {
      .el-card__body {
        background-color: #f8f8f8;
        border: none;
      }
      
    }
  }
}
</style>
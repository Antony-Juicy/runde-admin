<template>
  <div class="onlineincall-container">
    <search-form :formOptions = "formOptions" @onSearch = onSearch></search-form>
    <div class="btn-wrapper">
      <el-radio-group v-model="radio1" @change="handleTabClick">
        <el-radio-button label="0">全部</el-radio-button>
        <el-radio-button label="dialout">呼出</el-radio-button>
        <el-radio-button label="normal">普通来电</el-radio-button>
        <el-radio-button label="transfer">呼入转接</el-radio-button>
        <el-radio-button label="dialTransfer">外呼转接</el-radio-button>
      </el-radio-group>
    </div>
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :loading="loading"
      :fixedTwoRow="fixedTwoRow"
      :pageConfig.sync="pageConfig"
      @select="handleSelect"
      @pageChange="pageChange"
    >
      <template slot="CallType" slot-scope="scope">
                {{scope.row.CallType | CallTypeFilter}}
              </template>
              <template slot="State" slot-scope="scope">
                {{scope.row.State | StateFilter}}
              </template>
    </rd-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {},
      formOptions: [
        { prop: 'staffId', element: 'el-select', initValue: '', placeholder: '招生老师' },
        { prop: 'CalledNo', element: 'el-input', initValue: '', placeholder: '通话人号码' },
        { prop: 'campusId', element: 'el-select', initValue: '', placeholder: '校区名（所属组织）' },
        { prop: 'End', element: 'el-date-picker', initValue: '',  startPlaceholder: "通话时间(开始)",
          endPlaceholder: "通话时间(结束)",initWidth: true }
      ],
      tableData: [],
      tableKey: [
        { name: '通话类型',value: 'CallType',operate: true },
        { name: '通话人号码',value: 'CalledNo' },
        { name: '通话状态',value: 'State',operate: true },
        { name: '通话时长(单位秒)',value: 'dealingTime',sortable: true },
        { name: '招生老师',value: 'AgentName' },
        { name: '校区名',value: 'campus_name' },
        { name: '接通时间',value: 'Begin' },
        { name: '结束时间',value: 'End' },
        { name: '录音',value: '9' },
      ],
      emptyText: '暂无数据，请选择相应的组织架构',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        showCount: 10,
      },
      loading: false,

      //
      radio1: 0,
    }
  },
  props: {
    staffOptions: {
      type: Array,
      default:()=>[]
    },
    campusOptions: {
      type: Array,
      default:()=>[]
    }
  },
  mounted(){
    this.getTableData();
  },
  filters: {
    CallTypeFilter(val){
      switch(val){
        case 'dialout':
          return '呼出';
        case 'normal':
          return '普通来电';
        case 'transfer':
          return '呼入转接';
        case 'dialTransfer':
          return '外呼转接';
      }
    },
     StateFilter(val){
      switch(val){
        case 'dealing':
          return '已接';
        case 'notDeal':
          return '振铃未接听';
        case 'leak':
          return '放弃';
        case 'queueLeak':
          return '排队放弃';
        case 'blackList':
          return '黑名单';
        case 'voicemail':
          return '留言';
      }
    },
  },
  watch:{
    staffOptions(){
      this.formOptions = [
        { prop: 'staffId', element: 'el-select', initValue: '', placeholder: '招生老师',filterable: true,options: this.staffOptions },
        { prop: 'CalledNo', element: 'el-input', initValue: '', placeholder: '通话人号码' },
        { prop: 'campusId', element: 'el-select', initValue: '', placeholder: '校区名（所属组织）' ,filterable: true,options: this.campusOptions },
        { prop: 'End', element: 'el-date-picker', initValue: '',  startPlaceholder: "通话时间(开始)",
          endPlaceholder: "通话时间(结束)",initWidth: true }
      ]
    }
  },
  methods: {
    onSearch(val) {
      this.searchForm = {
        ...val,
        End: val.End?val.End.join(' ~ '):""
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
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
      this.pageConfig.currentPage = 1;
      this.getTableData({
        CallType: data=="0"?"": data
      });
    },
    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch("chance_call_qimo", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        // token:'123'
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
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

<style lang="scss" scoped>
.onlineincall-container {
  .btn-wrapper {
    margin-bottom: 8px;
  }
}
</style>
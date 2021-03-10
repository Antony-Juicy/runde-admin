<template>
  <div class="livecount-container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="w-container mt-15">
      <div class="btn-wrapper">
        <el-button type="primary" size="small">导出</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig.sync="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
      </rd-table>
    </div>
  </div>
</template>

<script>
export default {
  name:"live-count",
  data(){
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'liveId', element: 'el-input', placeholder: '请输入老师名称' },
        { prop: 'liveId', element: 'el-select', placeholder: '校区名（所属组织）' },
        { prop: 'liveId', element: 'el-input', placeholder: '请输入省校名' },
        { prop: 'liveId', element: 'el-input', placeholder: '请输入活动名称' },
        { prop: 'liveId', element: 'el-input', placeholder: '请输入微信昵称' },
        { prop: 'liveId', element: 'el-input', placeholder: '请输入手机号码' },
        { prop: 'typeId', element: 'el-select', placeholder: '请选择项目' },
        { prop: 'Time1', element: 'el-date-picker', startPlaceholder: "邀请开始时间", endPlaceholder: "邀请结束时间", initWidth: true },
        { prop: 'Time2', element: 'el-date-picker', startPlaceholder: "更新开始时间", endPlaceholder: "更新结束时间", initWidth: true }
      ],
      tableData: [],
      tableKey: [
        { name: '序号',value: 'value1' },
        { name: '活动名称',value: 'value2' },
        { name: '项目',value: 'value3' },
        { name: '手机号',value: 'value4' },
        { name: '微信昵称',value: 'value5' },
        { name: '微信头像',value: 'value6' },
        { name: '性别',value: 'value7' },
        { name: '短信状态',value: 'value8' },
        { name: '老师名称',value: 'value9' },
        { name: '分校',value: 'value10' },
        { name: '省校',value: 'value11' },
        { name: '邀请时间',value: 'value12' },
        { name: '更新时间',value: 'value13' }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false
    }
  },
  mounted () {
    // this.getTypeData();
    // this.getTableData();
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      this.pageConfig.pageNum = 1;
      this.getTableData();
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    // 获取项目类型
    getTypeData() {
      
    },
    getTableData(params={}) {
      return new Promise((resolve,reject)=>{
        this.$fetch(
          "",
          {
            ...this.pageConfig,
            ...this.searchForm,
            ...params
          }
        ).then((res) => {
          this.tableData = res.data.records;
          this.pageConfig.totalCount = res.data.totalCount;
          resolve();
        })
      })
    },
    pageChange(val) {
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      // this.getTableData();
    },
  },
  filters: {
    
  },
}
</script>

<style lang="scss" scoped>
.livecount-container {
  
}
</style>

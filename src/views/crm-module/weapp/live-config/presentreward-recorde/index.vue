<template>
  <div class="presentrewardrecorde-container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="w-container">
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
  name:"presentreward-recorde",
  data(){
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'userPhone', element: 'el-input', placeholder: '用户手机号' },
        { prop: 'liveActivityName', element: 'el-input', placeholder: '直播活动名称' },
        { prop: 'xzType', element: 'el-select', placeholder: '选择类型' },
        { prop: 'payStatus', element: 'el-select', placeholder: '支付状态' }
      ],
      tableData: [],
      tableKey: [
        { name: '用户手机号',value: 'userPhone' },
        { name: '直播活动名称',value: 'liveActivityName' },
        { name: '类型',value: 'xzType' },
        { name: '礼物/打赏名称 ',value: 'presentName' },
        { name: '金额',value: 'price' },
        { name: '支付状态',value: 'payStatus' },
        { name: '创建时间',value: 'createTime' }
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

<style lang="scss" scoped>
.presentrewardrecorde-container {
  
}
</style>

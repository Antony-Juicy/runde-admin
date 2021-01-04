<template>
  <div class="livecount-container">
    <div class="w-container">
      <div class="card-wrapper">
        <el-row :gutter="12">
          <el-col :span="4" v-for="item in 5" :key="item">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-content">0</div>
                <div class="call-title">总直播场次</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="w-container mt-15">
      <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig="pageConfig"
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
        { prop: 'couponName', element: 'el-input', placeholder: '直播名称/id' },
        { prop: 'couponType', element: 'el-select', placeholder: '项目类型' },
        { prop: 'status', element: 'el-select', placeholder: '收费类型' }
      ],
      tableData: [],
      tableKey: [
        { name: '直播id',value: 'liveID' },
        { name: '直播展示图',value: 'liveImg' },
        { name: '项目类型',value: 'projectType' },
        { name: '直播名称',value: 'liveName' },
        { name: '收费类型',value: 'sfType' },
        { name: '访问量pv',value: 'fwcountPV' },
        { name: '独立访问客uv',value: 'dlcountUV' },
        { name: '订单量',value: 'orders' },
        { name: '成交额',value: 'dealCount' },
        { name: '操作',value: 'edit',operate: true,width: 120 }
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
.livecount-container {
  .card-wrapper {
    display: flex;
    & > div {
      flex: 1;
    }
    .call-total {
      text-align: center;
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

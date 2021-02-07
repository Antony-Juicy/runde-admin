<template>
  <div class="livecount-container">
    <div class="w-container">
      <div class="card-wrapper">
        <el-row :gutter="12">
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-content">{{live_totalCount}}</div>
                <div class="call-title">总直播场次</div> 
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-content">{{live_turnover}}</div>
                <div class="call-title">总成交额</div> 
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-content">{{live_orderCount}}</div>
                <div class="call-title">订单总数</div> 
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-content">{{live_pv}}</div>
                <div class="call-title">总访问量pv</div> 
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-content">{{live_uv}}</div>
                <div class="call-title">总独立访客数uv</div> 
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
        :pageConfig.sync="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="liveCover" slot-scope="scope">
          <img :src="scope.row.liveCover" style="width:60px;height:60px;" alt="">
        </template>
        <template slot="liveChargeMode" slot-scope="scope">
          <span>{{ scope.row.liveChargeMode | liveChargeModeFilter }}</span>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="openConfig(scope.row)" type="text" size="small">数据分析</el-button>
        </template>
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
        { prop: 'liveId', element: 'el-input', placeholder: '直播id' },
        { prop: 'typeId', element: 'el-select', placeholder: '项目类型' },
        { 
          prop: 'liveChargeMode',
          element: 'el-select',
          placeholder: '收费类型',
          options: [
            {
              label: "公开",
              value: "Open",
            },
            {
              label: "付费",
              value: "Encryption",
            },
            {
              label: "加密",
              value: "Charge",
            }
          ],
        }
      ],
      live_totalCount: 0,
      live_turnover: 0,
      live_orderCount: 0,
      live_pv: 0,
      live_uv: 0,
      tableData: [],
      tableKey: [
        { name: '直播id',value: 'liveId' },
        { name: '直播展示图',value: 'liveCover',operate: true },
        { name: '项目类型',value: 'typeName' },
        { name: '直播名称',value: 'liveName' },
        { name: '收费类型',value: 'liveChargeMode',operate: true },
        { name: '访问量pv',value: 'pv' },
        { name: '独立访问客uv',value: 'uv' },
        { name: '订单量',value: 'orderCount' },
        { name: '成交额',value: 'turnover' },
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
  mounted () {
    this.getSummaryData();
    this.getTypeData();
    this.getTableData();
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
    getSummaryData() {
      this.$fetch(
        "live_detail_summary",
        {
          
        }
      ).then((res) => {
        this.live_totalCount = res.data.totalLiveCount
        this.live_turnover = res.data.turnover
        this.live_orderCount = res.data.orderCount
        this.live_pv = res.data.pv
        this.live_uv = res.data.uv
      });
    },
    // 获取项目类型
    getTypeData() {
      this.$fetch(
        "projectType_normalList",
        {
          loginUserId: this.$common.getUserId()
        }
      ).then((res) => {
        this.typeOptions = res.data.map((item) => ({
          label: item.typeName,
          value: item.typeId,
        }));
        this.formOptions.splice(1,1,{ prop: 'typeId', element: 'el-select', placeholder: '项目类型', options: this.typeOptions })
      });
    },
    getTableData(params) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch(
        "live_detail_list",
        params || {
          ...this.pageConfig,
          ...this.searchForm
        }
      ).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.totalCount;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
    pageChange(val) {
      console.log(val,'pagechange')
      this.getTableData({
        pageNum: (val && val.page) || 1,
        pageSize: (val && val.limit) || 10,
      });
    },
    openConfig(row) {
      console.log(row,'row-----')
      this.$router.push({
        path: '/crm-module/weapp/live',
        query: {
          liveId: row.liveId,
          flag: 'analysis'
        }
      })
    }
  },
  filters: {
    liveChargeModeFilter(status){
      switch(status){
        case "Open":
          return '公开';
        case "Encryption":
          return '付费';
        case "Charge":
          return '加密';
        default:
          return '';
      }
    }
  },
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

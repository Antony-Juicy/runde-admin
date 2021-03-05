<template>
  <div class="coupons">
    <div class="tips">
      温馨提醒：设置的优惠券在直播当天用户都能领取，过了当天24：00：00之后则不能再领取红包
    </div>
    <div class="content">
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        fixedTwoRow
        highlight-current-row
        :pageConfig.sync="pageConfig"
        :emptyText="emptyText"
        @pageChange="pageChange"
      >
        <template slot="couponType" slot-scope="scope">
          {{scope.row.couponType | typeFilter}}
        </template>
        <template slot="distributeStatus" slot-scope="scope">
          {{scope.row.distributeStatus == 'Normal' ?'正常':'已停止'}}
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >领取明细</el-button
          ><el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            size="small"
            style="color: #ec5b56"
            @click="handleSend(scope.row)"
            >{{scope.row.distributeStatus == 'Normal'?'停止派发':'继续派发'}}</el-button
          >
        </template>
      </rd-table>
    </div>

    <!-- 领取明细 -->
    <el-drawer
      title="优惠券领取明细"
      :visible.sync="drawerVisible1"
      :direction="'rtl'"
      :size="'50%'"
      append-to-body>
      <couponDetail :liveCouponId="liveCouponId" v-if="drawerVisible1"/>
    </el-drawer>
  </div>
</template>

<script>
import couponDetail from './couponDetail'
export default {
  name: "coupon",
  data() {
    return {
      tableData: [
      ],
      tableKey: [
        {
          name: "优惠券名称",
          value: "couponName",
        },
        {
          name: "优惠券类型",
          value: "couponType",
          operate: true
        },
        {
          name: "派发数量",
          value: "distributeCount",
        },
        {
          name: "派发时间",
          value: "distributeDate",
        },
        {
          name: "状态",
          value: "distributeStatus",
          operate: true
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 160,
        },
      ],
      drawerVisible1: false,
      liveCouponId: 0,
      pageConfig: {
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
      },
      emptyText:"暂无数据"
    };
  },
  components:{
    couponDetail
  },
  mounted(){
    this.getTableData();
  },
  props: {
    liveId: {
      type: Number,
    },
    refreshFlag2:{
      type: Number
    }
  },
  watch:{
    refreshFlag2(newVal,oldVal){
      if(newVal>oldVal){
        this.getTableData();
      }
    }
  },
  filters: {
    typeFilter(val){
      switch(val){
        case "InstantDecrease":
          return '立减优惠';
        case "FullDiscount":
          return '满减券';
        case "Discount":
          return '折扣优惠'
      }
    },
  },
  methods: {
    pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getTableData();
    },
    getTableData(params = {}) {
      this.$fetch("live_coupon_related_list", {
        ...params,
        ...this.pageConfig,
        liveId: this.liveId
      }).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.totalCount;
      })
    },
    handleEdit(val){
      this.liveCouponId = val.liveCouponId;
      this.drawerVisible1 = true;
    },
    handleSend(data){
        this.$fetch("live_coupon_send",{
          liveCouponId:  data.liveCouponId,
          distributeStatus: data.distributeStatus == 'Normal'?'Disable':'Normal'
        }).then(res => {
          this.$message.success("操作成功")
          this.getTableData();
        })
    }
  },
};
</script>

<style lang="scss" scoped>
.coupons {
  .tips {
    color: red;
    font-size: 12px;
    margin-bottom: 10px;
    margin-top: 10px;
  }
}
</style>

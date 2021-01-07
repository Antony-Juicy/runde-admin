<template>
  <div class="share-config">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="addVisible = true"
          >添加商品</el-button
        >
        <el-button type="warning" size="small" @click="couponVisible = true"
          >发优惠券</el-button
        >
      </div>
      <div class="content-wrapper">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="商品列表" name="first">
              <goodsList/>
          </el-tab-pane>
          <el-tab-pane label="优惠券明细" name="second">
              <coupon/>
          </el-tab-pane>
          <el-tab-pane label="答题卡明细" name="third">
              <answer/>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- 添加商品弹窗 -->
      <rd-dialog
        :title="'添加商品'"
        :dialogVisible="addVisible"
        :append-to-body="true"
        :submitText="'添加到直播间'"
        :width="'780px'"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm()"
      >
        <addGoods/>
      </rd-dialog>

      <!-- 发送优惠券弹窗 -->
      <rd-dialog
        :title="'优惠券'"
        :dialogVisible="couponVisible"
        :append-to-body="true"
        :showFooter="false"
        @handleClose="couponVisible = false"
        @submitForm="submitCouponForm()"
      >
        <sendCoupon @close="couponVisible = false"/>
      </rd-dialog>
  </div>
</template>

<script>
import goodsList from './goodsList'
import coupon from './coupon'
import answer from './answer'
import addGoods from './addGoods'
import sendCoupon from './sendCoupon'
export default {
  name:"temp",
  data(){
    return {
      activeName:"first",
      addVisible: false,
      couponVisible: false
    }
  },
  components: {
      goodsList,
      coupon,
      answer,
      addGoods,
      sendCoupon
  },
   methods: {
     handleClick(){

     }
  }
}
</script>

<style lang="scss" scoped>
.share-config {
  padding-left: 30px;
  .content-wrapper {
    /deep/ {
    // .el-tabs__nav-wrap .el-tabs__nav-scroll {
    //         background: #fff;
    //     }
        .el-tabs__active-bar {
          width: 56px;
        }
  }
  }
  
}
</style>

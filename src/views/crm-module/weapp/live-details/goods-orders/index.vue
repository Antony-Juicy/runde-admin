<template>
  <div class="goodsorders-container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch ref="myserach"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="exportOrders">导出</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig.sync="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="orderStatus" slot-scope="scope">
          <span>{{ scope.row.orderStatus | orderStatusFilter }}</span>
        </template>
        <template slot="jwSyncStatus" slot-scope="scope">
          <span>{{ scope.row.jwSyncStatus | jwSyncStatusFilter }}</span>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="openConfig(scope.row)" type="text" size="small">查看明细</el-button>
        </template>
      </rd-table>
      <fullDialog v-model="ordersVisible" :title="ordersTitle" @change="ordersVisible = false">
        <div class="title_drawer">订单详情</div>
        <el-row style="margin-left: 20px;" :gutter="24">
          <el-col :span="8">
            <div class="term">订单id：</div>
            <div class="detail">{{orderInfo.orderId}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">订单状态：</div>
            <div class="detail">{{orderInfo.orderStatus | orderStatusFilter}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">下单时间：</div>
            <div class="detail">{{orderInfo.createAt}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">结算时间：</div>
            <div class="detail">{{orderInfo.payTime}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">交易单号：</div>
            <div class="detail">{{orderInfo.payOrderId}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">支付方式：</div>
            <div class="detail">{{orderInfo.payType}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">直播名称：</div>
            <div class="detail">{{orderInfo.sourceName}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">推广老师：</div>
            <div class="detail">{{orderInfo.teacherInfo}}</div>
          </el-col>
        </el-row>
        <div class="title_drawer">买家信息</div>
        <el-row style="margin-left: 20px;" :gutter="24">
          <el-col :span="8">
            <div class="term">买家昵称：</div>
            <div class="detail">{{buyerInfo.nickName}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">买家手机号：</div>
            <div class="detail">{{buyerInfo.phone}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">支付时间：</div>
            <div class="detail">{{buyerInfo.payTime}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">支付金额：</div>
            <div class="detail">{{buyerInfo.actuallyPaid}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">收货人：</div>
            <div class="detail">{{buyerInfo.consignee}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">联系电话：</div>
            <div class="detail">{{buyerInfo.consigneePhone}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">收货地址：</div>
            <div class="detail">{{buyerInfo.deliveryAddress}}</div>
          </el-col>
        </el-row>
        <div class="title_drawer">商品信息</div>
        <el-row style="margin-left: 20px;" :gutter="24">
          <el-col :span="8">
            <div class="term">商品名称：</div>
            <div class="detail">{{goodsInfo.goodsName}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">商品id：</div>
            <div class="detail">{{goodsInfo.goodsId}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">规格：</div>
            <div class="detail">{{goodsInfo.goodsItems}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">开通班型id：</div>
            <div class="detail">{{goodsInfo.openClassId}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">开通课程id：</div>
            <div class="detail">{{goodsInfo.openSubjectId}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">配送内容：</div>
            <div class="detail">{{goodsInfo.ancillaryGoods}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">优惠：</div>
            <div class="detail">{{goodsInfo.discountAmount}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">配送费：</div>
            <div class="detail">{{goodsInfo.freight}}</div>
          </el-col>
          <el-col :span="8">
            <div class="term">小计：</div>
            <div class="detail">{{goodsInfo.paymentAmount}}</div>
          </el-col>
        </el-row>
      </fullDialog>
    </div>
  </div>
</template>

<script>
import fullDialog from '@/components/FullDialog';
export default {
  name:"goods-orders",
  components: {
    fullDialog
  },
  data(){
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'orderId', element: 'el-input', placeholder: '订单id' },
        { prop: 'goodsName', element: 'el-input', placeholder: '商品名称' },
        { prop: 'sourceName', element: 'el-input', placeholder: '直播名称' },
        { prop: 'teacherName', element: 'el-input', placeholder: '推广老师' },
        { prop: 'phone', element: 'el-input', placeholder: '用户手机号' },
        { prop: 'typeId', element: 'el-cascader', placeholder: '项目分类', props: { checkStrictly: true } },
        { 
          prop: 'orderStatus',
          element: 'el-select',
          placeholder: '订单状态',
          options: [
            {
              label: "待支付",
              value: "WaitPay",
            },
            {
              label: "已支付",
              value: "Finish",
            },
            {
              label: "已失效",
              value: "Cancel",
            }
          ],
        },
        { 
          prop: 'jwSyncStatus',
          element: 'el-select',
          placeholder: '同步状态',
          options: [
            {
              label: "未同步",
              value: "UnSynchronized",
            },
            {
              label: "同步成功",
              value: "SyncSuccess",
            },
            {
              label: "同步失败",
              value: "SyncFail",
            }
          ],
        },
        { prop: 'ordersTime', element: 'el-date-picker', startPlaceholder: "下单开始时间", endPlaceholder: "下单结束时间" }
      ],
      tableData: [],
      tableKey: [
        { name: '订单id',value: 'orderId' },
        { name: '商品',value: 'goodsName' },
        { name: '直播活动名称',value: 'sourceName' },
        { name: '姓名',value: 'consignee' },
        { name: '订单手机号',value: 'phone' },
        { name: '实付金额',value: 'paymentAmount' },
        { name: '订单状态',value: 'orderStatus',operate: true },
        { name: '下单时间',value: 'createAt' },
        { name: '邀请老师',value: 'teacherName' },
        { name: '同步状态',value: 'jwSyncStatus',operate: true },
        { name: '操作',value: 'edit',operate: true,width: 120 }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,

      // 订单详情弹窗
      ordersVisible: false,
      ordersTitle: '',
      buyerInfo: {},
      goodsInfo: {},
      orderInfo: {}
    }
  },
  mounted () {
    
    this.getTypeData();
    const { goodsName,sourceName, teacherName } = this.$route.params;
    if(sourceName){
      this.formOptions[2].initValue = decodeURIComponent(sourceName)
    }
    if(goodsName){
      this.formOptions[1].initValue = decodeURIComponent(goodsName)
    }
    if(teacherName){
      this.formOptions[3].initValue = decodeURIComponent(teacherName)
    }

    this.$refs.myserach.addInitValue()
    this.$refs.myserach.onSearch()
  },
  watch:{
    "$route.params.sourceName"(newVal){
      if(!newVal){
        return
      }
      this.formOptions[2].initValue = decodeURIComponent(newVal)
      this.$refs.myserach.addInitValue()
      this.$refs.myserach.onSearch()
    },
    "$route.params.goodsName"(newVal){
      if(!newVal){
        return
      }
      this.formOptions[1].initValue = decodeURIComponent(newVal)
      this.$refs.myserach.addInitValue()
      this.$refs.myserach.onSearch()
    },
    "$route.params.teacherName"(newVal){
      if(!newVal){
        return
      }
      this.formOptions[3].initValue = decodeURIComponent(newVal)
      this.$refs.myserach.addInitValue()
      this.$refs.myserach.onSearch()
    }
  },
  methods: {
    onSearch(val) {
      if(val.ordersTime) {
        this.searchForm = {
          createDateStart: val.ordersTime[0],
          createDateEnd: val.ordersTime[1]
        }
      } else {
        this.searchForm = {
          ...val,
        };
        if(this.searchForm.orderId && isNaN(this.searchForm.orderId) ){
          this.$message.warning("请输入正确的订单id")
          return
        }
      }
      this.pageConfig.pageNum = 1;
      this.getTableData();
      console.log(this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    // 获取项目类型
    getTypeData() {
      this.$fetch(
        "projectType_select",
      ).then((res) => {
        // this.typeOptions = res.data.map((item) => ({
        //   label: item.typeName,
        //   value: item.typeId,
        // }));
        this.typeOptions = this.$common.getTypeTree((res.data))
        this.formOptions.splice(5,1,{ prop: 'typeId', element: 'el-cascader', placeholder: '项目分类',props: { checkStrictly: true }, options: this.typeOptions })
      });
    },
    getTableData(params={}) {
      return new Promise((resolve,reject)=>{
        let searchForm = JSON.parse(JSON.stringify(this.searchForm))
        if(this.searchForm.typeId) {
          searchForm.typeId = searchForm.typeId.pop()
        }
        console.log(searchForm.typeId,'this.searchForm.typeId---')
        this.$fetch(
          "orders_list",
          {
            ...this.pageConfig,
            ...searchForm,
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
      console.log(val,'pagechange')
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getTableData();
    },
    openConfig(row) {
      console.log(row,'row----')
      this.ordersVisible = true;
      this.ordersTitle = row.goodsName;
      this.$fetch(
        "orders_detail",
        {
          orderId: row.orderId
        }
      ).then((res) => {
        console.log(res,'res-----------')
        this.buyerInfo = res.data.buyerInfo
        this.goodsInfo = res.data.goodsInfo
        this.orderInfo = res.data.orderInfo
      });
    },
    exportOrders() {
      let searchForm = JSON.parse(JSON.stringify(this.searchForm))
      if(this.searchForm.typeId) {
        searchForm.typeId = searchForm.typeId.pop()
      }
      this.$fetch(
        "orders_export",
        {
          ...searchForm
        }
      ).then((res) => {
        this.$message.success("导出成功");
        this.$common.downLoadFile(res);
      })
    }
  },
  filters: {
    orderStatusFilter(status){
      switch(status){
        case "WaitPay":
          return '待支付';
        case "Finish":
          return '已支付';
        case "Cancel":
          return '已失效';
        default:
          return '';
      }
    },
    jwSyncStatusFilter(status){
      switch(status){
        case "UnSynchronized":
          return '未同步';
        case "SyncSuccess":
          return '同步成功';
        case "SyncFail":
          return '同步失败';
        default:
          return '';
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.goodsorders-container {
  .term {
    color: #606266;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    padding-bottom: 16px;
    margin-right: 8px;
    white-space: nowrap;
    display: table-cell;
  }
  .detail {
    font-weight: 500;
    font-size: 14px;
    line-height: 1.5;
    width: 100%;
    padding-bottom: 16px;
    color: #606266;
    display: table-cell;
  }
  .title_drawer {
    font-weight: 700;
    font-size: 16px;
    line-height: 1.5;
    padding: 10px 0;
    margin-bottom: 20px;
    color: rgb(55, 163, 255);;
    background-color: rgb(229, 237, 244);
  }
}
</style>

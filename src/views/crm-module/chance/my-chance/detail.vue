<template>
  <div class="my-chance-detail">
    <el-tabs v-model="activeDetail" @tab-click="handleDetailClick">
      <el-tab-pane label="九块九包邮" name="1"></el-tab-pane>
      <el-tab-pane label="微赞管理" name="2"></el-tab-pane>
      <el-tab-pane label="密押考点" name="3"></el-tab-pane>
      <el-tab-pane label="地推卡管理" name="4"></el-tab-pane>
    </el-tabs>
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :fixedTwoRow="true"
      :pageConfig.sync="pageConfig"
      :tbodyHeight="800"
    >
    </rd-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeDetail: "1",
      tableData: [],
      tableKey: [
        {
          name: "姓名",
          value: "id",
        },
        {
          name: "微信昵称",
          value: "id",
        },
        {
          name: "地址",
          value: "id",
        },
        {
          name: "商品名称",
          value: "id",
        },
        {
          name: "科目",
          value: "id",
        },
        {
          name: "编码",
          value: "id",
        },
        {
          name: "商品数量",
          value: "id",
        },
        {
          name: "支付金额",
          value: "id",
        },
        {
          name: "支付时间",
          value: "id",
        },
        {
          name: "老师姓名",
          value: "id",
        },
        {
          name: "分校",
          value: "id",
        },
        {
          name: "支付类型",
          value: "id",
        },
        {
          name: "订单来源",
          value: "id",
        },
        {
          name: "支付状态",
          value: "id",
        },
        {
          name: "发送短信状态",
          value: "id",
        },
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  props:{
    detailPhone:{
      type: String,
      default:""
    }
  },
  watch:{
    detailPhone(val){
      console.log(val,'detailphone')
    }
  },
  methods: {
    handleDetailClick(tab, event) {
      console.log(tab, event);
      if (tab.name == "1") {
        //   9.9包邮
        this.tableKey = [
          {
            name: "姓名",
            value: "id",
          },
          {
            name: "微信昵称",
            value: "id",
          },
          {
            name: "地址",
            value: "id",
          },
          {
            name: "商品名称",
            value: "id",
          },
          {
            name: "科目",
            value: "id",
          },
          {
            name: "编码",
            value: "id",
          },
          {
            name: "商品数量",
            value: "id",
          },
          {
            name: "支付金额",
            value: "id",
          },
          {
            name: "支付时间",
            value: "id",
          },
          {
            name: "老师姓名",
            value: "id",
          },
          {
            name: "分校",
            value: "id",
          },
          {
            name: "支付类型",
            value: "id",
          },
          {
            name: "订单来源",
            value: "id",
          },
          {
            name: "支付状态",
            value: "id",
          },
          {
            name: "发送短信状态",
            value: "id",
          },
        ];
      } else if (tab.name == "2") {
          console.log(222,'222-')
        //   微赞管理
        this.tableKey = [
          {
            name: "序号",
            value: "id",
          },
          {
            name: "活动名称",
            value: "id",
          },
          {
            name: "项目",
            value: "id",
          },
          {
            name: "微信昵称",
            value: "id",
          },
          {
            name: "性别",
            value: "id",
          },
          {
            name: "短信状态",
            value: "id",
          },
          {
            name: "老师名称",
            value: "id",
          },
          {
            name: "分校",
            value: "id",
          },
          {
            name: "省校",
            value: "id",
          },
          {
            name: "邀请时间",
            value: "id",
          },
          {
            name: "更新时间",
            value: "id",
          }
        ];
      } else if (tab.name == "3") {
        //   密押考点
        this.tableKey = [
          {
            name: "id主键",
            value: "id",
          },
          {
            name: "活动id",
            value: "id",
          },
          {
            name: "活动名称",
            value: "id",
          },
          {
            name: "微信unionid",
            value: "id",
          },
          {
            name: "微信openid",
            value: "id",
          },
          {
            name: "微信昵称",
            value: "id",
          },
          {
            name: "数据状态",
            value: "id",
          },
          {
            name: "创建时间",
            value: "id",
          },
          {
            name: "更新时间",
            value: "id",
          }
        ];
      } else if (tab.name == "4") {
        //   地推卡管理
        this.tableKey = [
          {
            name: "序号",
            value: "id",
          },
          {
            name: "优惠券名称",
            value: "id",
          },
          {
            name: "优惠券id",
            value: "id",
          },
          {
            name: "用户id",
            value: "id",
          },
          {
            name: "openId",
            value: "id",
          },
          {
            name: "目标id",
            value: "id",
          },
          {
            name: "目标名称",
            value: "id",
          },
          {
            name: "邀请码",
            value: "id",
          },
          {
            name: "邀请时间",
            value: "id",
          },
          {
            name: "更新时间",
            value: "id",
          }
        ];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.my-chance-detail {
  margin-top: -15px;
}
</style>

<template>
  <div class="chance-track w-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="small"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first"></el-tab-pane>
      <el-tab-pane label="配置管理" name="second"></el-tab-pane>
      <el-tab-pane label="角色管理" name="third"></el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
    </el-tabs>
    <div class="content-box">
      <el-card class="box-card">
        <div slot="header" class="clearfix card-title">
          <span>机会 - 基本资料</span>
        </div>
        <div class="card-content">
          <div class="info-item">
            <div class="item-label">姓名：</div>
            <div class="item-content">飞翔的荷兰人</div>
          </div>
          <div class="info-item">
            <div class="item-label">手机号码：</div>
            <div class="item-content">15692026183</div>
          </div>
          <div class="info-item">
            <div class="item-label">注册人：</div>
            <div class="item-content">李文婷</div>
          </div>
          <div class="info-item">
            <div class="item-label">创建时间：</div>
            <div class="item-content">2020-12-18 10:35:03</div>
          </div>
          <div class="info-item">
            <div class="item-label">机会来源：</div>
            <div class="item-content">网络</div>
          </div>
          <div class="info-item">
            <div class="item-label">机会状态：</div>
            <div class="item-content">未跟进</div>
          </div>
          <div class="info-item">
            <div class="item-label">活动名称：</div>
            <div class="item-content">飞翔的荷兰人</div>
          </div>
          <div class="info-item">
            <div class="item-label">赛道：</div>
            <div class="item-content">线下</div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div slot="header" class="clearfix card-title">
          <span>机会 - 流转记录</span>
        </div>
        <div class="card-content">
          <rd-table
            :tableData="tableData"
            :tableKey="tableKey"
            :pageConfig="pageConfig"
            fixedTwoRow
          >
          </rd-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "chance-track",
  data() {
    return {
      formInline: {
        phone: "",
      },
      activeName: "first",
       tableData: [
        { id: 1, name: "飞翔的荷兰人3", cutdown: 1608897351706, visit: 2,phone:'15692026183' },
      ],
      tableKey: [
        {
          name: "记录编号",
          value: "name",
        },
         {
          name: "归属组织",
          value: "phone",
          operate: true
        },
        {
          name: "归属销售",
          value: "cutdown",
          operate: true,
          width: 155,
        },
        {
          name: "跟进次数",
          value: "menuUrl",
        },
        {
          name: "状态说明",
          value: "visit",
          operate: true,
        },
        {
          name: "机会停留模块",
          value: "menuOrder"
        },
        {
          name: "创建人",
          value: "description1",
        },
        {
          name: "变动时间",
          value: "description2",
        }
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.chance-track {
  .content-box {
    .box-card {
      margin-bottom: 20px;
    }
    .card-title {
      font-size: 20px;
    }
    .card-content {
      width: 100%;
      font-size: 14px;
      .info-item {
        width: 19%;
        display: inline-block;
        line-height: 40px;
        .item-label{
          display: inline-block;
          width: 80px;
          text-align: right;
        }
        .item-content {
          display: inline-block;
          border: 1px solid #EBEEF5;
          padding-left: 5px;
          width: 150px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>

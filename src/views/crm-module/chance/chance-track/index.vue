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
      <el-tab-pane
        :label="item.label"
        :name="item.idStr + ''"
        v-for="item in tabList"
        :key="item.idStr"
      ></el-tab-pane>
    </el-tabs>
    <div class="content-box">
      <el-card class="box-card">
        <div slot="header" class="clearfix card-title">
          <span>机会 - 基本资料</span>
        </div>
        <div class="card-content">
          <div class="row1">
            <div class="info-item">
              <div class="item-label">姓名：</div>
              <div class="item-content">{{ currentInfo.studentName }}</div>
            </div>
            <div class="info-item">
              <div class="item-label">手机号码：</div>
              <div class="item-content">{{ currentInfo.phone }}</div>
            </div>
            <div class="info-item">
              <div class="item-label">注册人：</div>
              <div class="item-content">{{ currentInfo.createStaffName }}</div>
            </div>
            <div class="info-item">
              <div class="item-label">创建时间：</div>
              <div class="item-content">
                {{ $common._formatDates(currentInfo.createAt) }}
              </div>
            </div>
            <div class="info-item">
              <div class="item-label">机会来源：</div>
              <div class="item-content">{{ currentInfo.saleSource }}</div>
            </div>
          </div>
          <div class="row1">
            <div class="info-item">
              <div class="item-label">机会状态：</div>
              <div class="item-content">{{ currentInfo.status }}</div>
            </div>
            <div class="info-item">
              <div class="item-label">活动名称：</div>
              <div class="item-content">{{ currentInfo.labelInfoName }}</div>
            </div>
            <div class="info-item">
              <div class="item-label">赛道：</div>
              <div class="item-content">
                {{ currentInfo.opportunityCampusNature }}
              </div>
            </div>
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
            :pageConfig.sync="pageConfig"
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
      activeName: "",
      tableData: [],
      tableKey: [
        {
          name: "记录编号",
          value: "id",
        },
        {
          name: "归属组织",
          value: "campusName",
        },
        {
          name: "归属销售",
          value: "marketName",
        },
        {
          name: "跟进次数",
          value: "feedbackNum",
        },
        {
          name: "状态说明",
          value: "statusShow",
        },
        {
          name: "机会停留模块",
          value: "stayModule",
        },
        {
          name: "创建人",
          value: "createStaffName",
        },
        {
          name: "变动时间",
          value: "updateAt",
        },
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      tabList: [],
      currentInfo: {},
    };
  },
  methods: {
    onSubmit() {
      // console.log(this.formInline.phone,"submit!");
      if (!this.formInline.phone) {
        this.$message.warning("手机号不能为空");
        return;
      }

      this.$fetch("chance_track_byPhone", {
        phone: this.formInline.phone,
      }).then((res) => {
        this.tabList = res.data.map((item) => ({
          idStr: item.idStr,
          label: `机会id：${item.idStr}`,
        }));
        this.activeName = this.tabList[0].idStr + "";
        // // 获取当前id的信息
        console.log(this.tabList,'this.tablist')
        // 获取表格信息
        this.getTableData({
          opportunityId: this.tabList[0].idStr,
        });
      }).catch(()=>{
        this.tabList = [];
        this.currentInfo = {};
        this.tableData = [];
      })
    },
    handleClick(tab, event) {
     
      this.getTableData({
        opportunityId: tab.name,
      });
    },
    getTableData(param) {
       this.$fetch("chance_track_byId",param).then((result) => {
          this.currentInfo = result.data.dataJson;
        });
      this.$fetch("chance_track_record", param).then((res) => {
        let data = JSON.parse(res.msg);
        this.tableData = data.data;
      });
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
      .row1 {
        display: flex;
      }
      .info-item {
        width: 19%;
        display: flex;
        line-height: 40px;
        .item-label {
          display: inline-block;
          width: 80px;
          text-align: right;
        }
        .item-content {
          display: inline-block;
          border: 1px solid #ebeef5;
          padding-left: 5px;
          width: 150px;
          margin-bottom: 10px;
          height: 42px;
        }
      }
    }
  }
}
</style>

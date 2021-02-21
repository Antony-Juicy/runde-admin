<template>
  <div class="analysis">
    <div class="title">汇总数据</div>
    <div class="content">
      <div class="first-row">
        <div class="item1">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p class="num">{{ this.dataList.pv }}</p>
            <p>访问量PV</p>
          </el-card>
        </div>
        <div class="item1">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p class="num">{{ this.dataList.uv }}</p>
            <p>独立访客UV</p>
          </el-card>
        </div>
      </div>
      <div class="second-row">
        <div class="item2">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p class="num">{{ this.dataList.turnover }}</p>
            <p>成交额</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p class="num">{{ this.dataList.orderCount }}</p>
            <p>订单量</p>
            <p class="details" @click="showOrder">查看明细</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p class="num">{{ this.dataList.invitationCount }}</p>
            <p>邀请量</p>
            <p class="details" @click="showInvite">查看明细</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p class="num">{{ this.dataList.rewardAmount }}</p>
            <p>礼物及打赏额</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p class="num">{{ this.dataList.giftGiveCount }}</p>
            <p>礼物送出量</p>
          </el-card>
        </div>
      </div>
    </div>

    <div class="title">直播榜单</div>
    <div class="content">
      <div class="third-row">
        <div class="item3">
          <el-card
            shadow="hover"
            :body-style="{ height: '100px' }"
            @click.native="drawerVisible1 = true"
          >
            <p class="item3-title">省校榜</p>
            <p class="details">查看明细</p>
          </el-card>
        </div>
        <div class="item3">
          <el-card
            shadow="hover"
            :body-style="{ height: '100px' }"
            @click.native="drawerVisible2 = true"
          >
            <p class="item3-title">分校榜</p>
            <p class="details">查看明细</p>
          </el-card>
        </div>
        <div class="item3">
          <el-card
            shadow="hover"
            :body-style="{ height: '100px' }"
            @click.native="drawerVisible3 = true"
          >
            <p class="item3-title">全国个人榜</p>
            <p class="details">查看明细</p>
          </el-card>
        </div>
      </div>
      <div class="third-row">
        <div class="item3">
          <el-card
            shadow="hover"
            :body-style="{ height: '100px' }"
            @click.native="drawerVisible4 = true"
          >
            <p class="item3-title">省校个人榜</p>
            <p class="details">查看明细</p>
          </el-card>
        </div>
        <div class="item3">
          <el-card
            shadow="hover"
            :body-style="{ height: '100px' }"
            @click.native="drawerVisible5 = true"
          >
            <p class="item3-title">分校个人榜</p>
            <p class="details">查看明细</p>
          </el-card>
        </div>
        <div class="item3">
          <el-card
            shadow="hover"
            :body-style="{ height: '100px' }"
            @click.native="drawerVisible6 = true"
          >
            <p class="item3-title">当前用户个人榜</p>
            <p class="details">查看明细</p>
          </el-card>
        </div>
      </div>
    </div>

    <div class="title">用户榜单</div>
    <div class="content">
      <div class="user-list">
        <div class="list">
          <el-card class="box-card">
            <div slot="header" class="clearfix card-header">
              <span class="title-name">邀请榜（Top100）</span>
              <!-- <el-button
                class="export-btn"
                style="float: right; padding: 3px 0"
                type="text"
                >导出数据</el-button
              > -->
            </div>
            <div class="text invite">
              <rd-table
                :tableData="tableData"
                :tableKey="tableKey"
                :pageConfig.sync="pageConfig"
                :border="false"
                :fixedTwoRow="true"
                :pager-count="5"
                @pageChange="pageChange"
              >
                <template slot="index" slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </rd-table>
            </div>
          </el-card>
        </div>
        <div class="list">
          <el-card class="box-card">
            <div slot="header" class="clearfix card-header">
              <span class="title-name">打赏榜（Top100）</span>
              <!-- <el-button
                class="export-btn"
                style="float: right; padding: 3px 0"
                type="text"
                >导出数据</el-button
              > -->
            </div>
            <div class="text reward">
              <rd-table
                :tableData="tableData2"
                :tableKey="tableKey2"
                :pageConfig.sync="pageConfig2"
                :border="false"
                :fixedTwoRow="true"
                :pager-count="5"
                @pageChange="pageChange2"
              >
                <template slot="index" slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </rd-table>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <el-drawer
      title="省校榜"
      :visible.sync="drawerVisible1"
      :direction="'rtl'"
      :size="'50%'"
      append-to-body
    >
      <provinceList :liveId="liveId" @close="drawerVisible1 = false" />
    </el-drawer>

    <el-drawer
      title="分校榜"
      :visible.sync="drawerVisible2"
      :direction="'rtl'"
      :size="'50%'"
      append-to-body
    >
      <campustList :liveId="liveId" />
    </el-drawer>

    <el-drawer
      title="全国个人榜"
      :visible.sync="drawerVisible3"
      :direction="'rtl'"
      :size="'50%'"
      append-to-body
    >
      <personalList :liveId="liveId" />
    </el-drawer>

    <el-drawer
      title="省校个人榜"
      :visible.sync="drawerVisible4"
      :direction="'rtl'"
      :size="'50%'"
      append-to-body
    >
      <personalList2 :liveId="liveId" />
    </el-drawer>

    <el-drawer
      title="分校个人榜"
      :visible.sync="drawerVisible5"
      :direction="'rtl'"
      :size="'50%'"
      append-to-body
    >
      <personalList3 :liveId="liveId" />
    </el-drawer>

    <el-drawer
      title="当前用户个人榜"
      :visible.sync="drawerVisible6"
      :direction="'rtl'"
      :size="'50%'"
      append-to-body
    >
      <personalList4 :liveId="liveId" />
    </el-drawer>
  </div>
</template>

<script>
import rdDrawer from "@/components/RdDrawer";
import provinceList from "./provinceList";
import campustList from "./campustList";
import personalList from "./personalList";
import personalList2 from "./personalList2";
import personalList3 from "./personalList3";
import personalList4 from "./personalList4";
export default {
  name: "analysis",
  data() {
    return {
      cardHeight: "130px",
      tableData: [],
      tableKey: [
        {
          name: "排名",
          value: "ranking",
          // operate: true,
          width: 80,
        },
        {
          name: "用户名",
          value: "nickName",
        },
        {
          name: "邀请数",
          value: "invitationCount",
          width: 100,
        },
      ],
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },

      tableData2: [],
      tableKey2: [
        {
          name: "排名",
          value: "ranking",
          // operate: true,
          width: 80,
        },
        {
          name: "用户名",
          value: "nickName",
        },
        {
          name: "礼物打赏榜",
          value: "rewardPrice",
          width: 100,
        },
      ],
      pageConfig2: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },

      drawerVisible1: false,
      drawerVisible2: false,
      drawerVisible3: false,
      drawerVisible4: false,
      drawerVisible5: false,
      drawerVisible6: false,
      dataList: "",
      provinceSchoolList: "",
      branchSchoolList: "",
      personalList: "",
      rewardList: "",
      invitationList: [],
    };
  },
  components: {
    rdDrawer,
    provinceList,
    campustList,
    personalList,
    personalList2,
    personalList3,
    personalList4,
  },
  props: {
    liveId: {
      type: Number,
    },
    liveName: {
      type: String,
    },
  },
  mounted() {
    // 汇总数据
    this.$fetch("live_statistics_detail", {
      liveId: this.liveId,
    }).then((res) => {
      this.dataList = res.data;
    });

    // this.$fetch("live_provincial_school_list", {
    //   liveId: this.liveId
    // }).then((res) => {
    //   console.log(res,'provinceSchoolList')
    //   this.provinceSchoolList = res.records
    // });

    // this.$fetch("live_branch_school_list", {
    //   liveId: this.liveId,
    // }).then((res) => {
    //   console.log(res,'branchSchoolList')
    //   this.branchSchoolList = res.records
    // });

    // this.$fetch("live_personal_list", {
    //   liveId: this.liveId,
    // }).then((res) => {
    //   console.log(res,'personalList')
    //   this.personalList = res.records
    //   this.tableData = res.records
    // });

    // 邀请榜
    this.getInvitationList();

    // 打赏榜
    this.getRewardList();
  },
  methods: {
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getInvitationList();
    },
    pageChange2(val) {},

    showProvince() {
      this.drawerVisible1 = true;
    },

    getInvitationList(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".invite .el-table",
      });
      this.$fetch("live_invitation_list", {
        ...this.pageConfig,
        ...params,
        liveId: this.liveId,
      }).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.totalCount;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },

    getRewardList(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".reward .el-table",
      });
      this.$fetch("live_reward_list", {
        ...this.pageConfig2,
        ...params,
        liveId: this.liveId,
      }).then((res) => {
        this.tableData2 = res.data.records;
        this.pageConfig2.totalCount = res.data.totalCount;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },

    showOrder() {
      this.$router.push({
        name: "/crm-module/weapp/live-details/goods-orders" + '?' + sessionStorage.getItem("router-timeStamp"),
        params: {
          sourceName: encodeURIComponent(this.liveName)
        },
      });
    },

    showInvite() {
      this.$router.push({
        name: "/crm-module/weapp/live-details/invite-count" + '?' + sessionStorage.getItem("router-timeStamp"),
        params: {
          liveName: encodeURIComponent(this.liveName)
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.analysis {
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background-color: #f0f2f5;
  min-height: 90vh;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #409eff;
    line-height: 50px;
  }
  .content {
    line-height: 1px;
    .num {
      font-size: 28px;
      margin-bottom: 13px;
    }
    .first-row {
      display: flex;
      justify-content: space-between;
      .item1 {
        width: 49%;
        text-align: center;
        margin-bottom: 10px;
        position: relative;
      }
      /deep/ {
        .el-card__body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .second-row {
      display: flex;
      justify-content: space-between;
      .item2 {
        width: 19%;
        text-align: center;
        margin-bottom: 10px;
        position: relative;
      }
      /deep/ {
        .el-card__body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .third-row {
      display: flex;
      justify-content: space-between;
      .item3 {
        width: 32.5%;
        text-align: center;
        margin-bottom: 10px;
        cursor: pointer;
        position: relative;
        .item3-title {
          font-size: 20px;
        }
        /deep/ {
          .el-card__body {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }

    .details {
      position: absolute;
      bottom: 5px;
      font-size: 12px;
      color: #777;
      cursor: pointer;
    }

    .user-list {
      display: flex;
      justify-content: space-between;
      .list {
        width: 49%;
        .text {
          font-size: 14px;
        }

        .item {
          margin-bottom: 18px;
        }

        .clearfix:before,
        .clearfix:after {
          display: table;
          content: "";
        }
        .clearfix:after {
          clear: both;
        }

        .box-card {
          width: 100%;
          .card-header {
            display: flex;
            align-items: center;
            position: relative;
            height: 25px;
          }
          .title-name {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-weight: bold;
          }
          .export-btn {
            position: absolute;
            right: 0;
          }
        }
      }
    }
  }
  /deep/ {
    .el-drawer__wrapper {
      z-index: 9999 !important;
    }
  }
}
</style>

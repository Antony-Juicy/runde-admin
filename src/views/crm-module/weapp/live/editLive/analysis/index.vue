<template>
  <div class="analysis">
    <div class="title">汇总数据</div>
    <div class="content">
      <div class="first-row">
        <div class="item1">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p class="num">421212</p>
            <p>访问量PV</p>
          </el-card>
        </div>
        <div class="item1">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p class="num">421212</p>
            <p>独立访客UV</p>
          </el-card>
        </div>
      </div>
      <div class="second-row">
        <div class="item2">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p class="num">421212</p>
            <p>成交额</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p class="num">421212</p>
            <p>订单量</p>
            <p class="details">查看明细</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p class="num">421212</p>
            <p>邀请量</p>
            <p class="details">查看明细</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p class="num">421212</p>
            <p>礼物及打赏额</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p class="num">421212</p>
            <p>礼物送出量</p>
          </el-card>
        </div>
      </div>
    </div>

    <div class="title">直播榜单</div>
    <div class="content">
      <div class="third-row">
        <div class="item3">
          <el-card shadow="hover" :body-style="{ height: '100px' }" @click.native="drawerVisible1 = true">
            <p>省校榜</p>
          </el-card>
        </div>
        <div class="item3">
          <el-card shadow="hover" :body-style="{ height: '100px' }" @click.native="drawerVisible2 = true">
            <p>分校榜</p>
          </el-card>
        </div>
        <div class="item3">
          <el-card shadow="hover" :body-style="{ height: '100px' }" @click.native="drawerVisible3 = true">
            <p>个人榜</p>
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
              <el-button class="export-btn" style="float: right; padding: 3px 0" type="text"
                >导出数据</el-button
              >
            </div>
            <div class="text">
              <rd-table
                :tableData="tableData"
                :tableKey="tableKey"
                :pageConfig="pageConfig"
                :border="false"
                :fixedTwoRow="true"
                :pager-count="5"
                @pageChange="pageChange"
              >
                <template slot="index" slot-scope="scope">
                  {{scope.$index + 1}}
                </template>
              </rd-table>
            </div>
          </el-card>
        </div>
        <div class="list">
          <el-card class="box-card">
            <div slot="header" class="clearfix card-header">
              <span class="title-name">打赏榜（Top100）</span>
              <el-button class="export-btn" style="float: right; padding: 3px 0" type="text"
                >导出数据</el-button
              >
            </div>
            <div class="text">
              <rd-table
                :tableData="tableData2"
                :tableKey="tableKey2"
                :pageConfig="pageConfig2"
                :border="false"
                :fixedTwoRow="true"
                :pager-count="5"
                @pageChange="pageChange2"
              >
                <template slot="index" slot-scope="scope">
                  {{scope.$index + 1}}
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
      append-to-body>
      <provinceList/>
    </el-drawer>

    <el-drawer
      title="分校榜"
      :visible.sync="drawerVisible2"
      :direction="'rtl'"
      :size="'50%'"
      append-to-body>
      <campustList/>
    </el-drawer>

    <el-drawer
      title="个人榜"
      :visible.sync="drawerVisible3"
      :direction="'rtl'"
      :size="'50%'"
      append-to-body>
      <personalList/>
    </el-drawer>
  </div>
</template>

<script>
import rdDrawer from '@/components/RdDrawer';
import provinceList from './provinceList';
import campustList from './campustList';
import personalList from './personalList';
export default {
  name: "analysis",
  data() {
    return {
      cardHeight: "130px",
        tableData: [
        { id: 1, name: "飞翔的荷兰人3", cutdown: 1608897351706, visit: 2,phone:'15692026183' },
        { id: 2, name: "飞翔的荷兰人2",cutdown: new Date().getTime(),phone:'17092026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
      ],
      tableKey: [
        {
          name: "排名",
          value: "index",
          operate: true,
          width: 80
        },
         {
          name: "用户名",
          value: "phone"
        },
        {
          name: "邀请数",
          value: "visit",
          width: 100
        }
      ],
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        pageSize: 10,
      },

      tableData2: [
        { id: 1, name: "飞翔的荷兰人3", cutdown: 1608897351706, visit: 2,phone:'15692026183' },
        { id: 2, name: "飞翔的荷兰人2",cutdown: new Date().getTime(),phone:'17092026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
      ],
      tableKey2: [
        {
          name: "排名",
          value: "index",
          operate: true,
          width: 80
        },
         {
          name: "用户名",
          value: "phone"
        },
        {
          name: "礼物打赏榜",
          value: "visit",
          width: 100
        }
      ],
      pageConfig2: {
        totalCount: 100,
        currentPage: 1,
        pageSize: 10,
      },

        drawerVisible1: false,
        drawerVisible2: false,
        drawerVisible3: false,
    };
  },
  components:{
      rdDrawer,
      provinceList,
      campustList,
      personalList
  },
  methods: {
      pageChange(val) {
      // this.pageConfig.currentPage = val.page;
      // this.pageConfig.pageSize = val.limit;
      // console.log(this.searchForm,'this.searchForm--')
      // this.getTableData({
      //   currentPage: (val && val.page) || 1,
      //   pageSize: (val && val.limit) || 10,
      //   loginUserId,
      //   ...this.searchForm,
      //   parentId: this.parentId
      // });
    },
    pageChange2(val) {
      // this.pageConfig.currentPage = val.page;
      // this.pageConfig.pageSize = val.limit;
      // console.log(this.searchForm,'this.searchForm--')
      // this.getTableData({
      //   currentPage: (val && val.page) || 1,
      //   pageSize: (val && val.limit) || 10,
      //   loginUserId,
      //   ...this.searchForm,
      //   parentId: this.parentId
      // });
    },

    showProvince(){
        this.drawerVisible1 = true;
    }
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
          z-index: 9999!important;
      }
  }
}
</style>

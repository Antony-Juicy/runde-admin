<template>
  <div class="analysis">
    <div class="title">汇总数据</div>
    <div class="content">
      <div class="first-row">
        <div class="item1">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p>421212</p>
            <p>访问量PV</p>
          </el-card>
        </div>
        <div class="item1">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p>421212</p>
            <p>独立访客UV</p>
          </el-card>
        </div>
      </div>
      <div class="second-row">
        <div class="item2">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p>421212</p>
            <p>成交额</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p>421212</p>
            <p>成交额</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p>421212</p>
            <p>成交额</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p>421212</p>
            <p>成交额</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{ height: cardHeight }">
            <p>421212</p>
            <p>成交额</p>
          </el-card>
        </div>
      </div>
    </div>

    <div class="title">直播榜单</div>
    <div class="content">
      <div class="third-row">
        <div class="item3">
          <el-card shadow="hover" :body-style="{ height: '100px' }">
            <p>省校榜</p>
          </el-card>
        </div>
        <div class="item3">
          <el-card shadow="hover" :body-style="{ height: '100px' }">
            <p>分校榜</p>
          </el-card>
        </div>
        <div class="item3">
          <el-card shadow="hover" :body-style="{ height: '100px' }">
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
              <span>卡片名称</span>
              <el-button class="export-btn" style="float: right; padding: 3px 0" type="text"
                >导出数据</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
        </div>
        <div class="list">
          <el-card class="box-card">
            <div slot="header" class="clearfix card-header">
              <span>卡片名称</span>
              <el-button class="export-btn" style="float: right; padding: 3px 0" type="text"
                >导出数据</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "analysis",
  data() {
    return {
      cardHeight: "130px",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.analysis {
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
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
    .first-row {
      display: flex;
      justify-content: space-between;
      .item1 {
        width: 49%;
        text-align: center;
        margin-bottom: 10px;
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
        /deep/ {
          .el-card__body {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
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
          }
          .export-btn {
            float: right;
          }
        }
      }
    }
  }
}
</style>

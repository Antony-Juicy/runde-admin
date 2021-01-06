<template>
  <div class="analysis">
    <div class="title">汇总数据</div>
    <div class="content">
      <div class="first-row">
        <div class="item1">
          <el-card shadow="hover" :body-style="{height: cardHeight}">
            <p>421212</p>
            <p>访问量PV</p>
          </el-card>
        </div>
        <div class="item1">
          <el-card shadow="hover" :body-style="{height:cardHeight}">
            <p>421212</p>
            <p>独立访客UV</p>
          </el-card>
        </div>
      </div>
      <div class="second-row">
        <div class="item2">
          <el-card shadow="hover" :body-style="{height: cardHeight}">
            <p>421212</p>
            <p>成交额</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{height: cardHeight}">
            <p>421212</p>
            <p>成交额</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{height: cardHeight}">
            <p>421212</p>
            <p>成交额</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{height: cardHeight}">
            <p>421212</p>
            <p>成交额</p>
          </el-card>
        </div>
        <div class="item2">
          <el-card shadow="hover" :body-style="{height: cardHeight}">
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
          <el-card shadow="hover" :body-style="{height: '100px'}">
            <p>省校榜</p>
          </el-card>
        </div>
        <div class="item3">
          <el-card shadow="hover" :body-style="{height: '100px'}">
            <p>分校榜</p>
          </el-card>
        </div>
        <div class="item3">
          <el-card shadow="hover" :body-style="{height: '100px'}">
            <p>个人榜</p>
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
      cardHeight:"150px"
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.analysis {
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #F0F2F5;
  min-height: 70vh;
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
   
  }
}
</style>

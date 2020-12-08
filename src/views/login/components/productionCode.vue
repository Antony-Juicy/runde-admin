<template>
  <div class="productionCode">
    <div class="top" :style="topBg">
        欢迎访问润德大教务平台
      </div>
      <div class="logo"></div>
      <div class="main">
          <img src="https://rdimg.rundejy.com/web/runde_admin/icon_下载.png" alt="">
          <div class="text">
              <span>请使用钉钉扫描二维码登录</span>
              <span><i class="el-icon-refresh"></i>刷新</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'productionCode',
  data() {
    return {
        topBg: {
            backgroundImage: 'url(http://rdimg.rundejy.com/assets/images/login/divimg.png?0.47601208483398394)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%'
        }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.productionCode {
    .top {
      height: 100px;
      text-align: center;
      padding: 20px;

            color: #FFFFFF;
            font-weight: bold;
            letter-spacing: 2px;

    }
    .logo {
            position: absolute;
    left: 0;
    right: 0;
    top: 55px;
    width: 67px;
    height: 67px;
    box-sizing: border-box;
    border-radius: 50%;
    z-index: 3;
    margin: auto;
    background: url(//jiaowu.rundejy.com/assets/images/login/logo.png);
    background-size: cover;
    }
    .main {
        height: 330px;
        background-color: #fff;
        text-align: center;
        img {
            margin-top: 30px;
        }
        .text {
            margin-top: 20px;
            span {
                &:nth-child(1){
                    color: #898d90;
                    font-size: 14px;
                }
                &:nth-child(2) {
                    color: #38adff;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
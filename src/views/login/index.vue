<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-width="auto"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">欢迎访问润德大教务平台</h3>
      </div>
      <div class="tabs-container">
        <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
          <el-tab-pane label="账号密码登录" name="first">
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="请输入用户名"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"/>
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请输入密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"/>
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <el-form-item prop="VerifyCode" style="margin-bottom: 10px;">
              <span class="svg-container">
                <!-- <svg-icon icon-class="password" /> -->
              </span>
              <el-input
                ref="VerifyCode"
                v-model="loginForm.VerifyCode"
                placeholder="请输入验证码"
                name="VerifyCode"
                type="text"
                tabindex="3"
                class="verifyCode-input"
                auto-complete="on"/>
                <div style="float:right;width:40%;height:50px%;" >
                  <img style="width:80%;height:80%;" :src="imgCode" alt="" @click="changeImgcode">
                </div>
            </el-form-item>
            
            <el-form-item prop="" style="margin: 0;">
              <el-checkbox v-model="checked">记住密码</el-checkbox>
              <a href="https://baidu.com" style="float:right;color:#409EFF;">忘记密码</a>
            </el-form-item>

            <el-button
              :loading="loading"
              type="primary"
              style="width:100%;margin-bottom:4px;"
              @click.native.prevent="handleLogin">登陆
            </el-button>
            <p style="font-size:14px;text-align:center;">
              建议使用
              <a href="https://www.google.cn/intl/zh-CN/chrome/" target="_Blank" style="color:#409EFF;">谷歌浏览器</a>
              访问
            </p>
          </el-tab-pane>
          <el-tab-pane label="钉钉扫码登录" name="second">
            钉钉二维码
          </el-tab-pane>
        </el-tabs>
      </div>
      

      <div class="tips">
        <!-- <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>-->
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { Base64 } from 'js-base64';

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不得小于6位"));
      } else {
        callback();
      }
    };
    const validateVerifyCode = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      activeName: 'first',
      checked: false,
      imgCode: '',
      loginForm: {
        username: "",
        password: "",
        VerifyCode: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        VerifyCode: [
          { required: true, trigger: "blur", validator: validateVerifyCode }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  mounted () {
    this.getImgcode();
    this.getCookie();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    getImgcode() {
      this.$fetch('user_getImgcode').then(res => {
        this.imgCode = 'data:image/png;base64,' + res.data.captchaBase64;
      })
    },
    changeImgcode() {
      this.getImgcode()
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", {
              ...this.loginForm
            })
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
              if (this.checked == true) {
                let password = Base64.encode(this.loginForm.password); // base64 加密
                this.setCookie(this.loginForm.username, password, 7);
              }else {
                console.log("清空Cookie");
                this.clearCookie();
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      window.document.cookie = "username" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=');
          if (arr2[0] == 'username') {
            this.loginForm.username = arr2[1];
          } else if (arr2[0] == 'password') {
            this.loginForm.password = Base64.decode(arr2[1]); // base64 解密
          }
        }
        this.checked = true;
      }
    },
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就行
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background-image: url('../../assets/bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tabs-container {
    // width: 420px;
    height: 430px;
    padding: 20px;
    background-color: #fff;
    .el-input {
      display: inline-block;
      height: 50px;
      width: 85%;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 20px;
      color: #454545;
      .verifyCode-input {
        width: 50%;
      }
      .el-checkbox {
        margin-left: 14px;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 40px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

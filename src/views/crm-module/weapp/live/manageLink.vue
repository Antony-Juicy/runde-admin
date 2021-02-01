<template>
  <div class="manage-link">
    <el-form ref="form" label-width="130px">
      <el-form-item label="讲师端推流地址">
        <el-input
          v-model="teacherUrl"
          id="link"
          ref="link"
          style="width: 600px"
          :readonly="true"
        >
        </el-input>
        <el-button
          type="primary"
          class="teacher-btn"
          size="small"
          style="margin-left: 10px"
          @click="copyLink('.teacher-btn')"
          data-clipboard-action="copy"
          data-clipboard-target="#link"
          >复制链接</el-button
        >
      </el-form-item>
      <el-form-item label="助教端">
        <el-input
          id="link2"
          ref="link2"
          v-model="assistantUrl"
          style="width: 600px"
          :readonly="true"
        >
        </el-input>
        <el-button
          type="primary"
          size="small"
          style="margin-left: 10px"
          class="assistent-btn"
          @click="copyLink('.assistent-btn')"
          data-clipboard-action="copy"
          data-clipboard-target="#link2"
          >复制链接</el-button
        >
        <el-button
          type="warning"
          style="
            position: absolute;
            left: 495px;
            font-size: 12px;
            padding: 13px 15px;
          "
          @click="openLink"
          >打开链接</el-button
        >
        <p class="tips pwd">助教密码：{{pwd}}</p>
      </el-form-item>
      <el-form-item label="观看端">
        <div class="view">
          <el-image
            style="width: 100px; height: 100px"
            :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
          >
          </el-image>
          <p>小程序观看二维码</p>
          <el-button size="small">下载</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  name: "manage-link",
  data() {
    return {
      teacherUrl: "http://www.baidu.com1",
      assistantUrl: "http://www.baidu.com",
      pwd: ""
    };
  },
  props: {
    liveId: {
      type: Number
    }
  },
  mounted(){
    this.getData();
  },
  watch:{
    liveId(){
      this.getData();
    }
  },
  methods: {
    copyLink(btnName) {
      let clipboard = new Clipboard(btnName);
      clipboard.on("success", (e) => {
        this.$message.success("复制成功");
        clipboard.destroy(); // 使用destroy可以清楚缓存
      });
      clipboard.on("error", (e) => {
        this.$message.error("该浏览器不支持自动复制");
        clipboard.destroy();
      });
    },
    openLink(){
        window.open(this.assistantUrl)
    },
    getData(){
      this.$fetch("live_get_url",{
        liveId: this.liveId
      }).then(res => {
        this.teacherUrl = res.data.pushUrl;
        this.assistantUrl = "http://localhost:8080/#/player?liveId="+ this.liveId;
        this.pwd = res.data.assistantPassword;
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.manage-link {
  .pwd {
    position: absolute;
    bottom: -27px;
  }
  .view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    p {
      line-height: 10px;
      font-size: 12px;
    }
  }
  /deep/ {
    .el-form-item__content {
      display: flex;
      position: relative;
    }
    .el-input.is-disabled .el-input__inner {
      color: #333;
    }
  }
}
</style>

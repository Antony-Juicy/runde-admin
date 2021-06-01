<template>
  <div class="manage-link">
    <el-form ref="form">
      <el-form-item label="" label-width="55px">
        <div class="view">
          <el-image
            style="width: 180px; height: 180px"
            :src="url"
          >
            <div slot="error" class="image-slot">
              <!-- <i class="el-icon-picture-outline"></i> -->
              <i class="el-icon-loading" style="font-size: 36px"></i>
            </div>
          </el-image>
          <p>小程序观看二维码</p>
          <!-- <el-button size="small">下载</el-button> -->
        </div>
          <div class="clearfix">
            <el-input v-model="currentLink" id="link" ref="link" style="width:410px;" :readonly="true" size="small"></el-input>
            <el-button type="primary" class="shareLink-btn" size="small" style="" @click="copyLink('.shareLink-btn')" data-clipboard-action="copy" data-clipboard-target="#link">复制链接</el-button>
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
      url: "",
      currentLink: ""
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
  // watch:{
  //   liveId(){
  //     this.getData();
  //   }
  // },
  methods: {
    getData(){
      this.$fetch("live_get_qr_code",{
        liveId: this.liveId
      }).then(res => {
        this.url = 'data:image/png;base64,' + res.data.base64;
        this.currentLink = res.data.shareUrl
      })
    },
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
    // margin-top: 15px;
    p {
      line-height: 10px;
      font-size: 12px;
    }
  }
  .shareLink-btn {
    // float: right;
  }
  /deep/ {
    .el-form-item__content {
      // display: flex;
      position: relative;
    }
    .el-input.is-disabled .el-input__inner {
      color: #333;
    }
    .el-image {
      .image-slot {
        text-align: center;
        height: 100%;
        line-height: 180px;
        .el-icon-picture-outline {
          font-size: 60px;
        }
      }
    }
  }
}
</style>

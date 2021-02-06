<template>
  <div class="manage-link">
    <el-form ref="form" label-width="130px">
      <el-form-item label="">
        <div class="view">
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <p>小程序观看二维码</p>
          <!-- <el-button size="small">下载</el-button> -->
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "manage-link",
  data() {
    return {
      url:""
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
    // margin-top: 15px;
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
    .el-image {
      .image-slot {
        text-align: center;
        .el-icon-picture-outline {
          font-size: 60px;
        }
      }
    }
  }
}
</style>

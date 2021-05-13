<template>
  <div class="dialog-wrapper">
    <el-dialog
      :width="width"
      :title="title"
      :close-on-click-modal="false"
      :visible.sync="visible"
      :before-close="beforeClose"
      :destroy-on-close="true"
      :append-to-body="appendToBody"
      :top="top"
      :custom-class="customClass + ' append-dialog' || 'append-dialog'"
    >
      <slot></slot>
      <div slot="footer" class="dialog-footer" v-if="showFooter">
        <el-button @click="resetFloatForm()" size="small">取消</el-button>
        <el-button
          type="primary"
          @click="submitForm()"
          size="small"
          v-prevent-re-click="2000"
          >{{submitText}}</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "RdDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "640px",
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    submitText:{
      type: String,
      default: "保存"
    },
    top: {
      type: String,
      default: "15vh"
    },
    customClass: {
      typ: String,
      default: ""
    }
  },
  data() {
    return {
      visible: this.dialogVisible,
    };
  },
  watch: {
    dialogVisible(newVal) {
      this.visible = newVal;
    },
  },
  methods: {
    submitForm() {
      this.$emit("submitForm");
    },
    resetFloatForm() {
      this.$emit("handleClose", false);
    },
    beforeClose() {
      this.$emit("handleClose", false);
    },
  },
};
</script>

<style lang="scss">
  .append-dialog {
      .el-dialog__body {
        max-height: 600px;
        overflow: auto;
      }
    }
</style>
<style lang="scss" scoped>
.dialog-wrapper {
  /deep/ {
    .el-dialog__header {
      padding: 23px;
      border-bottom: 1px solid #f0f0f0;
      .el-dialog__title {
        font-size: 17px;
        font-weight: 600;
        color: #333333;
      }
      .el-icon-close {
        font-size: 24px;
      }
    }
    .el-dialog__body {
      min-height: 180px;
      max-height: calc(81vh - 71px - 63px);
      overflow: auto;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px #d0d1d3;
        background: #d0d1d3;
      }
    }
    .el-dialog__footer {
      border-top: 1px solid #f0f0f0;
    }
  }
}
</style>

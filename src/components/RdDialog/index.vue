<template>
  <div class="dialog-wrapper">
    <el-dialog :width="width" :title="title" :close-on-click-modal="false" :visible.sync="visible" :before-close="beforeClose" :destroy-on-close="true">
      <slot></slot>
      <div slot="footer" class="dialog-footer" v-if="showFooter">
        <el-button @click="resetFloatForm()" size="small">取消</el-button>
        <el-button type="primary" @click="submitForm()" size="small" v-prevent-re-click="2000">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RdDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '640px'
    }
  },
  data(){
    return {
      visible: this.dialogVisible
    }
  },
  watch: {
    dialogVisible(newVal){
      this.visible = newVal;
    }
  },
  methods: {
    submitForm(){
      this.$emit('submitForm')
    },
    resetFloatForm(){
      this.$emit('handleClose',false)
    },
    beforeClose(){
      this.$emit('handleClose',false)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-wrapper {
  /deep/ {
    .el-dialog__header {
      padding: 23px;
      border-bottom: 1px solid #F0F0F0;
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
    }
    .el-dialog__footer {
      border-top: 1px solid #F0F0F0;
    }
  }
}
</style>

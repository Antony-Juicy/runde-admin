<template>
  <div class="dialog-wrapper">
    <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="visible" :before-close="beforeClose" :destroy-on-close="true">
      <slot></slot>
      <div slot="footer" class="dialog-footer" v-if="showFooter">
        <el-button @click="resetFloatForm()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
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

<style scoped>

</style>

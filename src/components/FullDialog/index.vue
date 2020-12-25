<template>
  <div>
    <div :class="{ show: value, hide: !value, 'full-dialog-container': true }">
      <!-- 标题 -->
      <div class="top-title">
        {{ title }}
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div @click="cancelClick" class="close-btn">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "详情",
    },
  },
  methods: {
    cancelClick: function () {
      //通过触发父组件来改变子组件的props值
      this.$emit("change", false);
    },
  },
};
</script>

<style lang='scss' scoped>
.full-dialog-container {
  width: 100%;
  // height: calc(100vh - 102px);
  height: calc(100% - 102px);
  position: absolute;
  background: #fff;
  z-index: 999;
  top: 98px;
  right: 0;
  overflow: hidden;
  transition: all 0.3s;
  padding: 10px 20px 20px 20px;
  .close-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    .el-icon-close {
      font-size: 26px;
    }
  }
  .top-title {
    border-bottom: 1px solid #f0f0f0;
    font-size: 17px;
    font-weight: 600;
    color: #333333;
    line-height: 60px;
    padding-left: 10px;
  }
  .content {
    padding: 20px 10px;
  }
}
.show {
  transform: scale(1);
  opacity: 1;
}
.hide {
  transform: scale(0);
  opacity: 0;
}
</style>
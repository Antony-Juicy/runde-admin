<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <i class="el-icon-s-unfold" :class="{'is-active':isActive}"></i>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  color: #fff;
}

.hamburger.is-active {
  transform: rotate(180deg);
}

.el-icon-s-unfold {
  color:#fff;
  font-size: 20px;
  &.is-active {
  transform: rotate(180deg);
}
}
</style>

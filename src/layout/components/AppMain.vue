<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- <div :key="$route.meta.title" class="app-title">
        <span>{{$route.meta.title}}</span>
        <span>{{$route.meta.subtitle}}</span>
      </div> -->
      <Breadcrumb/>
    </transition>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"/>
      <!-- <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>-->
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    }
  },
  components: {
    Breadcrumb
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 0 30px;
  box-sizing: border-box;
}
.fixed-header + .app-main {
  padding-top: 90px;
}
.app-title {
  padding: 20px 0;
  span:first-child {
    font-size: 20px;
    margin-right: 5px;
  }
  span:last-child {
    font-size: 16px;
    color: #606266;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

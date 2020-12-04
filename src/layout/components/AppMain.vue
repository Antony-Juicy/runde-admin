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
      </keep-alive> -->
    </transition>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    },
    //  ...mapState({
    //   cachedViews: state => state.tagsView.cachedViews,
    // }),
  },
  components: {
    Breadcrumb
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  /*50 = navbar  */
  min-height: 100vh;
  width: 100%;
  position: relative;
  // overflow: hidden;
  padding: 0 25px 25px 25px;
  box-sizing: border-box;
  background-color: #F0F2F5;
}
.fixed-header + .app-main {
  padding-top: 105px;
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

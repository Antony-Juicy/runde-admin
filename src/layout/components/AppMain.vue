<template>
  <section class="app-main">
    <transition name="el-fade-in" mode="out-in">
      <Breadcrumb />
    </transition>
    <transition name="el-fade-in" mode="out-in">
      <keep-alive :exclude="keepAliveCom">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    },
     ...mapState({
      viewId: state => state.appViews.viewId,
      keepAlivePage: state => state.appViews.keepAlivePage
    }),
  },
  watch:{
    keepAlivePage(val){
      let val2 = val.map(item => {
        return item.split('?')[0].split('/').pop()
      });
      val2.unshift('appRedirect')
      this.keepAliveCom = [...new Set(val2)]
    }
  },
  data(){
    return {
      keepAliveCom:[]
    }
  },
  components: {
    Breadcrumb,
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  /*50 = navbar  */
  min-height: 100vh;
  width: 100%;
  position: relative;
  // overflow: hidden;
  padding: 0 20px 5px 20px;
  box-sizing: border-box;
  background-color: #f0f2f5;
}
.fixed-header + .app-main {
  padding-top: 102px;
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

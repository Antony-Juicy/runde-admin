<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <div class="refresh-container">
      <i class="el-icon-refresh-right" @click="handleRefresh"></i>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane :label="item.title" :name="item.index" v-for="(item,index) in navList" :key="index">{{item.fullPath}}</el-tab-pane>
    </el-tabs>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          {{name}}
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided  @click.native="logout">
            <span style="display:block;">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import router,{resetRouter} from '@/router'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getToken } from '@/utils/auth'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    navList(){
      return this.$store.state.permission.moduleRoutes
    }
  },
  data(){
    return {
      activeName: 0,
      name: ''
    }
  },
  mounted(){
    if(localStorage.getItem('clickMenu')){
      let currentId = localStorage.getItem('tabIndex');
      let currentIndex = this.navList&&this.navList.findIndex(item => item.id == currentId);
      this.activeName = String(currentIndex) || 0;
    }
    if(localStorage.getItem('userInfo')) {
      this.name = JSON.parse(localStorage.getItem('userInfo')).username;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$message({
        message: '注销成功',
        type: "success"
      });
      this.$router.push(`/login`)
    },
    async handleClick(tab, event) {
        
        const accessRoutes = await this.$store.dispatch('permission/generateRoutes',{type: this.navList[Number(tab.index)].id})
          // dynamically add accessible routes
        router.addRoutes(accessRoutes)
        localStorage.setItem('tabIndex',this.navList[Number(tab.index)].id)
        localStorage.removeItem('clickMenu')
    },
    handleRefresh(){
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #041527;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 54px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
        position: relative;
    z-index: 999;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .refresh-container {
    line-height: 54px;
    height: 100%;
    float: left;
    cursor: pointer;
    z-index: 999;
    color: #fff;
    font-size: 22px ;
    padding: 0 15px;
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
            color: #A7ADB4;
            cursor: pointer;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 19px;
          font-size: 12px;
        }
      }
    }
  }

  /deep/ {
    .el-tabs__item {
      height: 50px;
      line-height: 50px;
      border: none;
      color: #A7ADB4;
      font-weight: bold;
      &.is-active {
        color: #333333;
        background-color: #F3F3F3;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08);
      }
    }

    .el-tabs__nav-wrap::after {
      display: none;
    }

    .el-tabs__nav-wrap  {
      margin-left: 30px;
    }

    .el-tabs--top {
      float: left;
    }

    .el-tabs__nav-wrap {
      margin-left: 0;
    }

    .el-tabs--card>.el-tabs__header .el-tabs__nav {
      border: none;
    }

    .el-tabs__nav {
      padding-top: 1px;
      
    }

  }
}
</style>

<template>
  <div class="live-redirect">
      <div v-if="show">
        <p>页面跳转中，请稍后</p>
        <i class="el-icon-loading"></i>
      </div>
  </div>
</template>

<script>

export default {
  name:"live-redirect",
  data(){
    return {
      loading:null,
      show: true
    }
  },
  mounted(){
    this.openFullScreen2();
    this.authentication();
  },
  watch:{
    "$route.query.userId"(newVal){
      this.authentication()
    },
    "$route.query.token"(newVal){
      this.authentication()
    }
  },
   methods: {
     openFullScreen2() {
        // this.loading = this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // });
        // setTimeout(() => {
        //   loading.close();
        // }, 2000);
      },
      authentication(){
        const {token,username,userId} = this.$route.query;
        console.log( this.$route.query,' this.$route.query---')
        if(!token || !userId || !username){
          // this.loading.close();
          this.show = false;
          this.$message.error('链接有误')
          return
        }
        this.$store
            .dispatch("user/loginLive", {
              token,
              username,
              userId
            })
            .then(() => {
              this.$router.push({ path: "/crm-module/weapp/live" });
            })
            .catch(() => {
              // this.loading = false;
            });
      }
    }

}
</script>

<style lang="scss" scoped>
.live-redirect {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  text-align: center;
  /deep/ {
    .el-icon-loading {
      font-size: 32px;
    }
  }
}
</style>

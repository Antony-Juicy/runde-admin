<script>
export default {
  name:'appRedirect',
  created() {
    this.handlePath();
  },
  watch:{
    $route(val){  
      if(val.path == '/redirect') {
          this.handlePath();
      }
    }
  },
  render: function(h) {
    return h() // avoid warning message
  },
  methods: {
    handlePath(){
      const { query } = this.$route
        const path = query.path
        const lastPathName = path.split('/').pop()
        this.$store.dispatch("appViews/addKeepAlivePage",lastPathName)
        setTimeout(() => {
          this.$store.dispatch("appViews/changeKeepAlive",lastPathName)
        }, 100);
        this.$router.replace({ path: path })
    }
  }
}
</script>
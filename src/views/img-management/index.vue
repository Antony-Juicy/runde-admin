<template>
  <section class="section_box">
      {{row.imagePath}}
    <Upload-oss v-if="uploadOssElem" :src.sync="row.imagePath" @srcChangeFun="(data)=>{ row.imagePath = data; reloadElem('uploadOssElem')}"/>
  </section>
</template>




<script>
import UploadOss from "@/components/UploadOss";
export default {
  components: {
    UploadOss,
  },
  asyncData({ params }) {},
  data() {
    return {
        row: {
            imagePath:''
        },
        uploadOssElem: true
    }
  },
  watch: {
    "pic.name": {
      handler: function () {
        this.reloadElem();
      },
    },
    "pic.project": {
      handler: function () {
        this.reloadElem();
      },
    },
  },
  mounted() {},
  methods: {
    srcChangeFun(data) {

      let arr = data.split(",");
      arr.pop();
      this.allImages = this.allImages.concat(arr);
      this.reloadElem();
    },
    reloadElem(dataElem) { // 重新加载组件
       this[dataElem] = false
       this.$nextTick(()=> {
         this[dataElem] = true;
       })
    },
    handleChange(data) {
      (this.pic.project = data[1]), (this.pic.dir = data[0]);
      if (data[0].indexOf("web") > -1) {
        this.showProject = true;
        this.pic.dir = data[0] + "/" + data[1];
        this.pic.project = "";
      } else {
        this.showProject = false;
      }
      this.reloadElem();
    },
  },
};
</script>

<style scoped lang="scss">
.show_imgs {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: flex;
    margin-bottom: 5px;
    img {
      width: 100px;
      height: 100px;
    }
    span {
      display: inline-block;
      line-height: 100px;
      margin-left: 40px;
    }
  }
}
.tips_box2 {
  display: flex;
  align-items: center;
}
.tips_box3 {
  margin-top: 60px;
  h3 {
    span {
      font-size: 14px;
      color: #999;
    }
  }
}
::v-deep .el-input,
::v-deep .el-popper {
  width: 300px;
  display: inline-block;
  margin-right: 20px;
}

::v-deep .el-select-dropdown {
  min-width: 300px !important;
}
</style>

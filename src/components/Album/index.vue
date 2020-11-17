<template>
  <el-dialog
    title="用户相册"
    :visible="value"
    width="80%"
    height="90%"
    :before-close="handleCloseBindWarnStandard"
    :modal="true"
    class="el-album"
  >
    <div class="block" v-for="(item,index) in albumData" :key="index" @click="onChoice(index)">
      <el-image fit="scale-down" :src="$store.getters.osscdn + item.url" lazy></el-image>
      <i v-show="choiceIndex.includes(item.name)" class="icon el-icon-success"></i>
    </div>
    <el-pagination
      style="width:100%"
      @size-change="e=> pageSize = e"
      @current-change="e=> currentPage = e"
      :current-page="currentPage"
      :page-sizes="[15, 25, 35, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitAlbum">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      albumData: [],
      choiceIndex: [],
      choiceData: [],
      max: 999,
      pageSize: 15,
      total: 0,
      currentPage: 1
    };
  },
  computed: {
    options() {
      return this.$store.getters.albumOptions;
    },
    watchPage() {
      return this.currentPage + this.pageSize;
    }
  },
  mounted() {
    this.getData();
    // for (let i = 0; i < 10; i++) {
    //   this.albumData.push({
    //     src:
    //       "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
    //     index: i
    //   });
    // }
  },
  watch: {
    value: {
      handler() {
        if (this.value) {
          // update options
          if (this.options && this.options.max) {
            this.max = this.options.max;
          }
          // update Data
        }
      },
      immediate: true
    },
    watchPage() {
      this.getData();
    }
  },
  methods: {
    async getData() {
      let res = await this.$store.dispatch("app/getSpaceImage", {
        page: this.currentPage,
        limit: this.pageSize
        // size: this.pageSize
      });
      this.total = res.count;
      this.albumData = [...res.data];
    },
    // 点击弹框下的取消
    handleCancel() {
      this.$emit("getCancel");
    },
    // 点击弹框下的确定
    handleConfirm() {
      this.$emit("getConfirm");
    },
    //关闭弹窗，不可以删这个方法。不用这个方法点击遮罩层关闭会报错
    handleCloseBindWarnStandard() {
      //   this.$emit("closeBindWarnStandard");
      this.close();
    },
    clear() {
      this.choiceIndex = [];
      this.max = 999;
    },
    close() {
      this.$store.state.app.albumDialog = false;
      this.clear();
    },
    onChoice(index) {
      let data = this.albumData[index];
      index = this.albumData[index].name;
      if (this.max === 1) {
        this.choiceIndex = [index];
        this.choiceData = [data];
        return false;
      }

      const it = this.choiceIndex.indexOf(index);
      if (it >= 0) {
        this.choiceIndex.splice(it, 1);
        this.choiceData.splice(it, 1);
      } else {
        if (this.choiceIndex.length >= this.max) {
          this.$message("选择数量达到上限");
          return false;
        }
        this.choiceData.push(data);
        this.choiceIndex.push(index);
      }
    },
    submitAlbum() {
      this.$store.dispatch("app/submitAlbum", this.choiceData);
      this.clear();
    }
  }
};
</script>

<style lang="scss">
.el-album {
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  .el-dialog__body {
    display: flex;
    width: 100%;
    height: 350px;
    overflow: auto;
    flex-wrap: wrap;
  }
  .block {
    width: 20%;
    height: 180px;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid #fff;
    transition: all ease-out 0.3s;
    position: relative;
    cursor: pointer;
    .el-image {
      width: 100%;
      height: 100%;
      transition: all ease-out 0.3s;
    }
  }
  .icon {
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 2vw;
    color: #42b983;
  }
  .block:hover {
    border: 1px solid #ddd;
  }
}
</style>

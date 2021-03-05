<template>
  <div>
    <i
      class="el-icon-circle-close"
      style="font-size: 26px"
      @click="closeImg"
    ></i>
    <div v-if="uploadOssElem">
      <img
        ref="uploaderInput"
        v-if="!src"
        class="img180"
        src="https://rdimg.rundejy.com/cmsuserInfo/20200624163441upload_oss.png"
        alt=""
      />
      <img ref="uploaderInput" v-else class="img180" :src="src" />
    </div>
  </div>
</template>

<script>
let multipart_params = "";
let baseKey = "";
import plupload from "plupload";
import axios from "axios";
import { uploadOss } from "@/utils/uploadOss";

export default {
  props: {
    src: String,
    isMult: {
      type: Boolean,
      default: false,
    },
    objConfig: {
      type: Object,
      default: () => {},
    },
    // initGetConfig: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  data() {
    return {
      defaultSetting: {
        chooseFile: "",
      },
      uploader: {},
      uploadConfig: "",
      uploadOssElem: true,
      initGetConfig: true
    };
  },
  mounted() {
    if (this.initGetConfig) {
      this.getAliyunOssConfig();
    }
  },
  methods: {
    async getAliyunOssConfig() {
      let src = await uploadOss(
        this.$refs.uploaderInput,
        this.isMult,
        this.objConfig
      );
      console.log("上传后得到的数据", src);
      // this.$emit('srcChangeFun',src)
      this.$emit("update:src", src);
      this.reloadElem("uploadOssElem");
    },
    reloadElem(dataElem) {
      // 重新加载组件
      this[dataElem] = false;
      this.$nextTick(() => {
        this[dataElem] = true;

      });

    },
    closeImg() {},
  },
  
};
</script>

<style>
.img180 {
  width: 120px;
  height: 120px;
  cursor: pointer;
}
</style>
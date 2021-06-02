<template>
  <div>
    <div ref="uploaderInput">
      <!-- <img ref="uploaderInput" class="img180" :src="uploadConfig" /> -->
      <el-button><i class="el-icon-upload"></i>本地上传</el-button>
    </div>
  </div>
</template>

<script>
let multipart_params = "";
let baseKey = "";
import plupload from "plupload";
import axios from "axios";
// import { uploadOss,promise1 } from "@/utils/uploadOss";
import { mixinUpload } from "./UploadOss";
export default {
  mixins: [mixinUpload],
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
  },
  data() {
    return {
      defaultSetting: {
        chooseFile: "",
      },
      uploader: {}
    };
  },
  created(){
    this.uploadConfig = this.src;
  },
  mounted() {
      this.getAliyunOssConfig();
  },
  watch: {
    uploadConfig(newVal){
      this.$emit("update:src", newVal);
    },
    src(newVal){
      this.uploadConfig = newVal;
    }
  },
  methods: {
    async getAliyunOssConfig() {
      let src = await this.uploadOss(
        this.$refs.uploaderInput,
        this.isMult,
        this.objConfig
      );
      console.log("上传后得到的数据", src);
      this.$emit("update:src", src);
    },
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
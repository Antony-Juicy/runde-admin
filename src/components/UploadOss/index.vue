<template>
  <div>
    <div>
      <img
        ref="uploaderInput"
        v-if="!uploadConfig"
        class="img180"
        :src="btnImg || `https://rdimg.rundejy.com/cmsuserInfo/20200624163441upload_oss.png`"
        alt=""
      />
      <img
        @mouseover="preview && (previewImg = true)"
        @mouseleave="preview && (previewImg = false)"
        ref="uploaderInput"
        v-else
        class="img180"
        :src="uploadConfig"
      />
    </div>
    <transition name="el-fade-in-linear">
      <div class="img-hover" v-if="previewImg">
        <img ref="uploaderInput" :src="uploadConfig" />
      </div>
    </transition>
  </div>
</template>

<script>
import { mixinUpload } from "./UploadOss";
export default {
  mixins: [mixinUpload],
  props: {
    src: String,
    btnImg: String,
    isMult: {
      type: Boolean,
      default: false,
    },
    objConfig: {
      type: Object,
      default: () => {},
    },
    // 开启预览
    preview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      previewImg: false,
      defaultSetting: {
        chooseFile: "",
      },
      uploader: {},
    };
  },
  created() {
    this.uploadConfig = this.src;
  },
  mounted() {
    this.getAliyunOssConfig();
  },
  watch: {
    uploadConfig(newVal) {
      this.$emit("update:src", newVal);
    },
    src(newVal) {
      this.uploadConfig = newVal;
    },
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
  position: relative;
  z-index: 1;
}
.img-hover {
  position: absolute;
  border-radius: 4px;
  width: 240px;
  right: -10px;
  transform: translateX(100%);
  top: 0;
  right: -10px;
  background: #fff;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.12);
  padding: 6px;
  line-height: 1;
}
.img-hover > img {
  width: 100%;
}
</style>
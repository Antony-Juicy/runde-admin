<template>
  <div class="upload-x">
    <div>
      <img
        ref="uploaderInput"
        v-if="!uploadConfig"
        class="img180"
        :src="
          btnImg ||
          `https://rdimg.rundejy.com/cmsuserInfo/20200624163441upload_oss.png`
        "
        alt=""
      />
      <img
        @mouseover="preview && (previewMedia = true)"
        @mouseleave="preview && (previewMedia = false)"
        ref="uploaderInput"
        v-else
        class="img180"
        :src="require('@/assets/icon/wancheng.png')"
      />
    </div>
    <transition name="el-fade-in-linear">
      <video
        autoplay
        class="media-hover"
        width="100%"
        controls
        v-if="previewMedia"
      >
        <source :src="uploadConfig" type="video/mp4" />
      </video>
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
      previewMedia: false,
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
.upload-x {
  position: relative;
  z-index: 999;
}
.img180 {
  width: 120px;
  height: 120px;
  cursor: pointer;
  position: relative;
  z-index: 1;
}
.media-hover {
  position: absolute;
  width: 240px;
  right: 0;
  /* background: #fff; */
  top: 50%;
  transform: translate(100%, -50%);
  line-height: 1;
}
.media-hover > img {
  width: 100%;
}
</style>
<template>
  <div>
    <img ref="uploaderInput"  v-if="!src" class="img180" src="https://rdimg.rundejy.com/cmsuserInfo/20200624163441upload_oss.png" alt="">
     <img ref="uploaderInput"  v-else class="img180" :src="src" />
  </div>  
</template>

<script>
let multipart_params = '';
let baseKey = ''
import plupload from "plupload";
import axios from "axios"
import { uploadOss } from "@/utils/uploadOss"
const iceConfig = require('@/config/config.js')

export default {
  props: {
    src: String,
    isMult: {
      type: Boolean,
      default: false
    },
    objConfig: {
      type: Object,
      default: ()=>{}
    }
  },
  data() {
      return  {
        defaultSetting: {
            chooseFile: '',
        },
        uploader: {},
        uploadConfig: '',
        iceConfig: iceConfig
      }
  },
  mounted() {
    this.getAliyunOssConfig();
  },
  methods: {
    async getAliyunOssConfig() {
        let src = await uploadOss(this.$refs.uploaderInput, this.isMult, this.objConfig)
        console.log("上传后得到的数据",src);
        this.$emit('srcChangeFun',src)
    },
  }
}
</script>

<style>
.img180 {
    width: 120px;
    height: 120px;
    cursor: pointer;
}
</style>
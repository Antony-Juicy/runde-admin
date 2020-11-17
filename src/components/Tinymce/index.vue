<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea">
    </textarea>
    <div class="editor-custom-btn-container">
      <!-- <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" /> -->
      <span v-show="false"></span>
      <el-upload action :before-upload="beforeUpload" multiple>
        <el-button icon="el-icon-upload" size="mini" type="text" class="size15">上传</el-button>
      </el-upload>
      <!-- <el-dropdown size="mini" split-button type="text">
        插入图片
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-upload action :before-upload="beforeUpload">
              <el-button icon="el-icon-upload" size="mini" type="text">插入图片</el-button>
            </el-upload>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button
              icon="el-icon-picture-outline"
              size="mini"
              type="text"
              @click="checkAlbum"
            >相册选择</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </div>
</template>


<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import editorImage from "./components/EditorImage";
import load from "./dynamicLoadScript";
import  "./plugins/lineheight"; 
import  "./plugins/indent2em"; 
import "./plugins/bdmap";
import  "./langs/zh_CN"; 
const iceConfig = require('@/config/config.js')
export default {
  name: "Tinymce",
  components: { editorImage },
  props: {
    id: {
      type: String,
      default: function() {
        return (
          "vue-tinymce-" +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + "")
        );
      }
    },
    value: {
      type: String,
      default: ""
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    menubar: {
      type: String,
      default: "file edit insert view format table"
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: "auto"
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
    };
  },
  computed: {
    containerWidth() {
      const width = this.width;
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        // matches `100`, `'100'`
        return `${width}px`;
      }
      return width;
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || "")
        );
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce();
    }
  },
  deactivated() {
    this.destroyTinymce();
  },
  destroyed() {
    this.destroyTinymce();
  },
  methods: {
    init() {
      this.initTinymce();
    },
    initTinymce() {
      let _this = this;
        window.tinymce.init({
          selector: `#${this.tinymceId}`,
          language:'zh_CN',//注意大小写
           plugins: ['table  advlist autolink link image lists preview lineheight code emoticons | indent2em bdmap'],  //  富文本编辑的样式
            toolbar: [' undo redo  bullist numlist wordcount | outdent indent  | image link  | code ',
                  ' bold italic underline strikethrough  alignleft aligncenter alignright blockquote emoticons bdmap|  forecolor  backcolor | table  | indent2em lineheight fontsizeselect | fontselect | preview',
                  ],
          height: this.height,
          min_height: 500,
          body_class: "panel-body ",
          branding: false, // 隐藏右下角的技术支持
          fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
          font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
          importcss_append: true,
          autosave_ask_before_unload: false,
          relative_urls : false, // 绝对地址
          remove_script_host : false, 
          convert_urls: false,
          default_link_target: "_blank", //将其变为_blank新窗口打开 

          // table_default_styles: {
          //   'border-collapse':'collapse',
          //    'width':'100%',
          //    'word-wrap': 'break-word'
          // },
          // table_cell_class_list: {
          //   'word-wrap': 'break-word'
          // },
          init_instance_callback: editor => {
              if (_this.value) {
                editor.setContent(_this.value);
              }
              _this.hasInit = true;
              editor.on("NodeChange Change KeyUp SetContent", () => {
                this.hasChange = true;
                let bb = editor.getContent().replace(/href="http:\/\/wwwapi.kaoyishi.net\//g, 'href="http://www.yizhiquanzp.com/'); 
                // let bb = editor.getContent().replace(/href="..\//g, 'href="/'); 
                this.$emit("input", bb);
              });
            },
            setup(editor) {
              editor.on("FullscreenStateChanged", e => {
                _this.fullscreen = e.state;
              });
              editor.add
            }
      });
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId);
      if (this.fullscreen) {
        tinymce.execCommand("mceFullScreen");
      }

      if (tinymce) {
        tinymce.destroy();
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
    imageSuccessCBK(arr) {
      const _this = this;
      arr.forEach(v => {
        window.tinymce
          .get(_this.tinymceId)
          .insertContent(`<img class="wscnph" src="${v.url}" >`);
      });
    },
    // upload img
    async beforeUpload(file) {
      // 如果类型不在允许的类型范围内
      let allowTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']; // 允许上传的图片类型
      // if (allowTypes.indexOf(file.type) === -1) {
      //     this.$message.error("该类型不允许上传");
      // }

      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 19MB!");
      // }
      
      
      
      let params = new FormData();
      params.append("file", file);
      const res = await this.$store.dispatch("app/uploadFile", params);
      
      if(allowTypes.indexOf(file.type) === -1) {
       window.tinymce
        .get(this.tinymceId)
        .insertContent(
          `<a style="color:blue" href="${iceConfig.baseUrl}${this.$store.getters.osscdn + res.file}" data-mce-href="${iceConfig.baseUrl}${this.$store.getters.osscdn + res.file}">下载 ${file.name} </a>`
        );
      }else  {
         window.tinymce
        .get(this.tinymceId)
        .insertContent(
          `<img class="wscnph" src="${iceConfig.baseUrl}${this.$store.getters.osscdn + res.file}"  data-mce-src="${iceConfig.baseUrl}${this.$store.getters.osscdn + res.file}" >`
        );
      }
      this.$message({
        message: "插入成功",
        type: "success"
      });
      return false;
    },
    // async checkAlbum() {
    //   let ress = await this.$store.dispatch("app/openAlbum", {
    //     max: 5,
    //     success: res => {
    //       res.forEach(v => {
    //         window.tinymce
    //           .get(this.tinymceId)
    //           .insertContent(
    //             `<img class="wscnph" src="${this.$store.getters.osscdn +
    //               v.url}" >`
    //           );
    //       });
    //     }
    //   });
    // }
  }
};
</script>

<style scoped lang="scss">
.tinymce-container {
  position: relative;
  line-height: normal;
}
.mce-panel {
  box-sizing: border-box!important;
}
.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 2005;
  
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
/* 处理编辑器层级兼容的问题 */
.editor-upload-btn {
  display: inline-block;
}
.size15 {
  font-size: 15px;
  margin-right: 5px;
}
</style>
<style>
.tox-tinymce-aux {
  z-index: 4100 !important;
}
</style>

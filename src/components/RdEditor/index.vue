<template>
  <div style="margin-bottom: 58px">
    <div v-show="false" class="avatar-uploader">
        <Upload-Oss
              v-if="uploadOssElem"
              :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }"
              :src.sync="bgImg"
              :initGetConfig="initGetConfig"
              @srcChangeFun="
                (data) => {
                  imgChange(data)
                }
              "
            />
     </div>
    <quill-editor
      class="ql-editor-class"
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      style="height: 200px"
      @ready="onEditorReady($event)"
        @change="onEditorChange($event)"
    ></quill-editor>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import UploadOss from "@/components/UploadOss";
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }], // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
  [{ 'direction': 'rtl' }], // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['link', 'image'],
  ['clean'] // remove formatting button
]
export default {
  name: "RdEditor",
  components: { quillEditor, UploadOss },
  props: {
    quillContent: {
      default: String,
      type: String,
    },
    placeholder: {
      default: String,
      type: String,
    }
  },
  data() {
    return {
      content: this.quillContent,
      editorOption: {
        placeholder: this.placeholder,
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function(value) {
                console.log(value,'value')
                if (value) {
                  // alert(1)
                  // 触发input框选择图片文件
                  console.log(document.querySelector('.avatar-uploader input'),'000')
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },// 富文本编辑器配置
      uploadOssElem: true,
      bgImg: "",
      initGetConfig: true
    };
  },
  watch:{
    quillContent(newVal){
      this.content = newVal;
    }
  },
  mounted(){
    // this.initGetConfig = true;
  },
  methods: {
    // 上传组件
    reloadElem(dataElem) {
      console.log("reload");
      // 重新加载组件
      this[dataElem] = false;
      this.$nextTick(() => {
        this[dataElem] = true;
      });
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text);
      this.content = html;
      this.$emit("change",html)
    },
    onEditorReady(quill) {
      this.$nextTick(function () {
        this.content = this.quillContent;
      });
      setTimeout(() => {
        const quill = this.$refs.myQuillEditor.quill;
        quill.setSelection(this.content.length);
      }, 0);
    },
    imgChange(data){
      this.bgImg = data;
      this.reloadElem('uploadOssElem');
       // 获取富文本组件实例
      const quill = this.$refs.myQuillEditor.quill
      const length = quill.getSelection().index
      // 插入图片  res.info为服务器返回的图片地址
      quill.insertEmbed(length, 'image', this.bgImg)
      // 调整光标到最后
      quill.setSelection(length + 1)
      // this.quillUpdateImg = false
    }
  },
};
</script>

<style scoped lang="scss">
.ql-editor-class {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 1.42;
  height: 100%;
  outline: none;
  padding: 0 !important;
  tab-size: 4;
  -moz-tab-size: 4;
  text-align: left;
  word-wrap: break-word;
  width: 100vh;
}
</style>

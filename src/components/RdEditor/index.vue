<template>
  <div style="margin-bottom: 58px;">
    <quill-editor class="ql-editor-class" ref="myTextEditor" v-model="content" :options="editorOption" style="height:200px; "></quill-editor>
  </div>
</template>

<script>
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
// import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'UploadImg',
  components: { quillEditor },
  props: {
    quillContent: {
      default: String,
      type: String
    }
  },
   data(){
        return{
            content: '',
            editorOption: {
               placeholder: '编辑文章内容'
             },
        }
    },
    components: {
        quillEditor
    },
    methods:{
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
    }
}
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

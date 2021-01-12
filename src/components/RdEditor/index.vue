<template>
  <div style="margin-bottom: 58px">
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
export default {
  name: "UploadImg",
  components: { quillEditor },
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
      },
    };
  },
  components: {
    quillEditor,
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text);
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

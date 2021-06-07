<template>
  <div class="upload-file">
    <rd-dialog
      :title="title"
      :dialogVisible="importVisible"
      :append-to-body="appendToBody"
      @handleClose="handleClose"
      @submitForm="submitImportForm()"
    >
      <el-upload
        class="upload-demo"
        action="#"
        :before-remove="beforeRemove"
        :limit="1"
        :on-exceed="handleExceed"
        :on-change="handleChange"
        :file-list="fileList"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false"
        accept=".xls, .xlsx"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </rd-dialog>
  </div>
</template>

<script>
export default {
  name: "upload-file",
  data() {
    return {
      importFile: "",
      fileList: [],
    };
  },
  props: {
    importVisible: {
      type: Boolean,
    },
    importId: {
      type: Number | String,
    },
    title: {
      type: String,
      default: "上传题目",
    },
    url: {
      type: String,
      default: "lookpicture_import",
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    fileParamName: {
      type: String,
      default: "excel",
    },
    uploadParam: {
      type: Object,
      default: null,
    },
  },
  methods: {
    submitImportForm() {
      if (!this.importFile) {
        this.$message.warning("请上传文件");
        return;
      }
      console.log(this.importFile)
      let obj = new FormData();
      if (this.uploadParam) {
        obj.append(this.fileParamName, this.importFile);
       for(let key in this.uploadParam) {
         obj.append(key, this.uploadParam[key])
       }
      } else {
        obj.append(this.fileParamName, this.importFile);
        obj.append("id", this.importId);
      }
      this.$fetch(this.url, obj).then((res) => {
        if (res.code == 200) {
          this.$message.success("操作成功");
          this.$emit("refresh");
          this.$emit("update:importVisible", false);
        }
      });
    },
    // 上传文件
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleChange(file, fileList) {
      this.importFile = file.raw;
    },
    // 导入上传之前的文件格式校验
    beforeAvatarUpload(file) {
      console.log(file);
      let testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "xls";
      const extension2 = testmsg === "xlsx";
      // const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 xls、xlsx格式!",
          type: "warning",
        });
      }
      // if(!isLt2M) {
      //     this.$message({
      //         message: '上传文件大小不能超过 10MB!',
      //         type: 'warning'
      //     });
      // }
      // return extension || extension2 && isLt2M
      return extension || extension2;
    },
    handleClose() {
      // this.importVisible = false;
      this.$emit("update:importVisible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

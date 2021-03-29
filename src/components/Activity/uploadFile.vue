<template>
  <div class="upload-file">
      <el-upload
        class="upload-demo"
        action="#"
        :before-remove="beforeRemove"
        :on-remove="onRemove"
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
  </div>
</template>

<script>
export default {
  name: "upload-file",
  data() {
    return {
      importFile: "",
      fileList: []
    };
  },
  props: ["file"],
  methods: {
    submitImportForm() {
      if (!this.importFile) {
        this.$message.warning("请上传文件");
        return;
      }
      let obj = new FormData();
      obj.append("excel", this.importFile);
      obj.append("id", this.importId);
      this.$fetch(this.url, obj).then((res) => {
        if (res.code == 200) {
          this.$message.success("操作成功");
          this.$emit("refresh")
          this.$emit("update:importVisible", false)
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
    onRemove(file, fileList){
      if(file){
        this.$emit("update:file","");
      }
    },
    handleChange(file, fileList) {
      this.importFile = file.raw;
      this.$emit("update:file",file.raw);

    },
     // 导入上传之前的文件格式校验
    beforeAvatarUpload(file) {
      console.log(file)
      let testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      // const isLt2M = file.size / 1024 / 1024 < 10
      if(!extension && !extension2) {
          this.$message({
              message: '上传文件只能是 xls、xlsx格式!',
              type: 'warning'
          });
      }
      return extension || extension2
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

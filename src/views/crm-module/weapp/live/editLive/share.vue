<template>
  <div class="share-config">
    <RdForm
      :formOptions="addFormOptions"
      formLabelWidth="130px"
      :rules="addRules"
      ref="dataForm4"
    >
      <template slot="sharePoster">
        {{ img }}
        <Upload-oss
          v-if="uploadOssElem"
          :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }"
          :src.sync="img"
          @srcChangeFun="
            (data) => {
              img = data;
              reloadElem('uploadOssElem');
            }
          "
        />
      </template>
      <template slot="shareCover">
        {{ img2 }}
        <Upload-oss
          v-if="uploadOssElem"
          :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }"
          :src.sync="img2"
          @srcChangeFun="
            (data) => {
              img2 = data;
              reloadElem('uploadOssElem');
            }
          "
        />
      </template>
    </RdForm>
    <div class="btn-wrapper">
      <el-button type="primary" @click="handleAdd">保存</el-button>
    </div>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import UploadOss from "@/components/UploadOss";
export default {
  name: "temp",
  data() {
    return {
      addFormOptions: [
        {
          prop: "sharePoster",
          element: "el-input",
          label: "分享海报(4:3)",
          operate: true,
          initValue: 1,
        },
        {
          prop: "shareCover",
          element: "el-input",
          label: "分享封面",
          operate: true,
          initValue: 2,
        },
        {
          prop: "shareTitle",
          element: "el-input",
          placeholder: "请输入分享标题",
          label: "分享标题",
        },
        {
          prop: "shareDescription",
          element: "el-input",
          placeholder: "请输入分享描述",
          label: "分享描述",
          type: "textarea",
          rows: 2,
        },
      ],
      addRules: {
        sharePoster: [{ required: true, message: "", trigger: "blur" }],
        shareCover: [{ required: true, message: "", trigger: "blur" }],
        shareTitle: [
          { required: true, message: "请输入分享标题", trigger: "blur" },
        ],
        shareDescription: [
          { required: true, message: "请输入分享描述", trigger: "blur" },
        ],
      },
      uploadOssElem: true,
      img: "",
      img2: "",
    };
  },
  components: {
    RdForm,
    UploadOss,
  },
  props: {
    liveId: {
      type: Number,
    },
  },
  mounted() {
    this.getInit();
  },
  methods: {
    // 上传组件
    reloadElem(dataElem) {
      // 重新加载组件
      this[dataElem] = false;
      this.$nextTick(() => {
        this[dataElem] = true;
      });
    },
    handleAdd() {
      if (!this.img) {
        this.$message.error("请上传分享海报");
        return;
      }
      if (!this.img2) {
        this.$message.error("请上传分享封面");
        return;
      }
      this.$refs.dataForm4.validate((val, data) => {
        if (val) {
          console.log(data, "data--");
          data.sharePoster = this.img;
          data.shareCover = this.img2;
          this.$fetch("live_updateShare", {
            ...data,
            loginUserId: this.$common.getUserId(),
            liveId: this.liveId,
          }).then((res) => {
            if (res.code == 200) {
              this.$message.success("保存成功");
            }
          });
        }
      });
    },
    getInit() {
      this.$fetch("live_getShare", {
        liveId: this.liveId,
        loginUserId: this.$common.getUserId(),
      }).then((res) => {
        // 回显数据
        this.addFormOptions.forEach((item) => {
          item.initValue = res.data[item.prop];

          // 直播时间，背景图， 封面图， 直播简介，需要单独处理
          if (item.prop == "sharePoster") {
            item.initValue = 0;
            this.img = res.data.sharePoster;
          }
          if (item.prop == "shareCover") {
            item.initValue = 0;
            this.img2 = res.data.shareCover;
          }
        });

        this.$refs.dataForm4.addInitValue();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.share-config {
  .btn-wrapper {
    margin-left: 550px;
  }
}
</style>

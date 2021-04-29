<template>
  <div class="playback">
    <search-form :formOptions="formOptions" @onSearch="onSearch" v-if="showSearchForm"></search-form>
    <div class="btn-wrapper">
      <el-button type="primary" size="small" @click="openVideo">添加回放</el-button>
    </div>
    <rd-table :tableData="tableData" :tableKey="tableKey" fixedTwoRow :emptyText="emptyText">
      <template slot="replayStatus" slot-scope="scope">
        <span>{{ scope.row.replayStatus | replayStatusFilter }}</span>
      </template>
      <template slot="edit" slot-scope="scope">
        <el-button @click="setVideo(scope.row)" type="text" size="small">设为回放</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button
          @click="handleEdit(scope.row)"
          type="text"
          size="small"
          style="color: #ffa500"
          >链接</el-button
        >
        <!-- <el-divider direction="vertical"></el-divider>
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >导出视频</el-button
          > -->
        <el-divider direction="vertical"></el-divider>
        <el-button
          @click="handleDelete(scope.row)"
          type="text"
          size="small"
          style="color: #ec5b56"
          >删除</el-button
        >
      </template>
    </rd-table>
    <rd-dialog
      :title="'链接'"
      :dialogVisible="addVisible"
      @handleClose="addVisible = false"
      :append-to-body="true"
      :showFooter="false"
      :width="'850px'"
    >
      <div class="clearfix">
        <el-input
          v-model="currentLink"
          id="link"
          ref="link"
          :readonly="true"
          size="small"
        >
        </el-input>
        <el-button
          type="primary"
          class="teacher-btn"
          size="small"
          style="margin-top: 10px; float: right"
          @click="copyLink('.teacher-btn')"
          data-clipboard-action="copy"
          data-clipboard-target="#link"
          >复制链接</el-button
        >
      </div>
    </rd-dialog>
    <rd-dialog
      title="添加回放"
      :dialogVisible="videoVisible"
      :width="widthNew"
      :append-to-body="true"
      @handleClose="closeVideo('dataForm')"
      @submitForm="submitForm('dataForm')">
      <el-form ref="dataForm" :model="videoForm" label-width="100px">
        <el-form-item label="视频id" prop="fileId">
          <el-input v-model.trim="videoForm.fileId" autocomplete="off" placeholder="请输入视频id" />
        </el-form-item>
      </el-form>
    </rd-dialog>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  name: "playback",
  data() {
    return {
      formOptions: [
        {
          prop: "livePlaybackName",
          element: "el-input",
          placeholder: "请输入回放名称",
          initWidth: true
        },
      ],
      tableData: [],
      tableKey: [
        {
          name: "回放id",
          value: "livePlaybackId",
          width: 100,
        },
        {
          name: "视频id",
          value: "fileId",
        },
        {
          name: "当前回放",
          value: "replayStatus",
          operate: true,
        },
        {
          name: "回放名称",
          value: "livePlaybackName",
        },
        {
          name: "开始时间",
          value: "startTime",
        },
        {
          name: "结束时间",
          value: "endTime",
        },
        {
          name: "来源",
          value: "playbackSource",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
        },
      ],
      addVisible: false,
      currentLink: "",

      emptyText:"暂无数据",

      showSearchForm: true,

      videoVisible: false,
      widthNew: "600px",
      videoForm: {
        fileId: ''
      }
    };
  },
  props: {
    liveId: {
      type: Number,
    },
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    handleEdit(val) {
      this.currentLink = val.videoUrl;
      this.addVisible = true;
    },
    onSearch(val) {
      this.searchForm = { ...val };
      this.getTableData();
    },
    getTableData(params = {}) {
      this.$fetch("live_get_live_playback_list", {
        ...this.searchForm,
        ...params,
        liveId: this.liveId,
      }).then((res) => {
        this.tableData = res.data;
      })
    },
    copyLink(btnName) {
      let clipboard = new Clipboard(btnName);
      clipboard.on("success", (e) => {
        this.$message.success("复制成功");
        clipboard.destroy(); // 使用destroy可以清楚缓存
      });
      clipboard.on("error", (e) => {
        this.$message.error("该浏览器不支持自动复制");
        clipboard.destroy();
      });
    },
    handleDelete(val) {
      let info = "回放";
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.$fetch("live_delete_playback", {
            livePlaybackId: val.livePlaybackId,
          }).then((res) => {
            this.$message.success("删除成功");
            this.getTableData();
          });
        })
        .catch(() => {});
    },
    setVideo(val) {
      let info = "回放";
      this.$confirm(`此操作将当前${info}设置为默认回放, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(async () => {
          this.$fetch("live_set_playback", {
            livePlaybackId: val.livePlaybackId,
          }).then((res) => {
            this.$message.success("设置成功");
            this.getTableData();
          });
        })
        .catch(() => {});
    },
    openVideo() {
      this.videoVisible = true;
    },
    closeVideo(formName) {
      this.videoVisible = false;
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          // 新增
          this.$fetch("live_add_playback", {
            ...this.videoForm,
            liveId: this.liveId
          }).then((res) => {
            this.$message({
              message: "提交成功",
              type: "success",
            });
            this.getTableData();
            this.closeVideo("dataForm");
          });
        }
      });
    }
  },
  filters: {
    replayStatusFilter(status){
      switch(status){
        case "DISABLE":
          return '否';
        case "ENABLE":
          return '是';
        default:
          return '';
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.playback {
  padding-left: 20px;
  .teacher-btn {
    float: right;
  }
}
</style>

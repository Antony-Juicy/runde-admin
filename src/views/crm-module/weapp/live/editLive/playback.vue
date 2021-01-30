<template>
  <div class="playback">
    <search-form :formOptions="formOptions" @onSearch="onSearch"></search-form>
    <rd-table :tableData="tableData" :tableKey="tableKey" fixedTwoRow>
      <template slot="index" slot-scope="scope">
        {{ scope.$index + 1 }}
      </template>
      <template slot="edit" slot-scope="scope">
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
        },
      ],
      tableData: [],
      tableKey: [
        {
          name: "排名",
          value: "index",
          width: 80,
          operate: true,
        },
        {
          name: "回放id",
          value: "livePlaybackId",
          width: 100,
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
      const loading = this.$loading({
        lock: true,
        target: ".playback .el-table",
      });
      this.$fetch("live_get_live_playback_list", {
        ...this.searchForm,
        ...params,
        liveId: this.liveId,
      }).then((res) => {
        this.tableData = res.data;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
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

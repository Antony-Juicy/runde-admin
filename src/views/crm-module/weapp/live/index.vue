<template>
  <div class="live-container">
    <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >创建直播</el-button
        >
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        fixedTwoRow
        @pageChange="pageChange"
      >
        <template slot="liveCover" slot-scope="scope">
          <el-image
            style="width: 200px; height: 84px"
            :src="scope.row.liveCover"
            fit="cover"
          ></el-image>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >管理</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleShare(scope.row)"
            type="text"
            size="small"
            style="color: #67c23a"
            >分享</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleLink(scope.row)"
            type="text"
            size="small"
            style="color: #ffa500"
            >链接</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleAnalysis(scope.row)"
            type="text"
            size="small"
            style="color:#73777d;margin-left:12px"
            >数据分析</el-button
          >
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

      <!-- 添加直播 -->
      <fullDialog
        v-model="addVisible"
        title="创建直播"
        @change="addVisible = false"
      >
        <addLive
          ref="addLive"
          @close="addVisible = false"
          @refresh="refresh"
          v-if="addVisible"
        />
      </fullDialog>

      <!-- 管理直播 -->
      <fullDialog
        v-model="editVisible"
        :title="'直播间名称：' + liveName"
        @change="editVisible = false"
      >
        <editLive
          ref="editLive"
          :liveName="liveName"
          :liveId="liveId"
          @close="editVisible = false"
          @refresh="refresh"
          v-if="editVisible"
        />
      </fullDialog>

      <!-- 链接 -->
      <rd-dialog
        :title="'直播间名称：' + liveName"
        :dialogVisible="linkVisible"
        :showFooter="false"
        :width="'900px'"
        @handleClose="linkVisible = false"
      >
        <manageLink :liveId="liveId" v-if="linkVisible" />
      </rd-dialog>

      <!-- 分享-小程序二维码 -->
      <rd-dialog
        :title="'直播间名称：' + liveName"
        :dialogVisible="shareVisible"
        :showFooter="false"
        :width="'650px'"
        @handleClose="shareVisible = false"
      >
        <manageShare :liveId="liveId" v-if="shareVisible" />
      </rd-dialog>

      <!-- 数据分析 -->
      <fullDialog
        v-model="analysisVisible"
        :title="liveName+' - 数据分析'"
        @change="analysisVisible = false"
      >
        <analysis
          :liveId="liveId" 
          :liveName="liveName"
          v-if="analysisVisible"
        />
      </fullDialog>
    </div>
  </div>
</template>

<script>
import fullDialog from "@/components/FullDialog";
import addLive from "./addLive";
import manageLink from "./manageLink";
import manageShare from "./manageShare";
import editLive from "./editLive/index.vue";
import analysis from './editLive/analysis/index.vue';
export default {
  name: "live",
  data() {
    return {
      formOptions: [
        {
          prop: "liveName",
          element: "el-input",
          placeholder: "请输入直播名称",
        },
        {
          prop: "liveId",
          element: "el-input",
          placeholder: "请输入直播id",
        },
        {
          prop: "typeId",
          element: "el-cascader",
          placeholder: "项目类型",
          props: { checkStrictly: true },
          options: [],
        },
        {
          prop: "liveChargeMode",
          element: "el-select",
          placeholder: "收费类型",
          options: [
            {
              label: "公开",
              value: "Open",
            },
            {
              label: "付费",
              value: "Charge",
            },
            {
              label: "加密",
              value: "Encryption",
            },
          ],
        },
        {
          prop: "liveMode",
          element: "el-select",
          placeholder: "直播模式",
          options: [
            {
              label: "横屏",
              value: "Landscape",
            },
            {
              label: "竖屏",
              value: "Vertical",
            },
          ],
        },
        {
          prop: "liveStatus",
          element: "el-select",
          placeholder: "直播状态",
          options: [
            {
              label: "未开始",
              value: "NotStart",
            },
            {
              label: "直播中",
              value: "Live",
            },
            {
              label: "已结束",
              value: "End",
            },
          ],
        },
        {
          prop: "liveShowStatus",
          element: "el-select",
          placeholder: "显示状态",
          options: [
            {
              label: "上架",
              value: "Show",
            },
            {
              label: "隐藏",
              value: "Hidden",
            },
          ],
        },
      ],
      tableData: [],
      tableKey: [
        {
          name: "直播id",
          value: "liveId",
          width: 70,
        },
        {
          name: "直播名称",
          value: "liveName",
        },
        {
          name: "直播展示图",
          value: "liveCover",
          operate: true,
          width: 220,
        },
        {
          name: "项目类型",
          value: "typeName",
        },

        {
          name: "收费类型",
          value: "liveChargeMode",
        },
        {
          name: "直播状态",
          value: "liveStatus",
        },
        {
          name: "显示状态",
          value: "liveShowStatus",
        },
        {
          name: "开始时间",
          value: "liveStartTime",
          // width: 160,
        },
        {
          name: "直播模式",
          value: "liveMode",
        },
        {
          name: "浏览量",
          value: "liveRealNumber",
           width: 70,
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 180,
        },
      ],
      pageConfig: {
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
      },
      // 添加弹窗
      addVisible: false,
      // 编辑弹窗
      editVisible: false,
      // 链接弹窗
      linkVisible: false,
      // 分享弹窗
      shareVisible: false,
      // 数据分析弹窗
      analysisVisible: false,
      showAdd: true,
      searchForm: {}, //搜索栏信息
      liveId: "",
      liveName: "",
      
    };
  },
  components: {
    fullDialog,
    addLive,
    editLive,
    manageLink,
    manageShare,
    analysis
  },
  async mounted() {
    this.getSubjectList();
    this.getTableData();
  },
  methods: {
    onSearch(data) {
      this.searchForm = { ...data };
      if (this.searchForm.liveId && isNaN(this.searchForm.liveId)) {
        this.$message.warning("请输入正确的直播id");
        return;
      }
      this.pageConfig.pageNum = 1;
      this.getTableData();
    },
    pageChange(val) {
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getTableData();
    },
    handleAdd() {
      this.addVisible = true;
      this.$nextTick(() => {
        this.$refs.addLive.initGetConfig = true;
      });
    },
    handleEdit(data) {
      this.editVisible = true;
      
      this.$nextTick(() => {
        this.$refs.editLive.$refs.editForm.initGetConfig = true;
        // 如果是从直播统计跳过来的，就让回放管理的搜索栏晚点出现，要不会报错
        if(data.flag == 'analysis'){
        this.$refs.editLive.$refs.playback.showSearchForm = false;
        setTimeout(() => {
          this.$refs.editLive.$refs.playback.showSearchForm = true;
        },500);
      }
      });
      this.liveId = data.liveId;
      this.liveName = data.liveName;
      sessionStorage.setItem("chatAudit", data.chatAudit);
      sessionStorage.setItem("mute", data.mute);
      sessionStorage.setItem("chatHistorySwitch", data.chatHistorySwitch);
    },
    handleLink(data) {
      this.linkVisible = true;
      this.liveId = data.liveId;
      this.liveName = data.liveName;
    },
    handleShare(data) {
      this.shareVisible = true;
      this.liveId = data.liveId;
      this.liveName = data.liveName;
    },
    handleDelete(data) {
      let info = "直播";
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("live_delete", {
            liveId: data.liveId,
            loginUserId: this.$common.getUserId(),
          }).then((res) => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              setTimeout(() => {
                this.getTableData();
              }, 50);
            }
          });
        })
        .catch(() => {});
    },
    getTableData(params = {}) {
      return new Promise((resolve, reject) => {
        let searchForm = JSON.parse(JSON.stringify(this.searchForm))
        if(this.searchForm.typeId) {
          searchForm.typeId = searchForm.typeId.pop()
        }
        this.$fetch("live_list", {
          loginUserId: this.$common.getUserId(),
          ...this.pageConfig,
          ...searchForm,
          ...params,
        })
          .then((res) => {
            this.tableData = res.data.records.map((item) => {
              item.liveMode = item.liveMode == "Vertical" ? "竖屏" : "横屏";
              item.liveStatus = this.changeLiveStatus(item.liveStatus);
              item.liveChargeMode = this.changeChargeMode(item.liveChargeMode);
              item.liveCover = this.$common.setThumbnail(item.liveCover);
              item.liveShowStatus = this.changeShowStatus(item.liveShowStatus);
              return item;
            });
            this.pageConfig.totalCount = res.data.totalCount;
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },
    refresh(val) {
      this.getTableData({
        pageNum: val || this.pageConfig.pageNum,
      });
    },
    changeLiveStatus(val) {
      if (val == "NotStart") {
        return "未开始";
      } else if (val == "Live") {
        return "直播中";
      } else if (val == "End") {
        return "已结束";
      }
    },
    changeChargeMode(val) {
      if (val == "Open") {
        return "公开";
      } else if (val == "Encryption") {
        return "付费";
      } else if (val == "Charge") {
        return "加密";
      }
    },
    changeShowStatus(val) {
      if (val == "Show") {
        return "上架";
      } else if (val == "Hidden") {
        return "隐藏";
      }
    },
    getSubjectList() {
      this.$fetch("projectType_select").then((res) => {
        // let typeList = res.data.map((item) => ({
        //   label: item.typeName,
        //   value: item.typeId,
        // }));
        let typeList = this.$common.getTypeTree((res.data))
        this.formOptions[2].options = typeList;
        this.formOptions = [...this.formOptions];
      });
    },

    getLiveInfo(liveId){
      return this.$fetch("live_getInfo",{
        liveId
      })
    },

    handleAnalysis(data){
      this.liveId = data.liveId;
      this.liveName = data.liveName;
      this.analysisVisible = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.live-container {
  /deep/ {
    .el-form-item__content {
      width: 495px;
    }
  }
  .full-dialog-container .top-title {
    padding-left: 50px;
  }
}
</style>

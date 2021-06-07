<template>
  <div class="site-x">
    <!-- 弹窗开始 -->
    <el-dialog
      width="25%"
      :title="handleStatus == 1 ? '创建站点' : '编辑查阅'"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <div class="site-dialog-form">
        <el-form
          ref="dialogForm"
          :rules="dialogForm_rules"
          :model="dialogForm"
          label-width="80px"
        >
          <el-form-item class="input" label="试卷名称">
            <el-input
              disabled
              v-model="dialogForm.paperName"
              size="small"
              placeholder="试卷名称"
            ></el-input>
          </el-form-item>
          <el-form-item class="input" label="站点名称" prop="siteName">
            <el-input
              v-model="dialogForm.siteName"
              size="small"
              placeholder="站点名称"
            ></el-input>
          </el-form-item>
          <el-form-item class="select" label="答题时长" prop="answerTime">
            <el-input
              v-model="dialogForm.answerTime"
              size="small"
              placeholder="答题时长"
            ></el-input>
            <span class="minute">
              分钟
            </span>
          </el-form-item>
          <el-form-item label="文案描述" prop="descriPtion">
            <el-input
              v-model="dialogForm.descriPtion"
              type="textarea"
              :rows="5"
            ></el-input>
          </el-form-item>
          <el-form-item class="select" label="总题数" prop="countSubject">
            <el-input
              v-model="dialogForm.countSubject"
              size="small"
              placeholder="总题数"
            ></el-input>
          </el-form-item>
          <el-form-item class="select" label="排序值" prop="sort">
            <el-input
              v-model="dialogForm.sort"
              size="small"
              placeholder="排序值"
            ></el-input>
          </el-form-item>
          <el-form-item class="select" label="状态" prop="stat">
            <el-select
              size="small"
              v-model="dialogForm.stat"
              placeholder="站点状态"
            >
              <el-option
                v-for="item in siteStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="site-dialog-btn">
          <el-button @click="handleSubmit" type="primary" size="medium"
            >保存</el-button
          >
        </div>
      </div>
    </el-dialog>

    <!-- 弹窗结束 -->

    <!-- 抽屉开始 -->

    <el-drawer
      :title="`${lssueData.siteName} - 题目列表`"
      :visible.sync="drawerVisible"
      direction="btt"
      append-to-body
      size="90%"
    >
      <exercises v-if="drawerVisible" :lssueData="lssueData" />
    </el-drawer>
    <!-- 抽屉结束 -->
    <div class="site-handle">
      <el-button @click="handleDialog(1)" type="primary" size="small"
        >创建站点</el-button
      >
      <div class="site-handle__form">
        <el-form ref="sreachForm" :model="params" width="500px">
          <el-form-item>
            <el-input
              v-model="params.siteName"
              size="small"
              placeholder="站点名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              size="small"
              clearable
              v-model="params.stat"
              placeholder="站点状态"
            >
              <el-option
                v-for="item in siteStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button @click="querySiteList" type="primary" size="small"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="site-table">
      <rd-table
        :pageConfig="params"
        :tableData="tableData"
        :tableKey="tableKey"
        @pageChange="pageChange"
      >
        <template slot="stat" slot-scope="scope">
          {{ scope.row.stat == 0 ? "上架" : "下架" }}
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button
            @click="handleDialog(2, scope.row)"
            type="text"
            size="small"
            >查阅/编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm
            @confirm="handleDialog(3, scope.row)"
            title="是否确定删除该站点？"
          >
            <el-button
              slot="reference"
              type="text"
              size="small"
              style="color: #ec5b56"
              >删除</el-button
            >
          </el-popconfirm>
          <br />
          <el-button
            @click="handleDialog(4, scope.row)"
            type="text"
            size="small"
            >查看题目</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-popover placement="top" title="导入方式" trigger="hover">
            <el-button
              size="mini"
              @click="handleDialog(5, scope.row, 'add')"
              type="primary"
              >新增</el-button
            >
            <el-button
              size="mini"
              @click="handleDialog(5, scope.row, 'cover')"
              type="primary"
              >覆盖</el-button
            >
            <el-button type="text" size="small" slot="reference"
              >题目导入</el-button
            >
          </el-popover>
        </template>
      </rd-table>
    </div>
    <!-- 上传题目 -->
    <upload-file-dialog
      :importVisible.sync="uploadVisible"
      url="import_issue_excel"
      :uploadParam="uploadParam"
      @refresh="querySiteList"
      append-to-body
    />
  </div>
</template>

<script>
import { deepClone } from "@/utils/index.js";
import exercises from "./exercises";
import uploadFileDialog from "@/components/Activity/uploadFileDialog";

export default {
  name: "examination-site",
  components: {
    exercises,
    uploadFileDialog
  },
  props: {
    paperName: {
      type: String,
      default: "",
      required: true,
    },
    paperId: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  data() {
    return {
      uploadVisible: false,
      uploadParam: {},
      // 题目ID
      lssueData: "",
      // 抽屉显示
      drawerVisible: false,
      // 弹窗显示
      dialogVisible: false,
      // 弹窗操作的状态(1:创建 2:编辑)
      handleStatus: 1,
      // 弹窗表单
      dialogForm: {
        // 试卷名称
        paperName: "",
        // 站点名称
        siteName: "",
        // 试卷id
        paperId: "",
        // 状态
        stat: "",
        // 总题数
        countSubject: "",
        // 答题时间
        answerTime: "",
        // 排序值
        sort: "",
        // 描述文案
        descriPtion: "",
      },
      // 表单验证规则
      dialogForm_rules: {
        // 试卷名称
        paperName: "",
        // 站点名称
        siteName: "",
        // 试卷id
        paperId: "",
        // 状态
        stat: "",
        // 总题数
        countSubject: "",
        // 答题时间
        answerTime: "",
        // 排序值
        sort: "",
        // 描述文案
        descriPtion: "",
      },
      // 站点状态选项
      siteStatus: [
        {
          value: "",
          label: "全部",
        },
        {
          value: 0,
          label: "上架",
        },
        {
          value: 1,
          label: "下架",
        },
      ],
      // 表单数据
      tableData: [],
      tableKey: [
        {
          name: "ID主键",
          value: "id",
          width: 80,
        },
        {
          name: "站点名称",
          value: "siteName",
          width: 180,
        },
        {
          name: "模拟卷名称",
          value: "paperName",
        },
        {
          name: "显示状态",
          value: "stat",
          operate: true,
          width: 140,
        },
        {
          name: "总题数",
          value: "countSubject",
          width: 240,
        },
        {
          name: "答题时长（分钟）",
          value: "answerTime",
          width: 240,
        },
        {
          name: "排序值",
          value: "sort",
          width: 140,
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 160,
        },
      ],
      params: {
        id: "",
        siteName: "", // 站点名称
        stat: "", // 站点状态
        totalCount: 1,
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    // 查询站点列表
    querySiteList() {
      this.$fetch("site_paper_list", this.params).then((res) => {
        console.log(res);
        this.params.totalCount = res.data.totalCount;
        this.tableData = res.data.records;
      });
    },
    pageChange(val) {
      console.log(val);
      this.params.pageSize = val.limit;
      this.params.pageNum = val.page;
      this.queryPaperList();
    },
    // 打开弹窗
    handleDialog(status, row, uploadType) {
      // handleDialog 1: 创建； 2： 查看编辑； 3： 删除； 4： 查看题目； 5： 题目导入
      switch (status) {
        case 1:
          /**
           * 新增
           */
          this.handleStatus = status;
          this.dialogVisible = true;
          this.$nextTick((_) => {
            this.resetForm("dialogForm");
          });
          break;
        case 2:
          /**
           * 编辑
           */
          this.handleStatus = status;
          this.dialogVisible = true;
          this.$nextTick((_) => {
            this.dialogForm = deepClone(row);
          });
          break;
        case 3:
          /**
           * 删除
           */
          console.log(row)
          this.$fetch("site_paper_delete", { analogSiteId: row.id }).then(
            (res) => {
              this.querySiteList();
            }
          );
          break;
        case 4:
          /**
           * 查看题目
           */
          this.lssueData = row;
          this.drawerVisible = true;
          break;
         case 5:
          /**
           * 题目导入
           */
          console.log("题目导入", row);
          this.uploadParam = {
            chooseType: uploadType,
            paperId: row.id,
            siteName: row.siteName
          };
          this.uploadVisible = true;
          break;
      }
    },
    // 弹窗保存按钮
    handleSubmit() {
      let status = "add";
      this.handleStatus == 2 && (status = "update");
      this.$fetch(`site_paper_${status}`, this.dialogForm).then((res) => {
        this.dialogVisible = false;
        this.querySiteList();
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.params.paperName = this.paperName;
    this.params.paperId = this.paperId;
    this.dialogForm.paperName = this.paperName;
    this.dialogForm.paperId = this.paperId;
    this.querySiteList();
  },
};
</script>

<style lang="scss" scoped>
.site-x {
  width: 100%;
}
.minute {
  position: absolute;
  right: -8px;
  transform: translateX(100%);
}
.site-dialog-form {
  .input {
    width: 100%;
  }
  .select {
    width: 280px;
  }
}
.site-dialog-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}
.site-handle {
  &-create {
    margin-left: 15px;
  }
  &__form {
    background: #fff;
    margin: 15px 0;
    padding: 15px;
    display: flex;
    align-items: center;
    & > .el-form {
      display: flex;
      & > .el-form-item {
        flex: 1;
        margin-bottom: 0;
        margin-right: 12px;
      }
    }
  }
}
.site-table {
  background: #fff;
  padding: 15px;
}
</style>
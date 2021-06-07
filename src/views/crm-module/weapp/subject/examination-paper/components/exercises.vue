<template>
  <div class="lssue-x">
    <!-- 弹窗开始 -->
    <el-dialog
      top="8vh"
      width="28%"
      :close-on-click-modal="false"
      :title="handleStatus == 1 ? '添加题目' : '编辑查阅'"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <div class="lssue-dialog-form">
        <el-form
          ref="dialogForm"
          :rules="dialogForm_rules"
          :model="dialogForm"
          label-width="94px"
        >
          <el-form-item class="input-normal" label="试卷名称" prop="paperName">
            <el-input
              disabled
              v-model="lssueData.paperName"
              size="small"
              placeholder="试卷名称"
            ></el-input>
          </el-form-item>
          <el-form-item class="input-normal" label="题目名称" prop="issuse">
            <el-input
              :disabled="handleStatus != 1"
              v-model="dialogForm.issue.issuse"
              size="small"
              placeholder="题目名称"
            ></el-input>
          </el-form-item>
          <el-form-item class="input-normal" label="题目类型" prop="issuesType">
            <el-select
              size="small"
              v-model="dialogForm.issuesType"
              placeholder="题目类型"
            >
              <el-option
                v-for="item in lssueType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="input-normal" label="音频ID" prop="videoUrl">
            <div class="media-upload-btn">
              <upload-oss-media
                :btnImg="require('../upload_img.jpg')"
                :src.sync="dialogForm.issue.videoUrl"
                preview
              />
            </div>
          </el-form-item>
          <el-form-item
            class="input-normal"
            label="题目内容"
            prop="issuseContent"
          >
            <el-input
              v-model="dialogForm.issue.issuseContent"
              type="textarea"
              :rows="3"
            ></el-input>
            <div class="upload-btn">
              <upload-oss
                :btnImg="require('../upload_img.jpg')"
                :preview="true"
                :src.sync="dialogForm.issue.imageIssuse"
              />
            </div>
          </el-form-item>

          <!-- 选项 -->
          <template v-if="dialogForm.issuesType == '单选题'">
            <el-form-item
              class="input-normal"
              size="small"
              v-for="(item, index) in dialogForm.issue.option"
              :key="item.name"
              prop="option"
            >
              <i class="input-option">{{ item.name }}</i>

              <el-input v-model="item.value"></el-input>
              <i
                @click="deleteOption(index)"
                class="deleteOption el-icon-remove-outline"
              ></i>
              <div class="upload-btn">
                <upload-oss
                  :btnImg="require('../upload_img.jpg')"
                  :preview="true"
                  :src.sync="item.image"
                />
              </div>
            </el-form-item>
            <el-form-item class="input-normal" size="mini">
              <el-button @click="addOption" type="primary" class="add-btn"
                >添加选项</el-button
              >
            </el-form-item>
          </template>
          <!-- 选项 -->

          <el-form-item
            class="input-normal"
            label="答案解析"
            prop="textAnalysis"
          >
            <el-input
              v-model="dialogForm.issue.textAnalysis"
              type="textarea"
              :rows="4"
            ></el-input>
            <div class="upload-btn">
              <upload-oss
                :btnImg="require('../upload_img.jpg')"
                :preview="true"
                :src.sync="dialogForm.issue.imageAnalysis"
              />
            </div>
          </el-form-item>
          <el-form-item
            v-if="dialogForm.issuesType == '单选题'"
            class="input-small"
            label="正确答案"
            prop="answer"
          >
            <el-select
              size="small"
              v-model="dialogForm.issue.answer"
              placeholder="正确答案"
            >
              <el-option
                v-for="item in dialogForm.issue.option"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="dialogForm.issuesType == '问答题'"
            class="input-small"
            label="观看时间(秒)"
            prop="watchTime"
          >
            <el-input
              v-model="dialogForm.watchTime"
              size="small"
              placeholder="观看时间"
            ></el-input>
          </el-form-item>
          <el-form-item class="input-small" label="序号" prop="sort">
            <el-input
              v-model="dialogForm.sort"
              size="small"
              placeholder="序号"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="lssue-dialog-btn">
          <el-button @click="handleSubmit" type="primary" size="medium"
            >保存</el-button
          >
        </div>
      </div>
    </el-dialog>

    <!-- 弹窗结束 -->

    <div class="lssue-handle">
      <el-button @click="handleDialog(1)" type="primary" size="small"
        >创建题目</el-button
      >
      <!-- <div class="lssue-handle__form">
        <el-form ref="sreachForm" :model="params" width="500px">
          <el-form-item>
            <el-input
              v-model="params.lssueName"
              size="small"
              placeholder="题目名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              size="small"
              clearable
              v-model="params.stat"
              placeholder="题目状态"
            >
              <el-option
                v-for="item in lssueStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button @click="queryLssueList" type="primary" size="small"
          >搜索</el-button
        >
      </div> -->
    </div>
    <div class="lssue-table">
      <rd-table :tableData="tableData" :tableKey="tableKey">
         <template slot="siteName">
           {{ lssueData.siteName }}
         </template>
         <template slot="issuse" slot-scope="scope">
           {{ scope.row.issue.issuse }}
         </template>
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
            title="是否确定删除该题目？"
          >
            <el-button
              slot="reference"
              type="text"
              size="small"
              style="color: #ec5b56"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </rd-table>
    </div>
  </div>
</template>

<script>
import { deepClone } from "@/utils/index.js";
import UploadOss from "@/components/UploadOss";
import UploadOssMedia from "@/components/UploadOssMedia";

export default {
  name: "examination-lssue",
  components: {
    UploadOss,
    UploadOssMedia,
  },
  props: {
    lssueData: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
  },
  data() {
    return {
      // 抽屉显示
      drawerVisible: false,
      // 弹窗显示
      dialogVisible: false,
      // 弹窗操作的状态(1:创建 2:编辑)
      handleStatus: 1,
      // 弹窗表单
      dialogForm: {
        issuseId: "",
        issue: {
          videoUrl: "",
          answer: "",
          imageAnalysis: "",
          issuse: "",
          issuseContent: "",
          imageIssuse: "",
          videoId: "",
          textAnalysis: "",
          watchTime: "",
          option: [],
        },
        issuesType: "单选题",
        sort: "",
      },
      // 表单验证规则
      dialogForm_rules: {
        issuseId: "",
        issue: {
          videoUrl: "",
          answer: "",
          imageAnalysis: "",
          issuse: "",
          issuseContent: "",
          imageIssuse: "",
          videoId: "",
          textAnalysis: "",
          watchTime: "",
          option: [],
        },
        issuesType: "单选题",
        sort: "",
      },
      // 题目状态选项
      lssueStatus: [
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
      // 题目类型选项
      lssueType: [
        {
          value: "单选题",
          label: "单选题",
        },
        {
          value: "问答题",
          label: "问答题",
        },
      ],
      // 表单数据
      tableData: [],
      tableKey: [
        {
          name: "ID主键",
          value: "issuseId",
          width: 80,
        },
        {
          name: "题目名称",
          value: "issuse",
          operate: true,
        },
        {
          name: "站点名称",
          value: "siteName",
          operate: true,
        },
        {
          name: "题目类型",
          value: "issuesType",
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
        analogSiteId: "", // 所属站点ID
        stat: "", // 题目状态
        // totalCount: 1,
        // pageNum: 1,
        // pageSize: 10,
      },
    };
  },
  methods: {
    // 删除选项按钮
    deleteOption(index) {
      this.dialogForm.issue.option.splice(index, 1);
      this.dialogForm.issue.option = this.dialogForm.issue.option.reduce(
        (cur, next, index) => {
          next.name = String.fromCharCode(index + 65);
          cur.push(next);
          return cur;
        },
        []
      );
    },
    // 添加选项按钮
    addOption() {
      const defaultAscii = 65,
        optionCount = this.dialogForm.issue.option.length;
      this.dialogForm.issue.option.push({
        image: "",
        name: String.fromCharCode(optionCount + defaultAscii),
        value: "",
      });
    },
    // 查询题目列表
    queryLssueList() {
      this.$fetch("lssue_paper_list", this.params).then((res) => {
        if (res.code == 200) {
          this.tableData = JSON.parse(res.msg);
        }
      });
    },
    pageChange(val) {
      this.queryLssueList();
    },
    // 打开弹窗
    handleDialog(status, row) {
      // handleDialog 1: 创建； 2： 查看编辑； 3： 删除； 4： 查看题目； 5： 题目导入
      switch (status) {
        case 1:
          /**
           * 新增
           */
          this.handleStatus = status;
          this.dialogVisible = true;
          this.$nextTick((_) => {
            this.resetForm();
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
          this.$fetch("lssue_paper_delete", {
            issuseId: row.issuseId,
            id: this.params.analogSiteId,
          }).then((res) => {
            this.queryLssueList();
          });
          break;
        case 4:
          /**
           * 查看题目
           */
          this.drawerVisible = true;
          this.lssueId = row.id;
          break;
        case 5:
          /**
           * 题目导入
           */
          break;
      }
    },
    // 弹窗保存按钮
    handleSubmit() {
      let status;
      if (this.handleStatus == 2) {
        status = "update";
      } else if (this.handleStatus == 1) {
        status = "add";
        delete this.dialogForm.issuseId;
      }
      let params = {
        id: this.lssueData.id,
        content: JSON.stringify(this.dialogForm),
      };
      this.$fetch(`lssue_paper_${status}`, params).then((res) => {
        this.dialogVisible = false;
        this.queryLssueList();
      });
    },
    // 重置表单
    resetForm() {
      this.dialogForm = deepClone(this.dialogForm_rules);
    },
  },
  mounted() {
    this.params.analogSiteId = this.lssueData.id;
    this.queryLssueList();
  },
};
</script>

<style lang="scss" scoped>
.upload-btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(120%, -36%);
  /deep/ .img180 {
    width: 32px;
    height: 32px;
  }
}
.media-upload-btn {
  width: 32px;
  height: 32px;
  /deep/ .img180 {
    width: 32px;
    height: 32px;
  }
}
.input-option {
  position: absolute;
  left: -44px;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  text-align: center;
  line-height: 32px;
  background: #e9f4ff;
  border: 1px solid #409eff;
  font-style: normal;
}
.lssue-x {
  width: 100%;
}
.lssue-dialog-form {
  .el-form-item {
    margin-bottom: 8px;
  }
  .input-normal {
    width: 85%;
  }
  .input-small {
    width: 200px;
  }
  .add-btn {
    width: 100%;
  }
  .deleteOption {
    cursor: pointer;
    font-style: normal;
    position: absolute;
    color: #f56c6c;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
  }
}
.lssue-dialog-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}
.lssue-handle {
  & > .el-button {
    margin-left: 15px;
  }
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
.lssue-table {
  background: #fff;
  padding: 15px;
}
</style>
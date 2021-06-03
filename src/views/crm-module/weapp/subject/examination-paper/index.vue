<template>
  <div class="test-x">
    <!-- 弹窗开始 -->
    <el-dialog
      width="30%"
      :title="handleStatus == 1 ? '创建模拟卷' : '编辑查阅'"
      :visible.sync="dialogVisible"
    >
      <div class="test-dialog-form">
        <el-form
          ref="dialogForm"
          :rules="dialogForm_rules"
          :model="dialogForm"
          label-width="82px"
        >
          <el-form-item label="模拟卷名称" prop="paperName">
            <el-input
              v-model="dialogForm.paperName"
              size="small"
              placeholder="模拟卷名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目列表" prop="subjectId">
            <el-select
              size="small"
              v-model="dialogForm.subjectId"
              placeholder="项目列表"
              @change="subjectChange"
            >
              <el-option
                v-for="item in subjectList"
                :key="item.id"
                :label="item.subjectName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="stat">
            <el-select
              size="small"
              v-model="dialogForm.stat"
              placeholder="模拟卷状态"
            >
              <el-option
                v-for="item in testStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分享解锁" prop="isShare">
            <el-select
              size="small"
              v-model="dialogForm.isShare"
              placeholder="是否需要分享解锁"
            >
              <el-option
                v-for="item in shareStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序值" prop="sort">
            <el-input
              v-model="dialogForm.sort"
              size="small"
              placeholder="排序值"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="test-dialog-btn">
        <el-button @click="handleSubmit" type="primary" size="medium"
          >保存</el-button
        >
      </div>
    </el-dialog>
    <!-- 弹窗结束 -->

    <!-- 站点抽屉开始 -->
    <full-dialog
      :title="`${siteData.paperName} - 站点列表`"
      v-model="drawerVisible"
      @change="fullDialogChange"
    >
      <site
        v-if="siteData.paperName && siteData.id"
        :paperName="siteData.paperName"
        :paperId="siteData.id"
      />
    </full-dialog>
    <!-- 站点抽屉结束 -->

    <div class="test-handle">
      <el-button @click="handleDialog(1)" type="primary" size="small"
        >创建模拟卷</el-button
      >
      <div class="test-handle__form">
        <el-form ref="sreachForm" :model="params" width="500px">
          <el-form-item>
            <el-input
              v-model="params.paperName"
              size="small"
              placeholder="模拟卷名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              size="small"
              clearable
              v-model="params.stat"
              placeholder="模拟卷状态"
            >
              <el-option
                v-for="item in testStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              size="small"
              clearable
              v-model="params.subjectId"
              placeholder="项目名称"
            >
              <el-option
                v-for="item in subjectList"
                :key="item.id"
                :label="item.subjectName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button @click="queryPaperList" type="primary" size="small"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="test-table">
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
            title="是否确定删除该试卷？"
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
            >站点列表</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDialog(5, scope.row)"
            type="text"
            size="small"
            >题目导入</el-button
          >
        </template>
      </rd-table>
    </div>
  </div>
</template>

<script>
import site from "./components/site";
import { deepClone } from "@/utils/index.js";

export default {
  name: "examination-paper",
  components: {
    site,
  },
  data() {
    return {
      // 传入站点页面的数据
      siteData: {
        subjectName: null,
        subjectId: null,
      },
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
        // 项目id
        subjectId: "",
        // 分享解锁
        isShare: "",
        // 状态
        stat: "",
        // 排序值
        sort: "",
        // 项目名称
        subjectName: "",
      },
      // 表单验证规则
      dialogForm_rules: {
        // 试卷名称
        paperName: "",
        // 项目id
        subjectId: "",
        // 分享解锁
        isShare: "",
        // 状态
        stat: "",
        // 排序值
        sort: "",
        // 项目名称
        subjectName: "1",
      },
      // 模拟卷状态选项
      testStatus: [
        {
          value: 0,
          label: "上架",
        },
        {
          value: 1,
          label: "下架",
        },
      ],
      // 模拟卷分享选项
      shareStatus: [
        {
          value: 0,
          label: "不用解锁",
        },
        {
          value: 1,
          label: "分享解锁",
        },
      ],
      // 项目列表
      subjectList: [],
      // 表单数据
      tableData: [],
      tableKey: [
        {
          name: "ID主键",
          value: "id",
          width: 80,
        },
        {
          name: "模拟卷名称",
          value: "paperName",
          width: 240,
        },
        {
          name: "项目名称",
          value: "subjectName",
          width: 220,
        },
        {
          name: "显示状态",
          value: "stat",
          operate: true,
          width: 240,
        },
        {
          name: "排序值",
          value: "sort",
          width: 140,
        },
        {
          name: "创建时间",
          value: "createAt",
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
        paperName: "", // 试卷名称
        subjectId: "", // 项目名称
        stat: "", // 试卷状态
        subjectName: "",
        totalCount: 1,
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    fullDialogChange() {
      this.drawerVisible = false
      this.siteData = {}
    },
    // 选择项目时触发
    subjectChange(subjectId) {
      let result = this.subjectList.find((res) => {
        return res.id == subjectId;
      });
      this.dialogForm.subjectName = result.subjectName;
    },
    //  查询项目列表
    querySubjectList() {
      this.$fetch("subject_paper_list_").then((res) => {
        this.subjectList = res.data;
      });
    },
    // 查询试卷列表
    queryPaperList() {
      this.$fetch("analog_paper_list", this.params).then((res) => {
        this.params.totalCount = res.data.totalCount;
        this.tableData = res.data.records;
      });
    },
    pageChange(val) {
      this.queryPaperList();
    },
    // 打开弹窗
    handleDialog(status, row) {
      // handleDialog 1: 创建； 2： 查看编辑； 3： 删除； 4： 站点列表； 5： 题目导入
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
          this.$fetch("analog_paper_delete", { analogPaperId: row.id }).then(
            (res) => {
              this.queryPaperList();
            }
          );
          break;
        case 4:
          /**
           * 站点列表；
           */
          this.siteData.paperName = row.paperName;
          this.siteData.id = row.id;
          this.drawerVisible = true;
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
      let status = "add";
      this.handleStatus == 2 && (status = "update");
      this.$fetch(`analog_paper_${status}`, this.dialogForm).then((res) => {
        this.dialogVisible = false;
        this.queryPaperList();
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.queryPaperList();
    this.querySubjectList();
  },
};
</script>

<style lang="scss" scoped>
.test-x {
  width: 100%;
}
.test-dialog-form {
  .el-form-item:not(:first-child) {
    width: 260px;
  }
}
.test-dialog-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}

.test-handle {
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
.test-table {
  background: #fff;
  padding: 15px;
}
</style>
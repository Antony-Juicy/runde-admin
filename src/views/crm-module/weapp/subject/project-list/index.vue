<template>
  <div class="project-x">
    <!-- 弹窗开始 -->
    <el-dialog
      width="25%"
      :title="handleStatus == 1 ? '创建项目' : '编辑查阅'"
      :visible.sync="dialogVisible"
    >
      <div class="project-dialog-form">
        <el-form
          ref="dialogForm"
          :rules="dialogForm_rules"
          :model="dialogForm"
          label-width="80px"
        >
          <el-form-item label="分类名称" prop="subjectName">
            <el-input
              v-model="dialogForm.subjectName"
              size="small"
              placeholder="请输入分类名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="状态" prop="stat">
            <el-select
              size="small"
              v-model="dialogForm.stat"
              placeholder="项目状态"
            >
              <el-option
                v-for="item in projectStatusHandle"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="project-dialog-btn">
        <el-button @click="handleSubmit" type="primary" size="medium"
          >保存</el-button
        >
      </div>
    </el-dialog>
    <!-- 弹窗结束 -->

    <div class="project-handle">
      <el-button @click="handleDialog(1)" type="primary" size="small"
        >创建项目</el-button
      >
      <div class="project-handle__form">
        <el-form ref="sreachForm" :model="params" width="500px">
          <el-form-item>
            <el-input
              v-model="params.subjectName"
              size="small"
              placeholder="项目名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              size="small"
              clearable
              v-model="params.stat"
              placeholder="项目状态"
            >
              <el-option
                v-for="item in projectStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button @click="querySubjectList" type="primary" size="small"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="project-table">
      <rd-table
        :pageConfig="params"
        :tableData="tableData"
        :tableKey="tableKey"
        @pageChange="pageChange"
      >
        <template slot="stat" slot-scope="scope">
          {{ scope.row.stat == 0 ? "显示" : "隐藏" }}
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
            title="是否确定删除该项目？"
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
        </template>
      </rd-table>
    </div>
  </div>
</template>

<script>
import { deepClone } from "@/utils/index.js";

export default {
  name: "project-list",
  data() {
    return {
      // 弹窗显示
      dialogVisible: false,
      // 弹窗操作的状态(1:创建 2:编辑)
      handleStatus: 1,
      // 弹窗表单
      dialogForm: {
        // 项目名称
        subjectName: "",
        // 状态
        stat: "",
      },
      // 表单验证规则
      dialogForm_rules: {
        // 项目名称
        subjectName: "",
        // 状态
        stat: "",
      },
      // 项目状态选项
      projectStatus: [
        {
          value: "",
          label: "全部",
        },
        {
          value: 0,
          label: "显示",
        },
        {
          value: 1,
          label: "隐藏",
        },
      ],
      projectStatusHandle: [
        {
          value: 0,
          label: "显示",
        },
        {
          value: 1,
          label: "隐藏",
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
          name: "分类名称",
          value: "subjectName",
          width: 360,
        },
        {
          name: "显示状态",
          value: "stat",
          operate: true,
          width: 240,
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
        subjectName: "", // 项目名称
        stat: "", // 项目状态
        totalCount: 1,
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    // 选择项目时触发
    subjectChange(subjectId) {
      let result = this.subjectList.find((res) => {
        return res.id == subjectId;
      });
      this.dialogForm.subjectName = result.subjectName;
    },
    //  查询项目列表
    querySubjectList() {
      this.$fetch("subject_paper_list", this.params).then((res) => {
        this.params.totalCount = res.data.totalCount;
        this.tableData = res.data.records;
      });
    },
    pageChange(val) {
      this.params.pageSize = val.limit;
      this.params.pageNum = val.page;
      this.queryPaperList();
    },
    // 打开弹窗
    handleDialog(status, row) {
      // handleDialog 1: 创建； 2： 查看编辑； 3： 删除
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
          this.$fetch("subject_paper_delete", { analogSubjectId: row.id }).then(
            (res) => {
              this.querySubjectList();
            }
          );
          break;
      }
    },
    // 弹窗保存按钮
    handleSubmit() {
      let status = "add";
      this.handleStatus == 2 && (status = "update");
      this.$fetch(`subject_paper_${status}`, this.dialogForm).then((res) => {
        this.dialogVisible = false;
        this.querySubjectList();
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.querySubjectList();
  },
};
</script>

<style lang="scss" scoped>
.project-x {
  width: 100%;
}
.project-dialog-form {
  .el-form-item:not(:first-child) {
    width: 260px;
  }
}
.project-dialog-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}

.project-handle {
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
.project-table {
  background: #fff;
  padding: 15px;
}
</style>
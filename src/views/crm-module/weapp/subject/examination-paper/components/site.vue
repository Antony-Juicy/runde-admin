<template>
  <div class="site-x">
    <!-- 弹窗开始 -->
    <el-dialog
      width="40%"
      :title="handleStatus == 1 ? '创建站点' : '编辑查阅'"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <div class="site-dialog-form">
        <el-form ref="dialogForm" :model="dialogForm" label-width="80px">
          <el-form-item class="input" label="试卷名称">
            <el-input
              disabled
              v-model="dialogForm.testName"
              size="small"
              placeholder="试卷名称"
            ></el-input>
          </el-form-item>
          <el-form-item class="input" label="站点名称">
            <el-input
              v-model="dialogForm.siteName"
              size="small"
              placeholder="站点名称"
            ></el-input>
          </el-form-item>
          <el-form-item class="select" label="答题时长">
            <el-input
              v-model="dialogForm.time"
              size="small"
              placeholder="答题时长"
            ></el-input>
          </el-form-item>
          <el-form-item label="文案描述">
            <el-input
              v-model="dialogForm.describe"
              type="textarea"
              :rows="5"
            ></el-input>
          </el-form-item>
          <el-form-item class="select" label="排序值">
            <el-input
              v-model="dialogForm.sort"
              size="small"
              placeholder="排序值"
            ></el-input>
          </el-form-item>
          <el-form-item class="select" label="状态">
            <el-select
              size="small"
              v-model="dialogForm.status"
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
      title="查看题目"
      :visible.sync="drawerVisible"
      direction="btt"
      size="90%"
      append-to-body
    >
      <exercises />
    </el-drawer>
    <!-- 抽屉结束 -->
    <div class="site-handle">
      <el-button
        class="site-handle-create"
        @click="handleDialog(1)"
        type="primary"
        size="small"
        >创建站点</el-button
      >
      <div class="site-handle__form">
        <el-form ref="siteForm" :model="siteForm" width="500px">
          <el-form-item>
            <el-input
              v-model="siteForm.siteName"
              size="small"
              placeholder="站点名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              size="small"
              v-model="siteForm.siteStatus"
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
        <el-button @click="handleSreach" type="primary" size="small"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="site-table">
      <rd-table
        :pageConfig="pageConfig"
        :tableData="tableData"
        :tableKey="tableKey"
      >
        <template slot="edit" slot-scope="scope">
          <el-button
            @click="handleDialog(2, scope.row)"
            type="text"
            size="small"
            >查阅/编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDialog(3, scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >删除</el-button
          >
          <br />
          <el-button
            @click="handleDialog(4, scope.row)"
            type="text"
            size="small"
            >查看题目</el-button
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
import exercises from "./exercises";
export default {
  name: "examination-site",
  components: {
    exercises,
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
        // 试卷名称
        testName: "",
        // 站点名称
        siteName: "",
        // 答题时长
        time: "",
        // 文案描述
        describe: "",
        // 排序值
        sort: "",
        // 状态
        status: "",
      },
      // 搜索表单
      siteForm: {
        // 站点名称
        siteName: "",
        // 站点状态
        siteStatus: "",
      },
      // 站点状态选项
      siteStatus: [
        {
          value: "选项1",
          label: "状态1",
        },
      ],
      tableData: [
        {
          id: 1,
          type: "分类分类分类分类",
          sort: 1,
          status: 1608897351706,
          time: 2,
        },
      ],
      tableKey: [
        {
          name: "ID主键",
          value: "id",
          width: 80,
        },
        {
          name: "站点名称",
          value: "site",
          width: 140,
        },
        {
          name: "模拟卷名称",
          value: "name",
        },
        {
          name: "显示状态",
          value: "status",
          width: 100,
        },
        {
          name: "总题数",
          value: "count",
          width: 120,
        },
        {
          name: "答题时长（分钟）",
          value: "status",
          width: 140,
        },
        {
          name: "排序值",
          value: "sort",
          width: 100,
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 160,
        },
      ],
      pageConfig: {
        totalCount: 1,
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
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
          break;
        case 2:
          /**
           * 编辑
           */
          console.log("编辑", row);
          this.handleStatus = status;
          this.dialogVisible = true;
          break;
        case 3:
          /**
           * 删除
           */
          console.log("删除", row);
          break;
        case 4:
          /**
           * 查看题目；
           */
          this.drawerVisible = true;
          console.log("查看题目；");
          break;
        case 5:
          /**
           * 题目导入
           */
          console.log("题目导入", row);
          break;
      }
    },
    // 点击搜索按钮
    handleSreach() {
      console.log("搜索");
    },
    // 弹窗保存按钮
    handleSubmit() {
      console.log("保存");
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.site-x {
  width: 100%;
}
.site-dialog-form {
  .input {
    width: 480px;
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
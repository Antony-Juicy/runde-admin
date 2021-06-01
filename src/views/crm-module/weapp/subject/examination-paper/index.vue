<template>
  <div class="test-x">
    <!-- 弹窗开始 -->
    <el-dialog
      width="30%"
      :title="handleStatus == 1 ? '创建模拟卷' : '编辑查阅'"
      :visible.sync="dialogVisible"
    >
      <div class="test-dialog-form">
        <el-form ref="dialogForm" :model="dialogForm" label-width="80px">
          <el-form-item label="分类名称">
            <el-input
              v-model="dialogForm.type"
              size="small"
              placeholder="模拟卷名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              size="small"
              v-model="dialogForm.status"
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
          <el-form-item label="排序值">
            <el-input
              v-model="dialogForm.sort"
              size="small"
              placeholder="排序值"
            ></el-input>
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

    <!-- 站点抽屉开始 -->
    <full-dialog
      title="站点列表"
      v-model="drawerVisible"
      @change="drawerVisible = false"
    >
      <site />
    </full-dialog>
    <!-- 站点抽屉结束 -->

    <div class="test-handle">
      <el-button @click="handleDialog(1)" type="primary" size="small"
        >创建模拟卷</el-button
      >
      <div class="test-handle__form">
        <el-form ref="testForm" :model="testForm" width="500px">
          <el-form-item>
            <el-input
              v-model="testForm.testName"
              size="small"
              placeholder="模拟卷名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              size="small"
              v-model="testForm.testStatus"
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
        </el-form>
        <el-button @click="handleSreach" type="primary" size="small"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="test-table">
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
export default {
  name: "examination-paper",
  components: {
    site,
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
        // 分类名称
        type: "",
        // 状态
        status: "",
        // 排序值
        sort: "",
      },
      // 搜索表单
      testForm: {
        // 模拟卷名称
        testName: "",
        // 模拟卷状态
        testStatus: "",
      },
      // 模拟卷状态选项
      testStatus: [
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
          name: "模拟卷名称",
          value: "type",
          width: 240,
        },
        {
          name: "显示状态",
          value: "status",
          width: 240,
        },
        {
          name: "排序值",
          value: "sort",
          width: 140,
        },
        {
          name: "创建时间",
          value: "time",
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
      // handleDialog 1: 创建； 2： 查看编辑； 3： 删除； 4： 站点列表； 5： 题目导入
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
           * 站点列表；
           */
          this.drawerVisible = true;
          console.log("站点列表");
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
.test-x {
  width: 100%;
}
.test-dialog-form {
  .el-form-item:nth-child(2),
  .el-form-item:nth-child(3) {
    width: 260px;
  }
}
.test-dialog-form {
  .el-form-item:nth-child(2) {
    width: 260px;
  }
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
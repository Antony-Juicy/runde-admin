<template>
  <div class="exercises-x">
    <!-- 弹窗开始 -->
    <el-dialog
      top="10vh"
      width="35%"
      :title="handleStatus == 1 ? '创建题目' : '编辑查阅'"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <div class="exercises-dialog-form">
        <el-form ref="dialogForm" :model="dialogForm" label-width="80px">
          <el-form-item class="input-normal" label="试卷名称">
            <el-input
              disabled
              v-model="testData.testName"
              size="small"
              placeholder="试卷名称"
            ></el-input>
          </el-form-item>
          <el-form-item class="input-normal" label="站点名称">
            <el-input
              disabled
              v-model="testData.siteName"
              size="small"
              placeholder="站点名称"
            ></el-input>
          </el-form-item>
          <el-form-item class="input-normal" label="题目类型">
            <el-input
              disabled
              v-model="testData.type"
              size="small"
              placeholder="题目类型"
            ></el-input>
          </el-form-item>
          <el-form-item class="input-normal" label="音频ID">
            <el-input
              v-model="dialogForm.issue.videoUrl"
              size="small"
              placeholder="音频ID"
            ></el-input>
          </el-form-item>
          <el-form-item class="input-normal" label="题目内容">
            <el-input
              v-model="dialogForm.issue.issuse"
              type="textarea"
              :rows="3"
            ></el-input>
          </el-form-item>
          <!-- 选项 -->
          <template v-if="dialogForm.issuesType == '单选题'">
            <el-form-item
              class="input-normal"
              size="small"
              v-for="item in dialogForm.issue.option"
              :key="item.name"
            >
            <i class="option">{{ item.name }}</i>

              <el-input v-model="item.value"></el-input>
            </el-form-item>
          </template>
          <!-- 选项 -->
          <el-form-item class="input-normal" label="答案解析">
            <el-input
              v-model="dialogForm.issue.textAnalysis"
              type="textarea"
              :rows="5"
            ></el-input>
          </el-form-item>
          <el-form-item class="input-small" label="正确答案">
            <el-input
              v-model="dialogForm.issue.answer"
              size="small"
              placeholder="正确答案"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="exercises-dialog-btn">
          <el-button @click="handleSubmit" type="primary" size="medium"
            >保存</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- 弹窗结束 -->

    <div class="exercises-handle">
      <el-button
        class="exercises-handle-create"
        @click="handleDialog(1)"
        type="primary"
        size="small"
        >创建题目</el-button
      >
      <div class="exercises-handle__form">
        <el-form ref="exercisesForm" :model="exercisesForm" width="500px">
          <el-form-item>
            <el-input
              v-model="exercisesForm.exercisesName"
              size="small"
              placeholder="题目名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              size="small"
              v-model="exercisesForm.exercisesStatus"
              placeholder="题目状态"
            >
              <el-option
                v-for="item in exercisesStatus"
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
    <div class="exercises-table">
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
        </template>
      </rd-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "examination-exercises",

  data() {
    return {
      // 抽屉显示
      drawerVisible: false,
      // 弹窗显示
      dialogVisible: false,
      // 弹窗操作的状态(1:创建 2:编辑)
      handleStatus: 1,
      // 试卷信息
      testData: {
        // 试卷名称
        testName: "吸水试卷",
        siteName: "吸水站点",
        type: "单选题",
      },
      // 弹窗表单
      dialogForm: {
        issuseId: 1,
        issue: {
          imageIssuse: "",
          videoUrl: "",
          answer: "B",
          imageAnalysis: "",
          issuse: "吸水性较大且可提高油脂性软膏中药物渗透性的基质是",
          videoId: "",
          textAnalysis:
            "羊毛脂又称无水羊毛脂，为淡黄色黏稠半固体，熔点36℃～42℃，因含胆甾醇、异胆甾醇与羟基胆甾醇及其酯而有较大的吸水性，可吸水150%、甘油140%、70%的乙醇40%。由于羊毛脂的组成与皮脂分泌物相近，故可提高软膏中药物的渗透性。常与凡士林合用，调节凡士林的渗透性和吸水性。",
          option: [
            {
              image: "",
              name: "A",
              value: "氢化植物油",
            },
            {
              image: "",
              name: "B",
              value: "羊毛脂",
            },
            {
              image: "",
              name: "C",
              value: "凡士林",
            },
            {
              image: "",
              name: "D",
              value: "液状石蜡",
            },
            {
              image: "",
              name: "E",
              value: "二甲硅油",
            },
          ],
        },
        issuesType: "单选题",
      },
      // 搜索表单
      exercisesForm: {
        // 题目名称
        exercisesName: "",
        // 题目状态
        exercisesStatus: "",
      },
      // 题目状态选项
      exercisesStatus: [
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
          value: "name",
        },
        {
          name: "站点名称",
          value: "site",
        },
        {
          name: "题目类型",
          value: "type",
        },
        {
          name: "序号",
          value: "sort",
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
      // handleDialog 1: 创建； 2： 查看编辑； 3： 删除
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
.option {
  position: absolute;
  left: -44px;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  text-align: center;
  line-height: 32px;
  background: #e9f4ff;
  border: 1px solid #409EFF;
  font-style: normal;
}
.exercises-x {
  width: 100%;
}
.exercises-dialog-form {
  .el-form-item {
    margin-bottom: 16px;
  }
  .input-normal {
    width: 85%;
  }
  .input-small {
    width: 200px;
  }
}
.exercises-dialog-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}
.exercises-handle {
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
.exercises-table {
  background: #fff;
  padding: 15px;
}
</style>
<template>
  <div class="project-list-x">
    <!-- 弹窗开始 -->
    <el-dialog
      width="30%"
      :title="handleStatus == 1 ? '创建项目' : '编辑查阅'"
      :visible.sync="visible"
    >
      <div class="project-dialog-form">
        <el-form ref="dialogForm" :model="dialogForm" label-width="80px">
          <el-form-item label="分类名称">
            <el-input
              v-model="dialogForm.type"
              size="small"
              placeholder="项目名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              size="small"
              v-model="dialogForm.status"
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
        <div class="project-dialog-btn">
          <el-button @click="handleSubmit" type="primary" size="medium"
            >保存</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- 弹窗结束 -->
    
    <div class="project-list-handle">
      <el-button @click="handleDialog(1)" type="primary" size="small"
        >创建项目</el-button
      >
      <div class="project-list-handle__form">
        <el-form ref="projectForm" :model="projectForm" width="500px">
          <el-form-item>
            <el-input
              v-model="projectForm.projectName"
              size="small"
              placeholder="项目名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              size="small"
              v-model="projectForm.projectStatus"
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
        <el-button @click="handleSreach" type="primary" size="small">搜索</el-button>
      </div>
    </div>
    <div class="project-list-table">
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
  name: "project-list",
  data() {
    return {
      // 弹窗显示
      visible: false,
      // 弹窗操作的状态(1:创建 2:编辑)
      handleStatus: 1,
      // 弹窗表单
      dialogForm: {
        // 分类名称
        type: "",
        // 状态
        status: "",
      },
      // 搜索表单
      projectForm: {
        // 项目名称
        projectName: "",
        // 项目状态
        projectStatus: "",
      },
      // 项目状态选项
      projectStatus: [
        {
          value: "选项1",
          label: "状态1",
        },
      ],
      tableData: [
        {
          id: 1,
          type: "分类分类分类分类",
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
          name: "分类名称",
          value: "type",
          width: 240,
        },
        {
          name: "显示状态",
          value: "status",
          width: 240,
        },
        {
          name: "创建时间",
          value: "time",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 140,
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
      switch (status) {
        case 1:
          /**
           * 新增
           */
          this.handleStatus = status;
          this.visible = true;
          break;
        case 2:
          /**
           * 编辑
           */
          console.log('编辑', row)
          this.handleStatus = status;
          this.visible = true;
          break;
        case 3:
          /**
           * 删除
           */
          console.log('删除', row)
          break;
      }
    },
    // 点击搜索按钮
    handleSreach() {
      console.log('搜索')
    },
    // 弹窗保存按钮
    handleSubmit() {
      console.log('保存')
    }
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.project-list-x {
  width: 100%;
}
.project-dialog-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}
.project-dialog-form {
  .el-form-item:nth-child(2) {
    width: 260px;
  }
}
.project-list-handle {
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
.project-list-table {
  background: #fff;
  padding: 15px;
}
</style>
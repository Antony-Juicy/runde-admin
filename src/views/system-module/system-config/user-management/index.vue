<template>
  <div>
    <!-- 搜索栏 -->
    <!-- 操作栏 -->
    <el-button type="primary" @click="add" v-btn-permission="'/admin/menu/save'">新增</el-button>
    <!-- 表格 -->
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :multiple="multiple"
      :loading="loading"
      :pageConfig="pageConfig"
      @select="handleSelect"
      @pageChange="pageChange"
    >
      <template slot="name" slot-scope="scope">
        <el-tag size="medium">{{ scope.row.name }}</el-tag>
      </template>
      <template slot="edit" slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-btn-permission="'/admin/menu/edit'"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          v-btn-permission="'/admin/menu/del'"
          >删除</el-button
        >
      </template>
    </rd-table>
    <!-- 新增/编辑 弹窗 -->
    <rd-dialog
      :title="dialogStatus ? '新增' : '编辑'"
      :dialogVisible="dialogVisible"
      @handleClose="handleClose('dataForm')"
      @submitForm="submitForm('dataForm')"
    >
      <el-form
        ref="dataForm"
        :model="basicInfo"
        :rules="rules"
        :label-width="formLabelWidth"
      >
        <el-form-item
          label="标题名称"
          prop="infoTitle"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="basicInfo.infoTitle"
            autocomplete="off"
            placeholder="请输入标题名称"
          />
        </el-form-item>
      </el-form>
    </rd-dialog>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      text: "",
      tableData: [
        {
          id:1,
          title: 111,
          pageName: 'yuu',
          classifyName:'微软'

        },
        {
          id:2,
          title: 111,
          pageName: 'yuu',
          classifyName:'微软'

        },
        {
          id:3,
          title: 111,
          pageName: 'yuu',
          classifyName:'微软'

        },
        {
          id:4,
          title: 111,
          pageName: 'yuu',
          classifyName:'微软'

        }
      ],
      tableKey: [
        {
          name: "id",
          value: "id",
          width: 80,
        },
        {
          name: "标题",
          value: "title",
        },
        {
          name: "归属页面",
          value: "pageName",
        },
        {
          name: "分类名称",
          value: "classifyName",
        },
        {
          name: "备注",
          value: "remark",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
        },
        {
          id:1,
          title: 111,
          pageName: 'yuu',
          classifyName:'微软'

        },
        {
          id:2,
          title: 111,
          pageName: 'yuu',
          classifyName:'微软'

        },
        {
          id:3,
          title: 111,
          pageName: 'yuu',
          classifyName:'微软'

        },
        {
          id:4,
          title: 111,
          pageName: 'yuu',
          classifyName:'微软'

        }
      ],
      multiple: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
      dialogVisible: false,
      dialogStatus: true,
      formLabelWidth: "120px",
      basicInfo: {
        infoTitle: "",
      },
      rules: {
        infoTitle: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
    };
  },
  mounted() {
    // this.getTableData();
  },
  methods: {
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      this.getTableData({
        currentPage: val.page,
        showCount: val.limit,
      });
    },
    getTableData(params) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch(
        "getInformationPage",
        params || {
          currentPage: 1,
          showCount: 10,
        }
      ).then((res) => {
        this.tableData = res.data.list;
        this.pageConfig.totalCount = res.data.count;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
    add() {
      for (const key in this.basicInfo) {
        this.basicInfo[key] = "";
      }
      this.dialogVisible = true;
      this.dialogStatus = true;
    },
    handleEdit(index, row) {
      this.basicInfo = {
        ...row,
      };
      this.dialogVisible = true;
      this.dialogStatus = false;
    },
    handleDelete(index, row) {
      console.log(index, row, "---");
    },
    handleClose(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.basicInfo, "提交");
          this.$message({
            message: "提交成功",
            type: "success",
          });
          // this.getTableData();
        }
      });
    },
  },
};
</script>


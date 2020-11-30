<template>
  <div class="role-wrapper">
    <div class="btn-wrapper">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="handleAdd"
        >添加角色</el-button
      >
    </div>
    <!-- 表格 -->
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :loading="loading"
      :fixedTwoRow="fixedTwoRow"
      :pageConfig="pageConfig"
      @select="handleSelect"
      @pageChange="pageChange"
    >
      <template slot="name" slot-scope="scope">
        <el-tag size="medium">{{ scope.row.name }}</el-tag>
      </template>
      <template slot="edit" slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="text" size="small"
          >编辑</el-button
        >
        <el-divider direction="vertical"></el-divider>
        <el-button
          @click="handleAuthority"
          type="text"
          size="small"
          style="color: #ec5b56"
          >配置权限</el-button
        >
      </template>
    </rd-table>
    <!-- 新增/编辑 弹窗 -->
    <rd-dialog
      :title="dialogStatus ? '新增角色' : '编辑角色'"
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
        <el-form-item label="编码" prop="code" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input
                v-model="basicInfo.code"
                autocomplete="off"
                placeholder="请点击获取编码"
                disabled
            /></el-col>
            <el-col :span="8"
              ><el-button type="primary" size="small" style="margin-left: 5px"
                @click="getCode"
                >获取编码</el-button
              ></el-col
            >
          </el-row>
        </el-form-item>
        <el-form-item
          label="名称"
          prop="roleName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="basicInfo.roleName"
            autocomplete="off"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
          <el-select v-model="basicInfo.status" placeholder="请选择状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
          <el-input
            v-model="basicInfo.remark"
            autocomplete="off"
            placeholder="请输入备注"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>
    </rd-dialog>
    <!-- 配置权限弹窗 -->
    <rd-dialog
      :title="'权限配置'"
      :dialogVisible="authorityVisible"
      @handleClose="handleCloseAuthority('authorityForm')"
      @submitForm="submitFormAuthority('authorityForm')"
    >
      <el-tree
        :data="treeData"
        :props="defaultProps"
        show-checkbox
        @node-click="handleNodeClick"
        class="authority-tree"
      >
      </el-tree>
    </rd-dialog>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      tabPosition: "left",
      text: "",
      tableData: [
        {
          id: 1,
          roleName: 111,
          status: 1,
          classifyName: "微软",
          remark:
            "看全国分校审批查看全国分校审批查看全国分,校审批查看全国分校审批,查看全国分校审批查,看全国分校审批查看全国分校审批查看全国分校审批查看全国分校审批查",
        },
        {
          id: 2,
          roleName: 111,
          status: 1,
          classifyName: "微软",
          remark: "abh瑟夫",
        },
      ],
      tableKey: [
        {
          name: "ID",
          value: "id",
          width: 80,
        },
        {
          name: "名称",
          value: "roleName",
        },
        {
          name: "状态",
          value: "status",
        },
        {
          name: "创建时间",
          value: "classifyName",
        },
        {
          name: "备注",
          value: "remark",
          showTooltip: true,
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 160,
        },
      ],
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
      dialogVisible: false,
      dialogStatus: true, //弹窗状态： true 新增 false 编辑
      formLabelWidth: "100px",
      basicInfo: {
        code: "",
        roleName: "",
        status: "",
        remark: "",
      },
      rules: {
        code: [{ required: true, message: "请获取编码", trigger: "blur" }],
        roleName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      options: [
        {
          label: "正常",
          value: 1,
        },
        {
          label: "暂停",
          value: 0,
        },
      ],
      // 配置权限
      authorityVisible: false,
      treeData: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  mounted() {
    console.log(666);
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
    // 打开新增弹窗
    handleAdd() {
      for (const key in this.basicInfo) {
        this.basicInfo[key] = "";
      }
      this.dialogVisible = true;
      this.dialogStatus = true;
    },
    // 打开编辑弹窗
    handleEdit(row) {
      this.basicInfo = {
        ...row,
      };
      this.dialogVisible = true;
      this.dialogStatus = false;
    },
    // 关闭
    handleClose(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    // 提交
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
    // -----配置权限弹窗的处理--------
    handleAuthority() {
      this.authorityVisible = true;
    },
    handleCloseAuthority(formName) {
      this.authorityVisible = false;
      this.$refs[formName].resetFields();
    },
    submitFormAuthority() {},
    handleNodeClick() {},

    // 获取编码
    getCode(){
      this.$fetch('system_getCode',{
        flagType: 2
      }).then(res => {
        this.basicInfo.code = res.data;
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.role-wrapper {
  background-color: #fff;
  padding: 20px;
  .btn-wrapper {
    margin-bottom: 16px;
  }
  .authority-tree {
    padding-left: 20px;
  }
  /deep/ {
    .el-input.is-disabled .el-input__inner {
          color: #767a82;
    }
  }
}
</style>
<template>
  <div class="view-detail">
    <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >添加</el-button
        >
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
        </template>
      </rd-table>
    </div>

    <!-- 添加 -->
    <rd-dialog
      :title="addStatus ? '添加' : '编辑'"
      :dialogVisible="addVisible"
      @handleClose="addVisible = false"
      @submitForm="submitAddForm('dataForm3')"
    >
      <RdForm
        :formOptions="addFormOptions"
        formLabelWidth="120px"
        :rules="addRules"
        ref="dataForm3"
      >
        <template slot="post">
          <el-button size="small" type="primary">上传</el-button>
        </template>
      </RdForm>
    </rd-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name: "view-detail",
  data() {
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "姓名",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "账号",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "联系电话",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "邮箱",
        },
        {
          prop: "menuName",
          placeholder: "用户类型",
          element: "el-select",
          options: [],
        },
        {
          prop: "menuName",
          placeholder: "状态",
          element: "el-select",
          options: [],
        },
      ],
      searchForm: {},
      emptyText: "暂无数据",
      tableData: [
        {
          id: 1,
          name: "飞翔的荷兰人3",
          phone: 1608897351706,
          email: "10726862755@qq.com",
          phone: "15692026183",
          usertype: "连锁负责人",
          chain:
            "海南分校 - 一心堂总部（云南分校谈判） 海南分校 - 海南一心堂（海南分校谈判）",
          status: "锁定",
        },
      ],
      tableKey: [
        {
          name: "ID",
          value: "id",
          fixed: "left",
          width: 80,
        },
        {
          name: "姓名",
          value: "name",
        },
        {
          name: "手机",
          value: "phone",
        },
        {
          name: "邮箱",
          value: "email",
        },
        {
          name: "用户类型",
          value: "usertype",
        },
        {
          name: "负责连锁",
          value: "chain",
          width: 600,
        },
        {
          name: "状态",
          value: "status",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 140,
          fixed: "right",
        },
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      addVisible: false,
      addFormOptions: [
        {
          prop: "campusVisible",
          element: "el-select",
          placeholder: "负责连锁",
          initWidth: true,
          multiple: true,
          label: "负责连锁",
          options: [],
          events: {},
          initValue: [37],
        },
        {
          prop: "name",
          element: "el-input",
          placeholder: "姓名",
          label: "姓名",
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "手机号码",
          label: "手机号码",
        },
        {
          prop: "password",
          element: "el-input",
          placeholder: "密码",
          label: "密码",
        },
        {
          prop: "email",
          element: "el-input",
          placeholder: "邮箱",
          label: "邮箱",
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择",
          label: "状态",
          options: [
            {
              label: "博士",
              value: "0",
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
      ],
      addRules: {
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ],
      },
      addStatus: true,
      editId: "",
    };
  },
  components: {
    RdForm,
  },
  methods: {
    onSearch(val) {
      this.searchForm = {
        ...val,
      };
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
    getTableData() {},
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleAdd() {
      this.addStatus = true;
      this.addVisible = true;
    },
    submitAddForm(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "提交");
        }
      });
    },
    handleEdit(data) {
      this.addStatus = false;
      this.addVisible = true;
      this.addFormOptions.forEach((item) => {
        item.initValue = data[item.prop];
      });
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);
      this.editId = data.id;
    },
    handleDelete(row) {
      let info = "";
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$fetch("projectType_delete", {
            id: row.id,
          }).then((res) => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              setTimeout(() => {
                this.getTableData();
              }, 50);
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.view-detail {
}
</style>

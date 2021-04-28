<template>
  <div class="destribe-class">
    <search-form
      :formOptions="formOptions" 
      :showNum="showNum"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container mt-15">
      <el-button type="primary" size="small" @click="handleAdd">
        +添加</el-button
      >
      <div class="mt-15">
        <rd-table
          :tableData="tableData"
          :tableKey="tableKey"
          :tbodyHeight="600"
          :pageConfig.sync="pageConfig"
          @pageChange="pageChange"
          :emptyText="emptyText"
        >
          <template slot="edit" slot-scope="scope">
            <el-button
              @click="handleEdit(scope.row, 1)"
              type="text"
              size="small"
            >
              编辑
            </el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button
              @click="handleEdit(scope.row, 2)"
              type="text"
              size="small"
            >
              删除
            </el-button>
          </template>
        </rd-table>
      </div>
    </div>
    <!-- 添加菜单弹窗 -->
    <rd-dialog
      :title="addStatus ? '添加菜单' : '编辑菜单'"
      :dialogVisible="distributeVisible"
      :showFooter="false"
      :width="'990px'"
      appendToBody
      @handleClose="distributeVisible = false"
    >
      <RdForm
        :formOptions="addFormOptions"
        formLabelWidth="140px"
        :rules="addRules"
        ref="dataForm3"
      >
        <template slot="describe">
          <el-input
            v-model.trim="dataForm.describe"
            type="textarea"
            placeholder="请输入项目描述"
            size="small"
          />
        </template>
      </RdForm>
      <div class="btn-wrapper" style="text-align: right; margin-top: 20px">
        <el-button
          type="primary"
          size="small"
          :loading="btnLoading"
          @click="handleSubmit('dataForm3')"
          v-prevent-re-click="2000"
          >保存</el-button
        >
      </div>
    </rd-dialog>
    <!-- 添加弹窗 -->
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import fullDialog from "@/components/FullDialog";
export default {
  name: "project-manage",
  components: {
    RdForm,
    fullDialog,
  },
  props: {},
  data() {
    return {
      detailId: "",
      editId: "",
      emptyText: "暂无数据",
      dataForm: {
        describe: "",
      },
      addStatus: true,
      distributeVisible: false,
      btnLoading: false,
      showNum: 4,
      searchForm: {},
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      formOptions: [
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入班型名称",
        },

        {
          prop: "courseName",
          element: "el-input",
          placeholder: "请输入班型名称",
        },
        {
          prop: "bookCode",
          element: "el-input",
          placeholder: "请输入图书编码",
        },
        {
          prop: "bookName",
          element: "el-input",
          placeholder: "请输入图书名称",
        },
      ],
      tableData: [
        {
          id: 1,
          classtId: "2223",
          className: "/",
          bookName: "2230",
          bookCode: "1122",
        },
      ],
      tableKey: [
        { name: "id", value: "id" },
        { name: "班型名称", value: "className" },
        { name: "课程名称", value: "courseName" },
        { name: "图书名称", value: "bookName" },
        { name: "图书编码", value: "bookCode" }, 
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 140, 
          fixed: "right",
        },
      ],
      addFormOptions: [
        {
          prop: "classtName",
          element: "el-input",
          placeholder: "请输入",
          label: "班型",
        },
        {
          prop: "courseName",
          element: "el-select",
          placeholder: "请选择",
          label: "课程",
          options: [],
        },
        {
          prop: "bookName",
          element: "el-select",
          placeholder: "请选择图书名称",
          label: "课程类型",
          options: [],
        },
      ],
      addRules: {
        classtName: [{ required: true, message: "请输入", trigger: "blur" }],
        courseName: [{ required: true, message: "请选择", trigger: "blur" }],
        bookName: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    refresh() {},
    handleSubmit(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "保存");
          //TODO
          this.$fetch(
            this.addStatus
              ? "secretexamsubject_add"
              : "secretexamsubject_editJsp",
            {
              ...formData,
              time: "",
              startTime: formData.time ? formData.time[0] : "",
              endTime: formData.time ? formData.time[1] : "",
              id: this.addStatus ? "" : this.editId,
            }
          ).then((res) => {
            this.$message.success("操作成功");
            this.distributeVisible = false;
            this.getTableData();
          });
        }
      });
    },
    onSearch(val) {
      this.searchForm = {
        ...val,
      };
      this.getTableData();
    },
    getTableData(params = {}) {
      //TODO  secretexamsubject_list
      this.$fetch("posterinfo_listJson", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.creatTime = this.$common._formatDates(item.createAt);
          return item;
        });
        this.pageConfig.totalCount = res.data.count;
      });
    },
    handleEnter() {},
    handleAdd() {
      this.distributeVisible = true;
      this.addStatus = true;
    },
    handleEdit(data, index) {
      if (index == 1) {
        //编辑
        this.addStatus = false;
        this.distributeVisible = true;
        this.editId = data.id;
        //TODO
        this.$fetch("secretexamsubject_goEdit", {
          id: data.id,
        }).then((res) => {
          this.addFormOptions.forEach((item) => {
            if (item.prop != "describe") {
              item.initValue = data[item.prop];
            }
            // item.initValue = res.data.pd[item.prop];
          });
          this.$refs.dataForm3.addInitValue();
          console.log(this.addFormOptions, "this.addFormOptions---");
        });
      } else if (index == 2) {
        let info = "";
        //删除
        this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            //   const res = await this.$fetch("projectType_delete", {
            //     typeId: row.typeId,
            //     loginUserId,
            //   }).then((res) => {
            //     if (res) {
            //       this.$message({
            //         message: "删除成功",
            //         type: "success",
            //       });
            //       setTimeout(() => {
            //         this.getTableData();
            //       }, 50);
            //     }
            //   });
          })
          .catch(() => {});
      } else {
        //重新同步
        this.$confirm(`确认重新同步编码?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            //   const res = await this.$fetch("projectType_delete", {
            //     typeId: row.typeId,
            //     loginUserId,
            //   }).then((res) => {
            //     if (res) {
            //       this.$message({
            //         message: "删除成功",
            //         type: "success",
            //       });
            //       setTimeout(() => {
            //         this.getTableData();
            //       }, 50);
            //     }
            //   });
          })
          .catch(() => {});
      }
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

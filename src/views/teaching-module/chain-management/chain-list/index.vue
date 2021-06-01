<template>
  <div class="chain-list">
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
        fixedTwoRow
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <!-- <el-divider direction="vertical"></el-divider> -->
          <!-- <el-button
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >删除</el-button
          > -->
        </template>
      </rd-table>
    </div>

    <!-- 添加 -->
    <rd-dialog
      :title="addStatus ? '添加' : '编辑'"
      :dialogVisible="addVisible"
      @handleClose="handleClose"
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
  name: "chain-list",
  data() {
    return {
      formOptions: [
        {
          prop: "chainName",
          element: "el-input",
          placeholder: "连锁姓名",
        },
        // {
        //   prop: "cooperationTime",
        //   element: "el-input",
        //   placeholder: "合作时长",
        // },
        {
          prop: "status",
          element: "el-select",
          placeholder: "连锁状态",
          options: [],
        },
      ],
      searchForm: {},
      emptyText: "暂无数据",
      tableData: [],
      tableKey: [
        {
          name: "id",
          value: "id",
          fixed: "left",
          width: 80,
        },
        {
          name: "连锁全称",
          value: "chainName",
        },
        {
          name: "简介",
          value: "introduction",
        },
        {
          name: "备注",
          value: "remark",
        },
        {
          name: "状态",
          value: "status",
        },
        // {
        //   name: "操作",
        //   value: "edit",
        //   operate: true,
        //   width: 140,
        //   fixed: "right",
        // },
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      addVisible: false,
      addFormOptions: [
        {
          prop: "chainName",
          element: "el-input",
          placeholder: "请输入名称",
          label: "连锁姓名",
        },
        {
          prop: "introduction",
          element: "el-input",
          placeholder: "请输入",
          label: "简介",
          type: "textarea",
          rows: 2,
        },
        {
          prop: "remark",
          element: "el-input",
          placeholder: "请输入",
          label: "备注",
          type: "textarea",
          rows: 2,
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择",
          label: "连锁状态",
          options: [
            {
              label: "正常",
              value: true,
            },
            {
              label: "暂停",
              value: false,
            },
          ],
        },
      ],
      addRules: {
        chainName: [{ required: true, message: "请输入", trigger: "blur" }],
        status: [{ required: true, message: "请输入", trigger: "change" }],
      },
      addStatus: true,
      editId: "",
    };
  },
  components: {
    RdForm,
  },
  mounted() {
    this.getformList();
    this.getTableData();
  },
  methods: {
    onSearch(val) {
      this.searchForm = {
        ...val,
      };
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
    handleClose() {
      this.addVisible = false;
      this.$refs.dataForm3.onReset();
    },
    getformList() {
      this.$fetch("chaininfo_goAdd", {}).then((res) => {
        this.addFormOptions[3].options = this.formOptions[1].options = res.data.statusList.map(
          (item) => ({
            label: item.value,
            value: item.key,
          })
        );
      });
    },
    getTableData(params = {}) {
      this.$fetch("chaininfo_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          return item;
        });
        this.pageConfig.totalCount = res.data.page.totalResult;
      });
    },
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
          let {chainName}  = formData
          console.log(formData, "提交");
          this.$fetch("chaininfo_checkChainExist",{
           chainName
          }).then((res) => {
            
            this.$fetch(
              this.addStatus ? "chaininfo_save" : "chaininfo_checkChainExist",
              {
                ...formData,
                id: this.addStatus ? "" : this.editId,
              }
            ).then((res) => {
              this.$message.success("操作成功");
              this.addVisible = false;
              this.$refs.dataForm3.onReset();
              this.getTableData();
            });
          });
        }
      });
    },
    handleEdit(data) {
      this.addStatus = false;
      this.addVisible = true;
      this.editId = data.id;
      this.addFormOptions.forEach((item) => {
        item.initValue = data[item.prop];
      });
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);
      this.editId = data.id;
    },
    handleDelete(row) {
      // let info = "";
      // this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
      //   .then(() => {
      //     this.$fetch("projectType_delete", {
      //       id: row.id,
      //     }).then((res) => {
      //       if (res) {
      //         this.$message({
      //           message: "删除成功",
      //           type: "success",
      //         });
      //         setTimeout(() => {
      //           this.getTableData();
      //         }, 50);
      //       }
      //     });
      //   })
      //   .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.chain-list {
}
</style>

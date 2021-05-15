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
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >删除</el-button
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
  name: "chain-list",
  data() {
    return {
      formOptions: [
        {
          prop: "chainName",
          element: "el-input",
          placeholder: "连锁姓名",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "合作时长",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "连锁状态",
          options: [],
        },
      ],
      searchForm: {},
      emptyText: "暂无数据",
      tableData: [
        {
          id: 1,
          name: "飞翔的荷兰人3",
          cutdown: 1608897351706,
          visit: 2,
          phone: "15692026183",
        },
      ],
      tableKey: [
        {
          name: "id",
          value: "id",
          fixed: "left",
          width: 80,
        },
        {
          name: "连锁全称",
          value: "staffName",
        },
        {
          name: "简介",
          value: "goodsName",
        },
        {
          name: "备注",
          value: "activityName",
        },
        {
          name: "状态",
          value: "posterName",
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
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入名称",
          label: "连锁姓名",
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "简介",
          type: "textarea",
          rows: 2,
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "备注",
          type: "textarea",
          rows: 2,
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "连锁状态",
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
        menuName3: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      addStatus: true,
      editId: "",
    };
  },
  components: {
    RdForm,
  },
  mounted() {
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
    getTableData(params = {}) {
      this.$fetch("chaininfo_listJsp", { 
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
          console.log(res,'res----1234')
        // this.tableData = res.data.list.map((item) => {
        //   item.playbackCn = item.playback ? "有" : "无";
        //   item.createAt = this.$common._formatDates(item.createAt);
        //   item.courseStartTime = this.$common._formatDates(
        //     item.courseStartTime
        //   );
        //   item.courseEndTime = this.$common._formatDates(item.courseEndTime);
        //   return item;
        // });
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
.chain-list {
}
</style>

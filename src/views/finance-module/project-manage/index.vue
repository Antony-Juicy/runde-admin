<template>
  <div class="project-manage">
    <search-form
      :formOptions="formOptions"
      :showNum="showNum"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container mt-15">
      <el-button type="primary" size="small" @click="handleAdd">
        +添加项目</el-button
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
          <template slot="projectName" slot-scope="scope">
            <el-button @click="detailVisible = true" type="text" size="small">{{
              scope.row.projectName
            }}</el-button>
          </template>
          <template slot="edit" slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="medium">
              编辑
            </el-button>
          </template>
        </rd-table>
      </div>
    </div>
    <!-- 添加弹窗 -->
    <rd-dialog
      :title="addStatus ? '添加' : '编辑'"
      :dialogVisible="distributeVisible"
      :showFooter="false"
      :width="'990px'"
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
          @click="handleAddClass('dataForm3')"
          v-prevent-re-click="2000"
          >添加</el-button
        >
      </div>
    </rd-dialog>
    <!-- 添加弹窗 -->
    <fullDialog
      v-model="detailVisible"
      title="医师"
      @change="detailVisible = false"
    >
      <subjectRecord
        ref="subjectRecord"
        @close="detailVisible = false"
        v-if="detailVisible"
        :id="detailId"
      />
    </fullDialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import fullDialog from "@/components/FullDialog";
import subjectRecord from "./subject";
export default {
  name: "project-manage",
  components: {
    RdForm,
    fullDialog,
    subjectRecord,
  },
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
      showNum: 2,
      searchForm: {},
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      formOptions: [
        {
          prop: "project",
          element: "el-select",
          placeholder: "请选择项目",
        },
        {
          prop: "projectType",
          element: "el-select",
          placeholder: "请选择类型",
        },
      ],
      tableData: [
        {
          id: 1,
          projectName: "医师",
          tecTime: "/",
          TheoryTestTime: "10-30",
          closeTime: "11-30",
          status: "正常",
          creatTime: "2021-2.-1 09：32",
        },
      ],
      tableKey: [
        { name: "id", value: "id" },
        { name: "项目名", value: "projectName", operate: true },
        { name: "技能考试时间", value: "tecTime" },
        { name: "理论考试时间", value: "TheoryTestTime" },
        { name: "关课时间", value: "closeTime" },
        { name: "状态", value: "status" },
        { name: "创建时间", value: "creatTime" },
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
          prop: "project",
          element: "el-input",
          placeholder: "请输入项目名称",
          label: "项目",
        },
        {
          prop: "projectNum",
          element: "el-input",
          placeholder: "请输入项目编号",
          label: "项目编号",
        },
        {
          prop: "describe",
          element: "el-input",
          placeholder: "请输入项目描述",
          operate: true,
          label: "项目描述",
        },
        {
          prop: "status",
          element: "el-radio",
          placeholder: "请选择状态",
          label: "状态：",
          options: [
            {
              label: "正常",
              value: "Open",
            },
            {
              label: "暂停",
              value: "Close",
            },
          ],
          initValue: "Open",
        },
        {
          prop: "oneCategories",
          element: "el-select",
          placeholder: "请选择",
          label: "一级类目",
          options: [],
        },
        {
          prop: "twoCategories",
          element: "el-select",
          placeholder: "请选择",
          label: "二级类目",
          options: [],
        },
      ],
      addRules: {
        project: [{ required: true, message: "请输入", trigger: "blur" }],
        projectNum: [{ required: true, message: "请输入", trigger: "blur" }],
        //  describe: [
        //   { required: true, message: "请输入", trigger: "blur" },
        // ],
        status: [{ required: true, message: "请选择", trigger: "blur" }],
        oneCategories: [{ required: true, message: "请选择", trigger: "blur" }],
        twoCategories: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      detailVisible: false,
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    refresh() {},
    handleAddClass(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "添加");
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
    handleEdit(data) {
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

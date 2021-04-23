<template>
  <div class="project-manage">
    <search-form
      :formOptions="formOptions"
      :showNum="showNum"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container mt-15">
      <el-button type="primary" size="small" @click="handleAdd">
        +添加科目</el-button
      >
      <div class="mt-15">
        <rd-table
          :tableData="tableData"
          :tableKey="tableKey"
          :tbodyHeight="600"
          :pageConfig.sync="pageConfig"
          @pageChange="pageChange"
        >
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
      :title="addStatus ? '添加科目' : '编辑科目'"
      :dialogVisible="addVisible"
      :showFooter="false"
      :width="'990px'"
      appendToBody
      @handleClose="addVisible = false"
    >
      <RdForm
        :formOptions="addFormOptions"
        formLabelWidth="140px"
        :rules="addRules"
        ref="dataForm3"
      >
        <template slot="endTime">
          <el-form-item>
            <el-date-picker
              style="margin-right: 30px"
              v-model="basicInfo.endTime"
              type="datetime"
              placeholder="选择日期时间"
              :picker-options="startDateDisabled"
            >
            </el-date-picker>
            <el-checkbox v-model="basicInfo.checked1">技能考试</el-checkbox>
            <el-checkbox v-model="basicInfo.checked2">理论二考</el-checkbox>
          </el-form-item>
        </template>
        <template slot="secondEndTime">
          <el-date-picker
            style="margin-right: 30px"
            v-model="basicInfo.secondEndTime"
            type="datetime"
            placeholder="关闭课程时间"
            :picker-options="startDateDisabled"
          ></el-date-picker>
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
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name: "project-manage",
  components: {
    RdForm,
  },
  data() {
    return {
      startDateDisabled: {},
      addVisible: false,
      addStatus: true,
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
          subjectName: "医师",
          tecTime: "/",
          TheoryTestTime: "10-30",
          closeTime: "11-30",
          status: "正常",
          creatTime: "2021-2.-1 09：32",
        },
      ],
      tableKey: [
        { name: "id", value: "id" },
        { name: "科目名", value: "subjectName" },
        { name: "所属项目", value: "SubProject" },
        { name: "技能考试时间", value: "tecTime" },
        { name: "理论考试时间", value: "TheoryTestTime" },
        { name: "理论考试关课时间", value: "closeTime" },
        { name: "理论二考时间", value: "TwotestTime" },
        { name: "理论二考关课时间", value: "TwotestcloseTime" },
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
          element: "el-select",
          placeholder: "请选择",
          label: "项目",
          options: [],
        },
        {
          prop: "subjectName",
          element: "el-input",
          placeholder: "请输入",
          label: "科目名称",
        },
        {
          prop: "subjectNumber",
          element: "el-input",
          placeholder: "请输入",
          label: "科目编号",
        },
        {
          prop: "testTime",
          element: "el-date-picker",
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
          label: "理论考试时间",
        },
        {
          prop: "endTime",
          element: "el-date-picker",
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
          label: "理论考试关课时间",
          operate: true,
        },
        {
          prop: "tectestTime",
          element: "el-date-picker",
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
          label: "技能考试时间",
        },
        {
          prop: "secondtestTime",
          element: "el-date-picker",
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
          label: "理论二考时间",
        },
        {
          prop: "secondEndTime",
          element: "el-date-picker",
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
          label: "理论二考关课时间",
          operate: true,
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
          prop: "threeCategories",
          element: "el-select",
          placeholder: "请选择",
          label: "三级类目",
          options: [],
        },
      ],
      addRules: {},
      basicInfo: {
        endTime: "",
        checked1: false,
        checked2: true,
        tectestTime: "",
        secondtestTime: "",
        secondEndTime: "",
      },
    };
  },
  created() {
    // 限制开始日期不能超过当前日期
    this.startDateDisabled.disabledDate = function (time) {
      return time.getTime() + 24 * 3600 * 1000 < Date.now();
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    handleEdit(data) {
      //TODO
      console.log(77555);
      this.addStatus = false;
      this.addVisible = true;
      //TODO
      this.$fetch("secretexamsubject_goEdit", {
        id: data.id,
      }).then((res) => {
        this.addFormOptions.forEach((item) => {
          // if (item.prop != "describe") {
          //   item.initValue = data[item.prop];
          // }
          // item.initValue = res.data.pd[item.prop];
        });
        this.$refs.dataForm3.addInitValue();
        console.log(this.addFormOptions, "this.addFormOptions---");
      });
    },
    handleAddClass(formName) {
      //TODO
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
    handleAdd() {
      this.addVisible = true;
      this.addStatus = true;
    },
    onSearch(val) {
      this.searchForm = {
        ...val,
      };
      this.getTableData();
    },
    getTableData(params = {}) {
      // this.$fetch("posterinfo_listJson", {
      //   ...this.pageConfig,
      //   ...this.searchForm,
      //   ...params,
      // }).then((res) => {
      //   this.tableData = res.data.data.map((item) => {
      //     item.creatTime = this.$common._formatDates(item.createAt);
      //     return item;
      //   });
      //   this.pageConfig.totalCount = res.data.count;
      // });
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

<template>
  <div class="net-class">
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
            <el-button @click="handleEdit(scope.row)" type="text" size="medium">
              编辑
            </el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button
              @click="handleDelete(scope.row)"
              type="text"
              size="small"
              style="color: #ec5b56"
              >删除</el-button
            >
            <el-divider direction="vertical"></el-divider>
            <el-button
              @click="handleSync(scope.row)"
              type="text"
              size="small"
              style="color: #ffa500"
              >重新同步</el-button
            >
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
      v-if="distributeVisible"
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
  props: {
    classTypeId: {
      type: String | Number,
      default: "",
    },
    classTypeName: {
      type: String,
      default: "",
    },
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
      showNum: 5,
      searchForm: {},
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      formOptions: [
        {
          prop: "courseId",
          element: "el-select",
          placeholder: "请选择课程",
          options: [],
        },
        {
          prop: "codeType",
          element: "el-select",
          placeholder: "请选择编码类型",
          options: [],
        },
        {
          prop: "courseType",
          element: "el-select",
          placeholder: "请选择课程类型",
          options: [],
        },
        {
          prop: "courseSort",
          element: "el-select",
          placeholder: "请选择课程分类",
          options: [],
        },
        {
          prop: "synStatus",
          element: "el-select",
          placeholder: "请选择同步状态",
          options: [],
        },
      ],
      tableData: [
        {
          id: 1,
          classtName: "医师",
          courseName: "/",
          courseCoding: "10-30",
          courseType: "11-30",
          courseClassify: "正常",
          startTime: "2021-2.-1 09：32",
          endTime: "2021-2.-1 09：32",
          status: "状态",
        },
      ],
      tableKey: [
        { name: "id", value: "id", width: 80 },
        { name: "班型名称", value: "classTypeName" },
        { name: "课程名称", value: "courseName" },
        { name: "班型内容名称", value: "contentName" },
        { name: "编码类型", value: "codeType" },
        { name: "课程编码", value: "courseCode" },
        { name: "课程类型", value: "courseType" },
        { name: "课程分类", value: "courseSort" },
        // { name: "开始时间", value: "startTime" },
        // { name: "结束时间", value: "endTime" },
        { name: "同步状态", value: "synStatus" },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 190,
          fixed: "right",
        },
      ],
      addFormOptions: [
        {
          prop: "classTypeName",
          element: "el-input",
          placeholder: "请输入",
          label: "班型",
          readonly: true,
          tag: 1,
        },
        {
          prop: "contentId",
          element: "el-select",
          placeholder: "请选择",
          label: "班型内容",
          disabled: true,
          tag: 1,
        },
        {
          prop: "courseId",
          element: "el-select",
          placeholder: "请选择",
          label: "课程",
          options: [],
          disabled: true,
          tag: 1,
        },
        {
          prop: "codeType",
          element: "el-radio",
          placeholder: "请输入编码类型",
          label: "编码类型",
          options: [],
          disabled: true,
          tag: 1,
        },
        {
          prop: "courseCode",
          element: "el-input",
          placeholder: "请输入课程编码",
          label: "课程编码",
          readonly: true,
          tag: 1,
          // hide: true,
        },

        {
          prop: "courseType",
          element: "el-radio",
          placeholder: "请选择",
          label: "课程类型",
          options: [],
        },
        {
          prop: "courseSort",
          element: "el-radio",
          placeholder: "请选择",
          label: "课程分类",
          options: [],
        },
      ],
      addRules: {
        classTypeName: [{ required: true, message: "请输入", trigger: "blur" }],
        contentId: [{ required: true, message: "请输入", trigger: "change" }],
        courseId: [{ required: true, message: "请选择", trigger: "change" }],
        codeType: [{ required: true, message: "请选择", trigger: "change" }],
        courseCode: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: this.checkData, trigger: "blur" },
        ],
        courseType: [{ required: true, message: "请选择", trigger: "change" }],
        courseSort: [{ required: true, message: "请选择", trigger: "change" }],
      },
      classTypeArr: [],
      courseListArr: [],
      courseSortListArr: [],
      synStatusListArr: [],
      codeTypeListArr: [],
      contentListArr: [],
    };
  },
  mounted() {
    this.getTableData();
    this.getSelectList();
  },
  methods: {
    refresh() {},
    checkData(rule, value, callback) {
      if (value) {
        if (/[\u4E00-\u9FA5]/g.test(value)) {
          callback(new Error("不能为中文!"));
        } else {
          callback();
        }
      }
      callback();
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "保存", this.classTypeArr, this.contentListArr);
          const { courseId, contentId } = formData;
          let courseName = this.classTypeArr.find(
            (item) => item.value == courseId
          ).label;

          let contentName = this.contentListArr.find(
            (item) => item.value == contentId
          ).label;
          this.$fetch(
            this.addStatus
              ? "courseclasstypemiddle_save"
              : "courseclasstypemiddle_editJsp",
            {
              ...formData,
              id: this.addStatus ? "" : this.editId,
              classTypeId: this.classTypeId,
              courseName,
              contentName,
              courseCode:
                formData.courseCode == "无" ? "" : formData.courseCode,
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
      let courseName =
        this.classTypeArr &&
        this.classTypeArr.length > 0 &&
        this.searchForm.courseId
          ? this.classTypeArr.find(
              (item) => item.value == this.searchForm.courseId
            ).label
          : "";
      this.$fetch("courseclasstypemiddle_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        classTypeId: this.classTypeId,
        courseName,
      }).then((res) => {
        this.tableData = res.data.dataJson.list.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.startTime = this.$common._formatDates(item.startTime);
          item.endTime = this.$common._formatDates(item.endTime);
          if (!item.courseCode) {
            item.courseCode = "无";
          }
          return item;
        });
        // this.pageConfig.totalCount = res.data.page.totalResult;
      });
    },
    handleEnter() {},
    getSelectList() {
      this.$fetch("courseclasstypemiddle_goAddWindows", {
        classTypeId: this.classTypeId,
      }).then((res) => {
        const {
          classType,
          courseList,
          courseSortList,
          synStatusList,
          codeTypeList,
          contentList,
        } = res.data;
        this.classTypeArr = classType.map((item) => ({
          label: item.courseName,
          value: item.courseId,
        }));
        this.addFormOptions[2].options = this.classTypeArr;
        this.contentListArr = this.addFormOptions[1].options = contentList.map(
          (item) => ({
            label: item.contentName,
            value: item.id,
          })
        );
        this.formOptions[0].options = this.classTypeArr;
        this.courseListArr = courseList.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        this.addFormOptions[5].options = this.formOptions[2].options = this.courseListArr;

        this.synStatusListArr = synStatusList.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        this.codeTypeListArr = codeTypeList.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        this.courseSortListArr = courseSortList.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        this.addFormOptions[6].options = this.courseSortListArr;
        this.formOptions[3].options = this.courseSortListArr;
        this.formOptions[4].options = this.synStatusListArr;
        this.addFormOptions[3].options = this.formOptions[1].options = this.codeTypeListArr;
        // this.addFormOptions[3].events = {
        //   change: this.codeChange,
        // };
      });
    },
    // codeChange(val) {
    //   //编码类型
    //   if (val == "Live") {
    //     this.addFormOptions[4].hide = false;
    //   } else {
    //     this.addFormOptions[4].hide = true;
    //   }
    // },
    handleAdd() {
      this.distributeVisible = true;
      this.addStatus = true;
      // this.addFormOptions[4].hide = true;
      this.addFormOptions.forEach((item) => {
        item.initValue = "";
        if (item.prop == "classTypeName") {
          item.initValue = this.classTypeName;
        } else {
          item.readonly = false;
          item.disabled = false;
        }
      });
      setTimeout(() => {
        this.$refs.dataForm3.resetFields();
        this.$refs.dataForm3.addInitValue();
      }, 0);
    },
    handleEdit(data) {
      // if (data.codeType_text == "Live") {
      //   //编码类型為直播
      //   this.addFormOptions[4].hide = false;
      // } else {
      //   this.addFormOptions[4].hide = true;
      // }
      this.addFormOptions.forEach((item) => {
        if (item.tag == 1) {
          if (item.readonly != undefined) {
            item.readonly = true;
          }
          if (item.disabled != undefined) {
            item.disabled = true;
          }
        }
      });
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);
      this.addStatus = false;
      this.distributeVisible = true;
      this.editId = data.id;
      // this.$fetch("courseclasstypemiddle_goEdit", {
      //   id: data.id,
      // }).then((res) => {
      //   this.addFormOptions.forEach((item) => {
      //     item.initValue = res.data.classType[0].pd[item.prop];
      //   });
      //   this.$refs.dataForm3.addInitValue();
      // });
      this.addFormOptions.forEach((item) => {
        if (
          item.prop == "codeType" ||
          item.prop == "courseSort" ||
          item.prop == "courseType"
        ) {
          item.initValue = data[`${item.prop}_text`];
        } else {
          item.initValue = data[item.prop];
        }
      });
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleDelete(row) {
      let info = "";
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$fetch("courseclasstypemiddle_deleteJsp", {
            id: row.id,
            codeType: row.codeType_text,
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
    handleSync(row) {
      let info = "";
      this.$confirm(`确认重新同步编码？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$fetch("courseclasstypemiddle_synCourseLiveCode", {
            key: row.id,
            codeType: row.codeType_text,
          }).then((res) => {
            if (res) {
              this.$message({
                message: "操作成功",
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
</style>

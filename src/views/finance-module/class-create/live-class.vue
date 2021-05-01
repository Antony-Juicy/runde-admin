<template>
  <div class="live-class">
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
      default: 211
    },
    classTypeName: {
      type: String,
      default: "终极保过班【网课】"
    }
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
      showNum: 4,
      searchForm: {},
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      formOptions: [
        {
          prop: "liveCode",
          element: "el-input",
          placeholder: "请输入直播编号",
        },
        {
          prop: "admissionsBatch",
          element: "el-input",
          placeholder: "请输入批次",
        },
        {
          prop: "courseType",
          element: "el-select",
          placeholder: "请选择课程类型",
          options: []
        },
        {
          prop: "synStatus",
          element: "el-select",
          placeholder: "请选择同步状态",
          options: []
        },
      ],
      tableData: [
        {
          id: 1,
          classtId: "2223",
          className: "/",
          batch: "2230",
          courseId: "1122",
          courseName: "/222",
          liveCode: "正常",
          courseClassify: "222",
          syncStatus: "2正常",
        },
      ],
      tableKey: [
        { name: "id", value: "id",width: 80 },
        { name: "班型ID", value: "classTypeId" },
        { name: "班型名称", value: "classTypeName" },
        { name: "批次", value: "admissionsBatch" },
        { name: "课程ID", value: "courseId" },
        { name: "课程名称", value: "courseName" },
        { name: "直播编码", value: "liveCode" },
        { name: "课程类型", value: "courseType" },
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
          readonly: true
        },
        {
          prop: "courseId",
          element: "el-select",
          placeholder: "请选择",
          label: "课程",
          options: [],
        },
        {
          prop: "courseType",
          element: "el-select",
          placeholder: "请选择课程类型",
          label: "课程类型",
          options: [],
        },

        {
          prop: "liveCode",
          element: "el-input",
          placeholder: "请输入",
          label: "直播编码",
          options: [],
        },
        {
          prop: "campusJson",
          element: "el-select",
          placeholder: "校区",
          label: "校区",
          options: [],
          filterable: true,
          multiple: true
        },
      ],
      addRules: {
        classtName: [{ required: true, message: "请输入", trigger: "blur" }],
        courseName: [{ required: true, message: "请选择", trigger: "blur" }],
        courseClassify: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        courseType: [{ required: true, message: "请选择", trigger: "blur" }],
        campusName: [{ required: true, message: "请选择", trigger: "blur" }],
      },
       classTypeArr: [],
      courseListArr: [],
      campusListArr: []
    };
  },
  mounted() {
    this.getTableData();
    this.getSelectList();
  },
  methods: {
    getSelectList(){
      this.$fetch("courseclasstypelivecode_goAddWindows",{
        classTypeId: this.classTypeId
      }).then(res => {
        const { classType , courseList, campusList, syncList }  = res.data;
        this.classTypeArr = classType.map(item => ({
          label: item.courseName,
          value: item.courseId
        }));
        this.addFormOptions[1].options = this.classTypeArr;
        // this.formOptions[2].options = this.classTypeArr;
        this.courseListArr = courseList.map(item => ({
          label: item.value,
          value: item.key
        }));
        this.addFormOptions[2].options =  this.courseListArr;
        this.formOptions[2].options =  this.courseListArr;
        this.campusListArr = campusList.map(item => ({
          label: item.campusName,
          value: item.id
        }));
        this.addFormOptions[4].options =  this.campusListArr;
        this.formOptions[3].options =  syncList.map(item => ({
          label: item.value,
          value: item.key
        }))
      })
    },
    refresh() {},
    handleSubmit(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "保存");
          const { campusJson,courseId } = formData;
          let campusArr = [],courseName;
          this.campusListArr.forEach(item => {
            let obj = campusJson.find(ele => (ele == item.value));
            if(obj) {
              campusArr.push({
                name: item.label,
                val: item.value
              })
            }
          })
          courseName = this.classTypeArr.find(item => (item.value == courseId)).label;
          //TODO
          this.$fetch(
            this.addStatus
              ? "courseclasstypelivecode_save"
              : "courseclasstypelivecode_editJsp",
            {
              ...formData,
              id: this.addStatus ? "" : this.editId,
              campusJson: campusJson.join(","),
              campus: JSON.stringify(campusArr),
              courseName,
              classTypeId: this.classTypeId,
              classTypeName: this.classTypeName
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
      this.$fetch("courseclasstypelivecode_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
         classTypeId: this.classTypeId
      }).then((res) => {
        this.tableData = res.data.list.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          return item;
        });
        this.pageConfig.totalCount = res.data.pager.totalRows;
      });
    },
    handleEnter() {},
    handleAdd() {
      this.distributeVisible = true;
      this.addStatus = true;
      
      this.addFormOptions.forEach((item) => {
        item.initValue = "";
        if(item.prop == "classTypeName"){
          item.initValue =this.classTypeName;
        }
      });
      setTimeout(() => {
        this.$refs.dataForm3.resetFields();
        this.$refs.dataForm3.addInitValue();
      }, 0);
    },
    handleEdit(data) {
        //编辑
        this.addStatus = false;
        this.distributeVisible = true;
        this.editId = data.id;
        //TODO
        this.$fetch("courseclasstypelivecode_goEdit", {
          id: data.id,
        }).then((res) => {
          this.addFormOptions.forEach((item) => {
            item.initValue = res.data.pd[item.prop];
            if(item.prop == "campusJson"){
              item.initValue = res.data.pd.campusJson.split(",")
            }
          });
          this.$refs.dataForm3.addInitValue();
        });
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleDelete(row) {
      let info = '';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$fetch("courseclasstypelivecode_deleteJsp", {
            id: row.id
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
      let info = '';
      this.$confirm(`确认重新同步编码？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$fetch("courseclasstypemiddle_synCourseLiveCode", {
            key: row.id,
            synType: "Live"
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
    }
  },
};
</script>

<style lang="scss" scoped>
</style>

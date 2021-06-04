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
              @click="handleEdit(scope.row)"
              type="text"
              size="small"
            >
              编辑
            </el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button
              @click="handleDelete(scope.row)"
              type="text"
              size="small"
              style="color: #ec5b56"
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
          prop: "classTypeName",
          element: "el-input",
          placeholder: "请输入班型名称",
        },

        {
          prop: "courseName",
          element: "el-input",
          placeholder: "请输入课程名称",
        },
        {
          prop: "bookSn",
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
        // {
        //   id: 1,
        //   classtId: "2223",
        //   className: "/",
        //   bookName: "2230",
        //   bookCode: "1122",
        // },
      ],
      tableKey: [
        { name: "id", value: "id",width: 80 },
        { name: "班型名称", value: "classTypeName" },
        { name: "课程名称", value: "courseName" },
        { name: "图书名称", value: "bookName" },
        { name: "图书编码", value: "bookSn" }, 
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
          prop: "bookId",
          element: "el-select",
          placeholder: "请选择图书名称",
          label: "图书名称",
          options: [],
        },
      ],
      addRules: {
        classTypeName: [{ required: true, message: "请输入", trigger: "blur" }],
        courseId: [{ required: true, message: "请选择", trigger: "change" }],
        bookId: [{ required: true, message: "请选择", trigger: "change" }],
      },
      classTypeArr: [],
      bookInfoListArr: []
    };
  },
  mounted() {
    this.getTableData();
    this.getSelectList();
  },
  methods: {
    refresh() {},
    handleSubmit(formName) {
      this.$refs[formName].validate(async (valid, formData) => {
        if (valid) {
          console.log(formData, "保存");
          const { courseId, bookId } = formData;
          let courseName = this.classTypeArr.find(item => (item.value == courseId)).label;
          let bookName = this.bookInfoListArr.find(item => (item.value == bookId)).label;
          let param = {
              ...formData,
              id: this.addStatus ? "" : this.editId,
              classTypeName: this.classTypeName,
              classTypeId: this.classTypeId,
              courseName,
              bookName,
              bookSn: bookName.split("/")[1]
            };
          //TODO
          // 检查是否存在相同记录
          const result = await this.$fetch("bookclasstypecoursemiddle_checkByClassTypeCourseBookId",param);
          if(result.code == 200){
            const res = await this.$fetch(this.addStatus?"bookclasstypecoursemiddle_save":"bookclasstypecoursemiddle_editJsp",param);
            if(res.code == 200){
               this.$message.success("操作成功");
               this.distributeVisible = false;
               this.getTableData();
            }
          }
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
      this.$fetch("bookclasstypecoursemiddle_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        classTypeId: this.classTypeId
      }).then((res) => {
        this.tableData = res.data.varList.list.map((item) => {
          item.creatTime = this.$common._formatDates(item.createAt);
          return item;
        });
        this.pageConfig.totalCount = res.data.varList.pager.totalRows;
      });
    },
    handleEnter() {},
    getSelectList(){
      this.$fetch("bookclasstypecoursemiddle_goAddWindows",{
        classTypeId: this.classTypeId
      }).then(res => {
        
        const { bookInfoList, classType}  = res.data;
        this.classTypeArr = classType.map(item => ({
          label: item.courseName,
          value: item.courseId
        }));
        this.addFormOptions[1].options = this.classTypeArr;
        this.bookInfoListArr = bookInfoList.map(item => ({
          label: `${item.bookName}/${item.bookSn}`,
          value: item.id
        }));
        this.addFormOptions[2].options =  this.bookInfoListArr;
      })
    },
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
      this.addStatus = false;
      this.distributeVisible = true;
      this.editId = data.id;
      //TODO
      this.$fetch("bookclasstypecoursemiddle_goEdit", {
        id: data.id,
      }).then((res) => {
        this.addFormOptions.forEach((item) => {
          item.initValue = res.data.model[item.prop];
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
          this.$fetch("bookclasstypecoursemiddle_deleteJsp", {
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
  },
};
</script>

<style lang="scss" scoped>
</style>

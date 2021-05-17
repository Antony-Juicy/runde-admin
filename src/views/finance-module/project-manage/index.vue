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
          <template slot="productName" slot-scope="scope">
            <el-button
              @click="handleOpen(scope.row)"
              type="text"
              size="medium"
              >{{ scope.row.productName }}</el-button
            >
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
      @handleClose="closeEdit()"
    >
      <RdForm
        :formOptions="addFormOptions"
        formLabelWidth="140px"
        :rules="addRules"
        ref="dataForm3"
      >
        <template slot="productDetail">
          <el-input
            v-model.trim="dataForm.productDetail"
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
          >添加</el-button
        >
      </div>
    </rd-dialog>
    <!-- 添加弹窗 -->
    <fullDialog
      v-model="detailVisible"
      :title="title"
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
      title: "",
      detailId: "",
      editId: "",
      emptyText: "暂无数据",
      dataForm: {
        productDetail: "",
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
          prop: "productName",
          element: "el-select",
          placeholder: "请选择项目",
          options: [],
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择状态",
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
          events: {},
        },
      ],
      tableData: [
        // {
        //   id: 1,
        //   productName: "医师",
        //   tecTime: "/",
        //   TheoryTestTime: "10-30",
        //   closeTime: "11-30",
        //   status: "正常",
        //   createAt: "2021-2.-1 09：32",
        // },
      ],
      tableKey: [
        { name: "id", value: "id" },
        { name: "项目名", value: "productName", operate: true },
        { name: "备注", value: "productDetail" },
        { name: "状态", value: "status" },
        { name: "创建时间", value: "createAt" },
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
          prop: "productName",
          element: "el-input",
          placeholder: "请输入项目名称",
          label: "项目",
        },
        {
          prop: "productNumber",
          element: "el-input",
          placeholder: "请输入项目编号",
          label: "项目编号",
        },
        {
          prop: "productDetail",
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
              value: true,
            },
            {
              label: "暂停",
              value: false,
            },
          ],
        },
        {
          prop: "financeCodeName1",
          element: "el-select",
          placeholder: "请选择",
          label: "一级类目",
          options: [],
        },
        {
          prop: "financeCodeName2",
          element: "el-select",
          placeholder: "请选择",
          label: "二级类目",
          options: [],
        },
      ],
      addRules: {
        productName: [{ required: true, message: "请输入", trigger: "blur" }, { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
        productNumber: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: this.checkData, trigger: "blur" },
        ],
        //  productDetail: [
        //   { required: true, message: "请输入", trigger: "blur" },
        // ],
        status: [{ required: true, message: "请选择", trigger: "change" }],
        financeCodeName1: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        financeCodeName2: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
      detailVisible: false,
      financeCode1List: [], //一级类目
      financeCode2List: [], //二级类目
    };
  },
  mounted() {
    this.getTableData();
    this.getSelectList();
  },
  methods: {
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
    closeEdit() {
      //
      this.distributeVisible = false;
      this.$refs.dataForm3.onReset();
      this.dataForm.productDetail = "";
    },
    handleOpen(data) {
      //open科目
      this.detailId = data.id;
      this.title = data.productName;
      this.detailVisible = true;
    },
    refresh() {},
    handleSubmit(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "添加", this.addFormOptions[4].options);
          let financeCode1, financeCode2;
          let obj1 = this.addFormOptions[4].options.find(
            (item) => item.value == formData.financeCodeName1
          );
          financeCode1 = obj1 && obj1.financeCode1;
          let obj2 = this.addFormOptions[5].options.find(
            (item) => item.value == formData.financeCodeName2
          );
          financeCode2 = obj2 && obj2.financeCode2;
          this.$fetch(
            this.addStatus ? "courseProduct_save" : "courseProduct_editJsp",
            {
              ...formData,
              financeCode1,
              financeCode2,
              id: this.addStatus ? "" : this.editId,
            }
          ).then((res) => {
            this.$message.success("操作成功");
            this.distributeVisible = false;
            this.$refs.dataForm3.onReset();
            this.dataForm.productDetail = "";
            this.getTableData();
          });
        }
      });
    },
    onSearch(val) {
      this.searchForm = {
        ...val,
      };
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
    getSelectList() {
      //项目
      this.$fetch("courseProduct_listJsp").then((res) => {
        this.formOptions[0].options = res.data.productList.map((item) => ({
          label: item.productName,
          value: item.id,
        }));
      });
      //一级、二级类目
      this.$fetch("courseProduct_goAdd").then((res) => {
        this.financeCode1List = res.data.financeCode1List.map((item) => ({
          label: item.value,
          value: item.value,
          financeCode1: item.key,
        }));
        this.financeCode2List = res.data.financeCode2List.map((item) => ({
          label: item.value,
          value: item.value,
          financeCode2: item.key,
        }));

        this.addFormOptions[4].options = this.financeCode1List;
        this.addFormOptions[5].options = this.financeCode2List;
      });
    },
    getTableData(params = {}) {
      // TODO  secretexamsubject_list
      let { productName } = this.searchForm;
      let productId = productName;

      delete this.searchForm.productName;

      let params1 = { ...this.searchForm, productId: productId };
      this.$fetch("courseProduct_listJspn", {
        ...this.pageConfig,
        ...params1,
        ...params,
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.status = item.productStatus == true ? "正常" : "暂停";
          return item;
        });
        this.pageConfig.totalCount = res.data.pager.totalRows;
      });
    },
    handleAdd() {
      this.distributeVisible = true;
      this.addStatus = true;
    },
    handleEdit(data) {
      console.log("datadatadata", data);
      //courseProduct_goEdit
      this.editId = data.id;
      this.addStatus = false;
      this.distributeVisible = true;
      let status = data.status == "正常" ? true : false;
      this.addFormOptions.forEach((item) => {
        if (item.prop == "status") {
          item.initValue = status;
        } else if (item.prop == "productDetail") {
          this.dataForm.productDetail = data[item.prop];
        } else {
          item.initValue = data[item.prop];
        }
      });
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);

      // this.$fetch("courseProduct_goEdit", {
      //   id: data.id,
      // }).then((res) => {
      //   this.addFormOptions.forEach((item) => {
      //     item.initValue = res.data.pd[item.prop];
      //   });
      //   setTimeout(() => {
      //     this.$refs.dataForm3.addInitValue();
      //   }, 0);
      // this.productName = data.productName;
      // this.productNameChange(this.productName,res.data.oneParentId);
      // this.parentIdChange(res.data.oneParentId,res.data.twoParentId);
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
.project-manage {
}
</style>

<template>
  <div class="subject-manage">
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
    <!--添加彈窗  -->
    <rd-dialog
      :title="addStatus ? '添加科目' : '编辑科目'"
      :dialogVisible="editVisible"
      :width="'700px'"
      :showFooter="false"
      top="5vh"
      append-to-body
      @handleClose="handleClose"
    >
      <editSubject
        :id="id"
        :issuseId="issuseId"
        :addStatus="addStatus"
        v-if="editVisible"
        ref="dyForm"
        :IsEditDisabled="IsEditDisabled"
        @close="handleClose"
        @refresh="refresh"
        :tableData="tableData"
      />
    </rd-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import editSubject from "./editSubject";
export default {
  name: "subject",
  components: {
    RdForm,
    editSubject,
  },
  props: {
    id: {
      type: [Number , String],
    },
  },
  data() {
    return {
      IsEditDisabled:false,
      startDateDisabled: {},
      editVisible: false,
      issuseId: "",
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
          prop: "subjectName",
          element: "el-input",
          placeholder: "请输入科目",
        },
        {
          prop: "subjectStatus",
          element: "el-select",
          placeholder: "请选择状态",
          options: [
            {
              label: "正常",
              value: false,
            },
            {
              label: "暂停",
              value: true,
            },
          ],
        },
      ],
      tableData: [
      ],
      tableKey: [
        { name: "id", value: "id" },
        { name: "科目名", value: "subjectName" },
        { name: "所属项目", value: "productName" },
        { name: "技能考试时间", value: "skillTestStart" },
        { name: "理论考试时间", value: "theoryTestStart" },
        { name: "理论考试关课时间", value: "theoryTestClosingTime" },
        { name: "理论二考时间", value: "theoryTest2Start" },
        { name: "理论二考关课时间", value: "theoryTest2End" },
        { name: "状态", value: "subjectStatus" },
        { name: "创建时间", value: "createAt" },

        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 140,
          fixed: "right",
        },
      ],
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
    handleClose() {
      this.editVisible = false;
      this.IsEditDisabled = false;
      this.$refs.dyForm.$refs.dynamicValidateForm.resetFields();
    },
    refresh() {
      this.getTableData();
    },
    handleEdit(data) {
      this.IsEditDisabled = true;
      this.issuseId = data.id;
      this.addStatus = false;
      this.editVisible = true;
      // this.$fetch("coursesubject_editJsp", {
      //   id: this.issuseId,
      // }).then((res) => {
      //   this.$refs.dataForm3.addInitValue();
      //   console.log(this.addFormOptions, "this.addFormOptions---");
      // });
    },
    handleAdd() {
      this.editVisible = true;
      this.addStatus = true;
      this.IsEditDisabled = true;
    },
    onSearch(val) {
      this.searchForm = {
        ...val,
      };
      this.getTableData();
    },
    getTableData(params = {}) {
      this.$fetch("coursesubject_listJspn", {
        ...this.pageConfig,
        ...this.searchForm,
        productId: this.id,
        ...params,
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.subjectStatus = item.subjectStatus == false ? "正常" : "暂停";
          return item;
        });
        this.pageConfig.totalCount = res.data.pager.totalRows;
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
.closeSecondTime {
  margin-left: -130px !important;
  .requireTag {
    &::before {
      display: inline-block;
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }
  }
}
</style>

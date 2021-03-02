<template>
  <div class="Invalidationchange_container">
    <search-form
      :formOptions="formOptions"
      :showNum="showNum"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="openDetect"
          >质检</el-button
        >
        <!-- <el-button size="small" @click="openDrawer">抽屉1</el-button> -->
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :multiple="true"
        :pageConfig.sync="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange"
      >
        <template slot="checked" slot-scope="scope">
          <!-- <el-tag :type="scope.row.checked?'success':'danger'">{{scope.row.checked?"已质检":"未质检"}}</el-tag> -->
          <el-tag
            :type="scope.row.checked ? 'success' : 'danger'"
            @click="handleCheckDetail(scope.row)"
            >{{ scope.row.checked ? "已质检" : "未质检" }}</el-tag
          >
        </template>
      </rd-table>
      <rd-dialog
        :title="detectStatus ? '质检' : '质检详情'"
        :dialogVisible="detectVisible"
        :width="widthNew"
        :showFooter="detectStatus"
        @handleClose="closeDetect('dataForm')"
        @submitForm="submitForm('dataForm')"
      >
        <el-form ref="dataForm" :model="detectForm" label-width="100px">
          <el-form-item
            label="机会失效"
            v-if="detectStatus"
            prop="invalidStatus"
          >
            <el-radio-group v-model="detectForm.invalidStatus">
              <el-radio label="Invalid">是</el-radio>
              <el-radio label="Potential">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- v-if="detectForm.invalidStatus == 'Invalid'" -->
          <el-form-item label="失效原因" prop="invalidReason">
            <el-select
              v-model="detectForm.invalidReason"
              placeholder="请选择失效原因"
              :disabled="!detectStatus"
            >
              <el-option label="无法核实" value="UnableToVerify"></el-option>
              <el-option label="无法联系" value="UnableToReached"></el-option>
              <el-option label="否认咨询" value="DenyConsulting"></el-option>
              <el-option label="已报名" value="AlreadySign"></el-option>
              <el-option
                label="公司内部人员"
                value="CompanyInsider"
              ></el-option>
              <el-option label="已从支线成交" value="SignBranch"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="质检详情" prop="checkedDetail">
            <el-input
              v-model.trim="detectForm.checkedDetail"
              autocomplete="off"
              type="textarea"
              placeholder="请输入详情"
              :readonly="!detectStatus"
            />
          </el-form-item>
        </el-form>
      </rd-dialog>
      <rd-drawer
        :dialogVisible="dialogVisible"
        :size="drawerSize"
        @handleClose="closeDrawer()"
      ></rd-drawer>
    </div>
  </div>
</template>

<script>
import rdDrawer from "@/components/RdDrawer";
export default {
  name: "invalidation-change",
  components: {
    rdDrawer,
  },
  data() {
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        {
          prop: "studentName",
          element: "el-input",
          initValue: "",
          placeholder: "请输入学员姓名",
        },
        {
          prop: "phone",
          element: "el-input",
          initValue: "",
          placeholder: "请输入学员手机",
        },
        {
          prop: "enquireProductIdOne",
          element: "el-select",
          initValue: "",
          placeholder: "请选择项目",
        },
        {
          prop: "eduBackground",
          element: "el-select",
          initValue: "",
          placeholder: "请选择学历",
        },
        {
          prop: "invalidReason",
          element: "el-select",
          initValue: "",
          placeholder: "请选择失效原因",
        },
        {
          prop: "checked",
          element: "el-select",
          initValue: "",
          placeholder: "请选择是否质检",
        },
        {
          prop: "marketName",
          element: "el-select",
          initValue: "",
          placeholder: "请选择归属销售",
        },
        {
          prop: "campusId",
          element: "el-select",
          initValue: "",
          placeholder: "请选择组织架构",
        },
        {
          prop: "updateAt",
          element: "el-date-picker",
          startPlaceholder: "失效时间(开始)",
          endPlaceholder: "失效时间(结束)",
        },
      ],
      tableData: [],
      tableKey: [
        { name: "机会ID", value: "id", sortable: true, width: 100 },
        { name: "姓名", value: "studentName" },
        { name: "手机号码", value: "phone", width: 100 },
        { name: "跟进次数", value: "feedbackCount" },
        { name: "创建时间", value: "createAt", width: 132 },
        { name: "失效时间", value: "updateAt", width: 132 },
        { name: "失效原因", value: "invalidReason" },
        { name: "备注", value: "remark" },
        { name: "机会状态", value: "status" },
        { name: "归属销售", value: "marketName" },
        { name: "分校/战队", value: "campusName", width: 132 },
        { name: "质检状态", value: "checked", operate: true },
      ],
      emptyText: "暂无数据",
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,

      // 质检弹窗参数
      widthNew: "600px",
      detectVisible: false,
      detectStatus: true, // 状态：true 质检 false 质检详情
      detectForm: {
        invalidStatus: "Invalid",
        invalidReason: "",
        checkedDetail: "",
      },

      // 回访抽屉参数
      dialogVisible: false,
      drawerSize: "50%",
      selectedRows: [],
    };
  },
  mounted() {
    this.getTableData();
    this.getSelectList();
  },
  methods: {
    onSearch(val) {
      this.searchForm = { 
        ...val ,
        updateAt: val.updateAt?val.updateAt.join(' ~ '):""
      };
      this.getTableData();
      console.log(val, this.searchForm, "val---");
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
      this.selectedRows = rows;
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },

    // 质检
    openDetect() {
      if (!this.selectedRows.length) {
        this.$message.warning("请选择机会");
        return;
      } else if (this.selectedRows.map((item) => item.checked).includes(true)) {
        this.$message.warning("请勿重复质检");
        return;
      }
      this.detectVisible = true;
      this.detectStatus = true;
      this.detectForm = {
        invalidStatus: "Invalid",
        invalidReason: "",
        checkedDetail: "",
      };
    },
    closeDetect(formName) {
      this.detectVisible = false;
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      console.log(this.detectForm, 666);

      this.$fetch("chance_invalid_update", {
        ids: this.selectedRows.map((item) => item.id).join(","),
        ...this.detectForm,
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success("操作成功");
          this.closeDetect("dataForm");
          this.getTableData();
        }
      });
    },

    // 抽屉
    openDrawer(rows) {
      this.dialogVisible = true;
      console.log(this.dialogVisible, 666);
    },
    closeDrawer(formName) {
      this.dialogVisible = false;
      // this.$refs[formName].resetFields();
    },

    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch("chance_invalid_list", {
        invalidStatus: "Invalid",
        // stayModule:"Lost",
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.phone = item.phone && this.$common.hidePhone(item.phone);
          return item;
        });
        this.pageConfig.totalCount = res.data.count;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
    getSelectList() {
      Promise.all(
        [
          this.$fetch("chance_edu_list"),
          this.$fetch("chance_staff_list"),
          this.$fetch("chance_config_campusList"),
          this.$fetch("chance_product_list"),
        ].map((p) => {
          return p.catch((error) => error);
        })
      ).then((result) => {
        console.log(result,'result---------------')
        let eduOptions = result[0].data.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        let staffOptions = result[1].msg?JSON.parse(result[1].msg).map((item) => ({
          label: item.staffName,
          value: item.id,
        })):[];
        let campusOptions = result[2].data.data.map((item) => ({
          label: item.campusName,
          value: item.id,
        }));
        let productOptions = result[3].msg?JSON.parse(result[3].msg).map((item) => ({
          value: item.id,
          label: item.productName,
        })):[];
        let reasonOptions = [
          {
            label: "无法核实",
            value: "UnableToVerify"
          },
          {
            label: "无法联系",
            value: "UnableToReached"
          },
          {
            label: "否认咨询",
            value: "DenyConsulting"
          },
          {
            label: "已报名",
            value: "AlreadySign"
          },
          {
            label: "公司内部人员",
            value: "CompanyInsider"
          },
          {
            label: "已从支线成交",
            value: "SignBranch"
          },
        ]
        this.formOptions = [
          {
            prop: "studentName",
            element: "el-input",
            initValue: "",
            placeholder: "请输入学员姓名",
          },
          {
            prop: "phone",
            element: "el-input",
            initValue: "",
            placeholder: "请输入学员手机",
          },
          {
            prop: "enquireProductIdOne",
            element: "el-select",
            initValue: "",
            placeholder: "请选择项目",
            options: productOptions,
            filterable: true,
          },
          {
            prop: "eduBackground",
            element: "el-select",
            initValue: "",
            placeholder: "请选择学历",
            options: eduOptions,
          },
          {
            prop: "invalidReason",
            element: "el-select",
            initValue: "",
            placeholder: "请选择失效原因",
            options: reasonOptions
          },
          {
            prop: "checked",
            element: "el-select",
            initValue: "",
            placeholder: "请选择是否质检",
            options: [
              {
                label: "是",
                value: 1
              },
              {
                label: "否",
                value: 0
              }
            ]
          },
          {
            prop: "marketName",
            element: "el-select",
            initValue: "",
            placeholder: "请选择归属销售",
            filterable: true,
            options: staffOptions,
          },
          {
            prop: "campusId",
            element: "el-select",
            initValue: "",
            placeholder: "请选择组织架构",
            filterable: true,
            options: campusOptions,
          },
          {
            prop: "updateAt",
            element: "el-date-picker",
            startPlaceholder: "失效时间(开始)",
            endPlaceholder: "失效时间(结束)",
          },
        ];
      });
    },

    handleCheckDetail(val) {
      if (!val.checked) {
        return;
      }
      this.detectVisible = true;
      this.detectStatus = false;
      this.detectForm = {
        ...val,
        invalidStatus: val.invalidStatus_text,
        invalidReason: val.invalidReason_text,
      };
      console.log(this.detectForm, "detectform");
    },
  },
};
</script>

<style lang='scss' scoped>
.Invalidationchange_container {
  .btn-wrapper {
    margin-bottom: 8px;
  }
}
</style>
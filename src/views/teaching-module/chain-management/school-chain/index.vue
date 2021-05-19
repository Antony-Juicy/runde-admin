<template>
  <div class="school-chain">
    <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleAdd"
          >添加</el-button
        >
        <el-button
          type="danger"
          size="small"
          @click="handleAdd(5)"
          icon="el-icon-caret-right"
          >暂停</el-button
        >
        <el-button
          type="warning"
          size="small"
          icon="el-icon-document-checked"
          @click="handleAdd(2)"
          >恢复</el-button
        >
        <el-button
          type="danger"
          size="small"
          icon="el-icon-close"
          @click="handleAdd(2)"
          >批量删除</el-button
        >
      </div>
      <rd-table
        :multiple="true"
        :tbodyHeight="650"
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="campusInfo" slot-scope="scope">
          省校：{{ scope.row.provinceCampusName }}<br />
          分校：{{ scope.row.campusName }}<br />
        </template>
        <template slot="chainInformation" slot-scope="scope">
          连锁全称：{{ scope.row.chainName }}<br />
          连锁联系人：{{ scope.row.contact }}<br />
          联系电话：{{ scope.row.phone }}<br />
          地址：{{ scope.row.address }}<br />
          连锁谈判人：{{ scope.row.negotiator }}<br />
          创建人：{{ scope.row.createStaffName }}<br />
          备注：{{ scope.row.remark }}<br />
        </template>
        <template slot="termCooperation" slot-scope="scope">
          合作开始：{{ scope.row.startTime }}<br />
          合作结束：{{ scope.row.endTime }}<br />
        </template>
        <template slot="otherInformation" slot-scope="scope">
          是否有设置优惠价：{{ scope.row.chainCampusType }}<br />
          是否有定制班：{{ scope.row.customizationStatus }}<br />
          状态：{{ scope.row.status }}<br />
          付款方式：{{ scope.row.payType }}<br />
        </template>
        <template slot="uploadContract" slot-scope="scope">
          <el-upload
            action
            :before-upload="beforeUpload"
            multiple
            style="display: inline-block"
          >
            <el-button
              type="text"
              icon="el-icon-upload"
              size="mini"
              class="size15"
              >上传</el-button
            >
          </el-upload>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            size="small"
            icon="el-icon-picture-outline"
            @click="handleAdd(2)"
            >查看图片</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleEdit(scope.row)"
            size="small"
            type="text"
            icon="el-icon-edit"
            >编辑</el-button
          >
        </template>

        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" size="small" type="primary"
            >编辑</el-button
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
  name: "school-chain",
  data() {
    return {
      formOptions: [
        {
          prop: "chainName",
          element: "el-select",
          placeholder: "连锁",
          options: [],
        },
        {
          prop: "campus",
          element: "el-select",
          placeholder: "校区",
          options: [],
        },
        {
          prop: "chainContact",
          element: "el-input",
          placeholder: "连锁联系人",
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "手机",
        },
        {
          prop: "negotiatorName",
          element: "el-input",
          placeholder: "谈判人名",
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "状态",
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
          name: "ID",
          value: "id",
          fixed: "left",
          width: 80,
        },
        {
          name: "校区信息",
          value: "campusInfo",
          operate: true,
        },
        {
          name: "连锁信息",
          value: "chainInformation",
          operate: true,
        },
        {
          name: "合作期限",
          value: "termCooperation",
          operate: true,
        },
        {
          name: "其它信息",
          value: "otherInformation",
          operate: true,
        },
        {
          name: "上传合同",
          value: "uploadContract",
          operate: true,
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
          prop: "campus",
          element: "el-select",
          placeholder: "请输入名称",
          label: "校区",
          options: [],
        },
        {
          prop: "chainName",
          element: "el-select",
          placeholder: "",
          label: "连锁",
          options: [],
        },
        {
          prop: "chainContact",
          element: "el-input",
          placeholder: "请输入",
          label: "连锁联系人",
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "请输入",
          label: "手机",
        },
        {
          prop: "negotiatorName",
          element: "el-input",
          placeholder: "请输入",
          label: "连锁谈判人",
        },

        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "合作开始",
          endPlaceholder: "合作结束",
          initWidth: true,
          label: "合作时间",
          //   clearable: false
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
          prop: "coursesType",
          element: "el-select",
          placeholder: "请选择",
          label: "开课网课类型",
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
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择",
          label: "状态",
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
        {
          prop: "payType",
          element: "el-select",
          placeholder: "请选择",
          label: "付款方式",
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
        {
          prop: "customizationStatus",
          element: "el-select",
          placeholder: "请选择",
          label: "是否有定制班",
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
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ],
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
    // upload img
    async beforeUpload(file) {
      // 如果类型不在允许的类型范围内
      let allowTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"]; // 允许上传的图片类型

      let params = new FormData();
      params.append("file", file);
      const res = await this.$store.dispatch("app/uploadFile", params);

      if (allowTypes.indexOf(file.type) === -1) {
        window.tinymce
          .get(this.tinymceId)
          .insertContent(
            `<a style="color:blue" href="${iceConfig.baseUrl}${
              this.$store.getters.osscdn + res.file
            }" data-mce-href="${iceConfig.baseUrl}${
              this.$store.getters.osscdn + res.file
            }">下载 ${file.name} </a>`
          );
      } else {
        window.tinymce
          .get(this.tinymceId)
          .insertContent(
            `<img class="wscnph" src="${iceConfig.baseUrl}${
              this.$store.getters.osscdn + res.file
            }"  data-mce-src="${iceConfig.baseUrl}${
              this.$store.getters.osscdn + res.file
            }" >`
          );
      }
      this.$message({
        message: "插入成功",
        type: "success",
      });
      return false;
    },
    onSearch(val) {
      this.searchForm = {
        ...val,
      };
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
    getformList() {
      this.$fetch("chaincampus_goAdd", {}).then((res) => {
        //连锁
        this.addFormOptions[1].options = this.formOptions[0].options = res.data.chainInfoList.map(
          (item) => ({
            label: item.chainName,
            value: item.id,
          })
        );
        //校区
        this.addFormOptions[0].options = this.formOptions[1].options = res.data.campusList.map(
          (item) => ({
            label: item.campusName,
            value: item.id,
          })
        );
      });
    },
    getTableData(params = {}) {
      this.$fetch("chaincampus_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common
            ._formatDates(item.createAt)
            .split(" ")[0];
          item.updateAt = this.$common
            ._formatDates(item.updateAt)
            .split(" ")[0];
          item.startTime = this.$common
            ._formatDates(item.startTime)
            .split(" ")[0];
          item.endTime = this.$common._formatDates(item.endTime).split(" ")[0];
          item.status = item.status == "Normal" ? "正常" : "暂停";
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
  },
};
</script>

<style lang="scss" scoped>
.school-chain {
}
</style>

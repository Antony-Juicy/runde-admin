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
          省校：{{ scope.row.provincialSchool }}<br />
          分校：{{ scope.row.branchSchool }}<br />
        </template>
        <template slot="chainInformation" slot-scope="scope">
          连锁全称：{{ scope.row.provincialSchool }}<br />
          连锁联系人：{{ scope.row.branchSchool }}<br />
          联系电话：{{ scope.row.branchSchool }}<br />
          地址：{{ scope.row.branchSchool }}<br />
          连锁谈判人：{{ scope.row.branchSchool }}<br />
          创建人：{{ scope.row.branchSchool }}<br />
          备注：{{ scope.row.branchSchool }}<br />
        </template>
        <template slot="termCooperation" slot-scope="scope">
          合作开始：{{ scope.row.provincialSchool }}<br />
          合作结束：{{ scope.row.branchSchool }}<br />
        </template>
        <template slot="otherInformation" slot-scope="scope">
          是否有设置优惠价：{{ scope.row.provincialSchool }}<br />
          是否有定制班：{{ scope.row.branchSchool }}<br />
          合作结束：{{ scope.row.branchSchool }}<br />
          状态：{{ scope.row.branchSchool }}<br />
          付款方式：{{ scope.row.branchSchool }}<br />
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
          <el-button
            @click="handleEdit(scope.row)"
            size="small"
            type="primary"
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
          prop: "menuName",
          element: "el-select",
          placeholder: "连锁",
          options: [],
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "校区",
          options: [],
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "连锁联系人",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "手机",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "谈判人名",
        },
        {
          prop: "menuName",
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
          prop: "menuName",
          element: "el-select",
          placeholder: "请输入名称",
          label: "校区",
          options: [],
        },
        {
          prop: "post",
          element: "el-select",
          placeholder: "",
          label: "连锁",
          options: [],
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入",
          label: "连锁联系人",
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入",
          label: "手机",
        },
        {
          prop: "className",
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
          prop: "roleName",
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
          prop: "roleName",
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
          prop: "roleName",
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
    getTableData() {},
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

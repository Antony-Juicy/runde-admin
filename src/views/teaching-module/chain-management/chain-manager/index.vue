<template>
  <div class="view-detail">
    <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >添加</el-button
        >
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="chainInfoJson" slot-scope="scope">
          <span v-for="item in scope.row.chainInfoJson" :key="item.val">
            {{ item.name }}
          </span>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
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
import Common from "@/utils/common";
export default {
  name: "view-detail",
  data() {
    return {
      formOptions: [
        {
          prop: "userName",
          element: "el-input",
          placeholder: "姓名",
        },
        {
          prop: "userAccount",
          element: "el-input",
          placeholder: "账号",
        },
        {
          prop: "telephone",
          element: "el-input",
          placeholder: "联系电话",
        },
        {
          prop: "email",
          element: "el-input",
          placeholder: "邮箱",
        },
        {
          prop: "userType",
          placeholder: "用户类型",
          element: "el-select",
          options: [],
        },
        {
          prop: "status",
          placeholder: "状态",
          element: "el-select",
          options: [
            {
              label: "正常",
              value: 1,
            },
            {
              label: "锁定",
              value: 0,
            },
          ],
        },
      ],
      searchForm: {},
      emptyText: "暂无数据",
      tableData: [],
      tableKey: [
        {
          name: "ID",
          value: "id",
          fixed: "left",
          width: 80,
        },
        {
          name: "姓名",
          value: "userName",
        },
        {
          name: "手机",
          value: "telephone",
        },
        {
          name: "邮箱",
          value: "email",
        },
        {
          name: "用户类型",
          value: "userType",
        },
        {
          name: "负责连锁",
          value: "chainInfoJson",
          width: 600,
          operate: true,
        },
        {
          name: "状态",
          value: "status",
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
          prop: "campusVisible",
          element: "el-select",
          placeholder: "负责连锁",
          initWidth: true,
          multiple: true,
          label: "负责连锁",
          options: [],
          events: {},
          initValue: [],
        },
        {
          prop: "userName",
          element: "el-input",
          placeholder: "姓名",
          label: "姓名",
        },
        {
          prop: "telephone",
          element: "el-input",
          placeholder: "手机号码",
          label: "手机号码",
        },
        {
          prop: "password",
          element: "el-input",
          placeholder: "密码",
          label: "密码",
        },
        {
          prop: "email",
          element: "el-input",
          placeholder: "邮箱",
          label: "邮箱",
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择",
          label: "状态",
          options: [
            {
              label: "正常",
              value: 1,
            },
            {
              label: "锁定",
              value: 0,
            },
          ],
        },
      ],
      addRules: {
        campusVisible: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        userName: [{ required: true, message: "请输入", trigger: "blur" }],
        telephone: [{ required: true, message: "请输入", trigger: "blur" },  { validator: Common._validatorPhone, trigger: "blur" },],
        password: [{ required: true, message: "请输入", trigger: "blur" }],
        email: [{ required: true, message: "请输入", trigger: "blur" }],
        status: [{ required: true, message: "请选择", trigger: "change" }],
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
    onSearch(val) {
      this.searchForm = {
        ...val,
      };
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
    getformList() {
      this.$fetch("chaincampus_goAddLeader", {}).then((res) => {
        //用户类型
        this.formOptions[4].options = res.data.typeList.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        //负责连锁
        this.addFormOptions[0].options = res.data.chainCampusList.map(
          (item) => ({
            label: `${item.campusName} - ${item.chainName}`,
            value: item.id,
          })
        );
      });
    },
    getTableData(params = {}) {
      this.$fetch("chaincampus_listChainLeaderJsp", {
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
          item.status = item.status == 1 ? "正常" : "锁定";
          item.chainInfoJson =
            item.chainInfoJson && item.chainInfoJson.length > 0
              ? item.chainInfoJson
              : [];
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
          let { telephone, campusVisible } = formData;
          let chainId, chainCampusId;
          chainId = chainCampusId = campusVisible.toString();
          let chainInfoJson = this.addFormOptions[0].options.filter((el) => {
            return campusVisible.indexOf(el.value) != -1;
          });

          this.$fetch("chaincampus_checkPhoneExist", {
            phone: telephone,
            id: this.addStatus ? "" : this.editId,
          }).then((res) => {
            this.$fetch(
              this.addStatus ? "chaincampus_saveLeader" : "xxxxxxxxx_editJsp",
              {
                ...formData,
                campusVisible: "",
                chainId,
                chainCampusId,
                chainInfoJson: JSON.stringify(chainInfoJson),
                id: this.addStatus ? "" : this.editId,
              }
            ).then((res) => {
              this.$message.success("操作成功");
              this.addVisible = false;
              this.$refs.dataForm3.onReset();
              this.getTableData();
            });
          });
        }
      });
    },
    handleEdit(data) {
      this.addStatus = false;
      this.addVisible = true;
      this.editId = data.id;
      // this.$fetch("xxx_goEdit", {
      //   id: data.id,
      // }).then(async (res) => {
      //   let { pd } = res.data;
      //   pd.time = [new Date(pd.startTime), new Date(pd.endTime)];
      //   this.addFormOptions.forEach((item) => {
      //     item.initValue = pd[item.prop];
      //   });
      //   setTimeout(() => {
      //     this.$refs.dataForm3.addInitValue();
      //   }, 0);
      // });
    },
    handleDelete(row) {
      let info = "";
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$fetch("projectType_delete", {
            id: row.id,
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
.view-detail {
}
</style>

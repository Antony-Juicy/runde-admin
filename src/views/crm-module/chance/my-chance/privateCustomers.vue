<template>
  <div class="private-customers">
    <search-form
      :formOptions="formOptions"
      :showNum="6"
      @onSearch="onSearch"
    ></search-form>
    <el-divider></el-divider>
    私海
    <div class="btn-wrapper">
      <el-button type="success" size="small" @click="handleOrder"
        >成单</el-button
      >
      <el-button type="warning" size="small" @click="handleRelease"
        >释放</el-button
      >
      <el-button type="danger" size="small" @click="handleInvalid"
        >失效</el-button
      >
      <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
      <el-button type="info" size="small" @click="handleAICall"
        >AI呼叫</el-button
      >
      <el-button size="small" @click="handleImport">导入</el-button>
    </div>
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :pageConfig="pageConfig"
      :filterColumn="true"
      :multiple="true"
      fixedTwoRow
      highlight-current-row
      @pageChange="pageChange"
      @select="handelSelect"
      @currentChange="currentChange"
    >
      <!-- 手机号 -->
      <template slot="phone" slot-scope="scope">
        {{ $common.hidePhone(scope.row.phone) }}
      </template>
      <!-- 倒计时 -->
      <template slot="cutdown" slot-scope="scope">
        <span style="color: red">{{ newArr[scope.$index].newCutdown }}</span>
      </template>
      <!-- 回访 -->
      <template slot="visit" slot-scope="scope">
        <span class="visit-container" @click="drawerVisible = true">{{
          scope.row.visit || 0
        }}</span>
      </template>
    </rd-table>
    <!-- 回访抽屉 -->
    <rd-drawer
      :dialogVisible="drawerVisible"
      :size="drawerSize"
      @handleClose="drawerVisible = false"
    ></rd-drawer>

    <!-- 成单弹窗 -->
    <rd-dialog
      :title="'成单学员信息确认'"
      :dialogVisible="dialogVisible"
      @handleClose="handleClose('dataForm')"
      @submitForm="submitForm('dataForm')"
    >
      <RdForm :formOptions="formOptions2" :rules="rules" ref="dataForm"/>
    </rd-dialog>
    
  </div>
</template>

<script>
let id = 0;
import rdDrawer from "@/components/RdDrawer";
import RdForm from "@/components/RdForm";
export default {
  name: "temp",
  data() {
    return {
      // 搜索栏
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "学员姓名",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "学员手机",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "活动名",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "学历",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "机会状态",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "机会来源",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "查询排序方法",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "呼叫状态",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "abc",
          element: "el-cascader",
          placeholder: "课程",

          props: {
            checkStrictly: true,
            lazy: true,
            lazyLoad(node, resolve) {
              const { level } = node;
              setTimeout(() => {
                const nodes = Array.from({ length: level + 1 }).map((item) => ({
                  value: ++id,
                  label: `选项${id}`,
                  leaf: level >= 2,
                }));
                // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                resolve(nodes);
              }, 1000);
            },
          },
        },
      ],
      tableData: [
        {
          id: 1,
          name: "飞翔的荷兰人3",
          cutdown: 1608897351706,
          visit: 2,
          phone: "15692026183",
        },
        {
          id: 2,
          name: "飞翔的荷兰人2",
          cutdown: new Date().getTime(),
          phone: "17092026183",
        },
        { id: 3, name: "飞翔的荷兰人1", phone: "18892026183" },
      ],
      tableKey: [
        {
          name: "姓名",
          value: "name",
        },
        {
          name: "手机号",
          value: "phone",
          operate: true,
        },
        {
          name: "回收倒计时",
          value: "cutdown",
          operate: true,
          width: 155,
        },
        {
          name: "机会来源",
          value: "menuUrl",
        },
        {
          name: "回访",
          value: "visit",
          operate: true,
          width: 60,
        },
        {
          name: "最近回访",
          value: "menuOrder",
          // width: 100
        },
        {
          name: "下次回访",
          value: "description1",
        },
        {
          name: "跟进状态",
          value: "description2",
        },
        {
          name: "创建时间",
          value: "description3",
        },
        {
          name: "呼叫状态",
          value: "description4",
        },
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      newArr: [], //倒计时的数组
      // 回访抽屉参数
      drawerVisible: false,
      drawerSize: "50%",
      // 弹窗
      dialogVisible: false,
      dialogVisible2: false,
      formLabelWidth: "100px",
      basicInfo: {
        // roleCode: "",
        roleName: "",
        status: "",
        remark: "",
        updateReason: "",
        parentId: "",
      },
      rules: {
        // roleCode: [{ required: true, message: "请获取编码", trigger: "blur" }],
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ],
        roleName: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        parentId: [{ required: true, message: "请选择分组", trigger: "blur" }],
      },
      formOptions2: [
         {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择校区",
          label: "选择校区",
          initValue: "0",
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
          disabled: true
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入姓名",
          label: "姓名",
           initValue:0,
          disabled: true
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入手机号",
          label: "手机号",
           initValue:0,
          disabled: true
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "销售来源",
          label: "销售来源",
           initValue:0,
          disabled: true,
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "跟进老师",
          label: "跟进老师",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
         {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入地址",
          label: "地址",
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入备注",
          label: "备注",
          type:"textarea",
          rows: 2
        }
      ],
    };
  },
  components: {
    rdDrawer,
    RdForm
  },
  mounted() {
    this.getCutdown();
    setInterval(() => {
      this.getCutdown();
    }, 1000);
  },
  methods: {
    onSearch() {},
    pageChange(val) {
      // this.pageConfig.currentPage = val.page;
      // this.pageConfig.pageSize = val.limit;
      // console.log(this.searchForm,'this.searchForm--')
      // this.getTableData({
      //   currentPage: (val && val.page) || 1,
      //   pageSize: (val && val.limit) || 10,
      //   loginUserId,
      //   ...this.searchForm,
      //   parentId: this.parentId
      // });
    },
    handelSelect(val) {
      console.log(val, "valll");
      this.selectedData = val;
    },
    getCutdown() {
      this.newArr = this.tableData.map((item) => {
        if (item.cutdown) {
          item.newCutdown = this.$common.showtime(item.cutdown);
        }
        return item;
      });
    },
    currentChange(val) {
      this.$emit("currentChange", val);
    },
    // 弹窗关闭
    handleClose(formName) {
      this.dialogVisible = false;
    },
    // 弹窗提交
    submitForm(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          // 新增
          this.$fetch("role_save", {
            ...this.basicInfo,
            loginUserId,
          }).then((res) => {
            this.$message({
              message: "提交成功",
              type: "success",
            });
            this.handleClose("dataForm");
            this.handleTabClick(this.tabPermission);
            console.log(
              this.tabPermission,
              this.basicInfo.parentId,
              "this.tabPermission--"
            );
            if (this.basicInfo.parentId == "") {
              this.getGroupData();
            }
          });
        }
          
      });
    },
    // 成单
    handleOrder() {
      this.dialogVisible = true;
    },
    // 释放
    handleRelease() {},
    // 失效
    handleInvalid() {},
    // 添加
    handleAdd() {},
    // AI呼叫
    handleAICall() {},
    // 导入
    handleImport() {},
  },
};
</script>

<style lang="scss" scoped>
.private-customers {
  .search-form-box {
    margin: -15px -15px 0 -15px;
  }
  .btn-wrapper {
    margin-bottom: 15px;
  }
  .visit-container {
    display: inline-block;
    padding: 5px;
    border: 1px solid #dcdfe6;
    line-height: 9px;
    border-radius: 2px;
    color: #606266;
    cursor: pointer;
  }
  /deep/ {
    .current-row {
      td {
        &:nth-child(2),
        &:nth-child(9),
        &:nth-child(10) {
          color: red;
        }
      }
    }
  }
}
</style>

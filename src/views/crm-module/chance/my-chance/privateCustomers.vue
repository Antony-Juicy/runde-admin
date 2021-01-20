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
      <el-button size="small" type="info" @click="handleImport">导入</el-button>
      <el-button size="small" @click="handleAICall"
        >AI呼叫</el-button
      >
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
        <span style="color: red">{{ newArr[scope.$index]&&newArr[scope.$index].newCutdown }}</span>
      </template>
      <!-- 回访 -->
      <template slot="visit" slot-scope="scope">
        <span class="visit-container" @click="drawerVisible = true">{{
          scope.row.feedbackCount || 0
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
      :dialogVisible="orderVisible"
      @handleClose="handleClose('dataForm')"
      @submitForm="submitForm('dataForm')"
    >
      <RdForm :formOptions="orderFormOptions" :rules="orderRules" ref="dataForm"/>
    </rd-dialog>
    
    <!-- 失效弹窗 -->
    <rd-dialog
      :title="'失效机会确认'"
      :dialogVisible="invalidVisible"
      @handleClose="handleClose('dataForm2')"
      @submitForm="submitInvalidForm('dataForm2')"
    >
      <RdForm :formOptions="invalidFormOptions" :rules="invalidRules" ref="dataForm2"/>
    </rd-dialog>

    <!-- 添加机会弹窗 -->
    <rd-dialog
      :title="'添加机会'"
      :dialogVisible="addVisible"
      @handleClose="handleClose('dataForm3')"
      @submitForm="submitAddForm('dataForm3')"
    >
      <RdForm :formOptions="addFormOptions" :rules="addRules" ref="dataForm3"/>
    </rd-dialog>

    <!-- 导入弹窗 -->
    <rd-dialog
      :title="'导入机会'"
      :dialogVisible="importVisible"
      @handleClose="handleClose('dataForm4')"
      @submitForm="submitImportForm('dataForm4')"
    >
      <RdForm :formOptions="importFormOptions" :rules="importRules" ref="dataForm4">
         <template slot="temp">
            <el-button size="small" type="primary">点击下载模板</el-button>
        </template>
        <template slot="file">
            <span>文件</span>
        </template>
        <template slot="tips">
            <span>导入模版中【学员姓名】【电话】【地址】不能为空.否则会导入失败！！！</span>
        </template>
      </RdForm>
    </rd-dialog>

    <!-- ai呼叫 -->
    <rd-dialog
      :title="'AI批量外呼'"
      :showFooter="false"
      :dialogVisible="callVisible"
      @handleClose="handleClose('dataForm5')"
    >
      <div class="call-container">
        <h2>已选呼叫总数：1</h2>
      <p class="tip">*提示：在呼叫开始之后请不要关闭窗口，如需进行其他操作请最小化窗口</p>
      <div class="call-table">
        <div class="call-title"><span>已呼客户</span><span>待呼客户</span></div>
        <div class="call-content"><span>0</span><span>1</span></div>
      </div>
      <div class="btn"><el-button type="primary" size="small">开始呼叫</el-button></div>
      </div>
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
      searchForm: {},
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
          value: "studentName",
        },
        {
          name: "手机号",
          value: "phone"
        },
        {
          name: "回收倒计时",
          value: "cutdown",
          operate: true,
          width: 155,
        },
        {
          name: "机会来源",
          value: "saleSource",
        },
        {
          name: "回访",
          value: "visit",
          operate: true,
          width: 60,
        },
        {
          name: "最近回访",
          value: "recentFeedbackTime",
          // width: 100
        },
        {
          name: "下次回访",
          value: "nextDate",
        },
        {
          name: "跟进状态",
          value: "status",
        },
        {
          name: "创建时间",
          value: "createAt",
        },
        {
          name: "呼叫状态",
          value: "callStatus",
        },
      ],
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        showCount: 10,
      },
      newArr: [], //倒计时的数组
      // 回访抽屉参数
      drawerVisible: false,
      drawerSize: "50%",

      // 成单弹窗
      orderVisible: false,
      orderRules: {
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
      orderFormOptions: [
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

      // 失效弹窗
      invalidVisible: false,
      invalidFormOptions:[
        {
          prop: "reason",
          element: "el-select",
          placeholder: "请选择",
          label: "失效原因",
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
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入",
          label: "备注",
          type:"textarea",
          rows: 3
        }
      ],
      invalidRules:{
          reason: [
          { required: true, message: "请选择失效原因", trigger: "blur" },
        ],
      },

      // 添加弹窗
      addVisible: false,
      addFormOptions:[
         {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择校区",
          label: "选择校区",
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
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入姓名",
          label: "姓名"
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入手机号",
          label: "手机号"
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "销售来源",
          label: "销售来源",
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
      addRules:{},

      // 导入弹窗
       importVisible: false,
      importFormOptions:[
         {
          prop: "roleName",
          element: "el-select",
          placeholder: "校区名(所属组织)",
          label: "就近校区",
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
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择",
          label: "咨询项目一",
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
          placeholder: "请选择",
          label: "咨询科目一",
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
          prop: "temp",
          element: "el-input",
          label: "导入模板",
          operate: true
        },
        {
          prop: "file",
          element: "el-input",
          label: "文件",
          operate: true
        },
        {
          prop: "tips",
          element: "el-input",
          label: "特别提醒",
          operate: true
        }
      ],
      importRules:{},

      // ai呼叫弹窗
      callVisible: false,
      

    };
  },
  components: {
    rdDrawer,
    RdForm
  },
  props: {
    newFormOptions: {
      type: Array,
      default: ()=>[]
    }
  },
  mounted() {
    this.getCutdown();
    setInterval(() => {
      this.getCutdown();
    }, 1000);
    this.getTableData();
  },
  watch:{
    newFormOptions(newVal){
      this.formOptions = newVal;
    }
  },
  methods: {
     onSearch(val) {
      this.searchForm = { ...val };
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handelSelect(val) {
      console.log(val, "valll");
      this.selectedData = val;
    },
    getCutdown() {
      this.newArr = this.tableData.map((item) => {
        if (item.createAt) {
          item.newCutdown = this.$common.showtime(item.createAt);
        }
        return item;
      });
    },
    currentChange(val) {
      this.$emit("currentChange", val);
    },
    // 成单弹窗打开
    handleOrder() {
      this.orderVisible = true;
    },
    // 成单弹窗关闭
    handleClose(formName) {
      this.orderVisible = false;
      this.invalidVisible = false;
      this.addVisible = false;
      this.importVisible = false;
      this.callVisible = false;
    },
    // 成单弹窗提交
    submitForm(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    },
    
    // 释放
    handleRelease() {
      this.$confirm(`<strong>确定要将所选的机会释放到机会公海吗?</strong> <span style="color:red">释放之后有一次机会可以再领取回来，</span><span>你还要继续吗？</span>`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true
      })
        .then(async () => {
         
        })
        .catch(() => {});
    },
    // 失效
    handleInvalid() {
      this.invalidVisible = true;
    },
    // 失效弹窗提交
    submitInvalidForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    },
    // 添加
    handleAdd() {
      this.addVisible = true;
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    },
    // AI呼叫
    handleAICall() {
      this.callVisible = true;
    },
    // 导入
    handleImport() {
      this.importVisible = true;
    },
    submitImportForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    },

    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch("chance_my_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        stayModule:"Private"
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.phone = this.$common.hidePhone(item.phone);
          return item;
        });
        this.pageConfig.totalCount = res.data.count;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
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
  .call-container {
    text-align: center;
    .tip {
      color: red;
      font-size: 12px;
    }
    .call-table {
      width: 400px;
      display: inline-block;
      margin-bottom: 15px;
      .call-title,.call-content {
        width: 100%;
        display: flex;
        line-height: 35px;
        span {
          flex: 1;
          border: 1px solid #F0F0F0;
          &:first-child {
            border-right: none;
          }
        }
      }
      .call-title {
        span {
          border-bottom: none;
          background: #FAFAFA;
        }
      }
      
    }
    .btn {
      text-align: right;
      margin-right: 120px;
    }
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
    .el-form-item:last-child{
      color: red;
    }
  }
}
</style>

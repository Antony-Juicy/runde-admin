<template>
  <div class="Public-customers">
    <search-form
      :formOptions="formOptions"
      :showNum="6"
      @onSearch="onSearch"
    ></search-form>
    <el-divider></el-divider>
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
      <!-- <el-button type="primary" size="small" @click="handleAdd">添加</el-button> -->
      <!-- <el-button size="small" type="info" @click="handleImport">导入</el-button> -->
      <el-button size="small" @click="handleLock">锁定</el-button>
      <el-button size="small" @click="handleAICall">AI呼叫</el-button>
    </div>
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :pageConfig.sync="pageConfig"
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
        <span style="color: red">{{
          newArr[scope.$index] && newArr[scope.$index].newCutdown
        }}</span>
      </template>
      <!-- 回访 -->
      <template slot="visit" slot-scope="scope">
        <span class="visit-container" @click.stop="openDrawer(scope.row)">{{
          scope.row.feedbackCount || 0
        }}</span>
      </template>
    </rd-table>
    <!-- 回访抽屉 -->
    <template v-if="drawerVisible">
      <rd-drawer
        :dialogVisible="drawerVisible"
        :size="drawerSize"
        :id="drawerId"
        :phone="drawerPhone"
        :title="drawerTitle"
        @handleClose="drawerVisible = false"
      ></rd-drawer>
    </template>

    <!-- 成单弹窗 -->
    <rd-dialog
      :title="'成单学员信息确认'"
      :dialogVisible="orderVisible"
      @handleClose="handleClose('dataForm')"
      @submitForm="submitForm('dataForm')"
    >
      <RdForm
        :formOptions="orderFormOptions"
        :rules="orderRules"
        ref="dataForm"
      />
    </rd-dialog>

    <!-- 失效弹窗 -->
    <rd-dialog
      :title="'失效机会确认'"
      :dialogVisible="invalidVisible"
      @handleClose="handleClose('dataForm2')"
      @submitForm="submitInvalidForm('dataForm2')"
    >
      <RdForm
        :formOptions="invalidFormOptions"
        :rules="invalidRules"
        ref="dataForm2"
      />
    </rd-dialog>

    <!-- 添加机会弹窗 -->
    <rd-dialog
      :title="'添加机会'"
      :dialogVisible="addVisible"
      @handleClose="handleClose('dataForm3')"
      @submitForm="submitAddForm('dataForm3')"
    >
      <RdForm :formOptions="addFormOptions" :rules="addRules" ref="dataForm3">
        <template slot="product">
          <el-select
            v-model="productId"
            placeholder="请选择"
            size="small"
            @change="productChange"
            filterable
          >
            <el-option
              v-for="item in productArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
        <template slot="subject">
          <el-select
            v-model="subjectId"
            placeholder="请选择"
            size="small"
            @change="subjectChange"
            filterable
          >
            <el-option
              v-for="item in subjectArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
        <template slot="class">
          <el-select
            v-model="classId"
            placeholder="请选择"
            size="small"
            multiple
            filterable
          >
            <el-option
              v-for="item in classArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </RdForm>
    </rd-dialog>

    <!-- 导入弹窗 -->
    <rd-dialog
      :title="'导入机会'"
      :dialogVisible="importVisible"
      @handleClose="handleClose('dataForm4')"
      @submitForm="submitImportForm('dataForm4')"
    >
      <RdForm
        :formOptions="importFormOptions"
        :rules="importRules"
        ref="dataForm4"
      >
        <template slot="temp">
          <el-button size="small" type="primary">点击下载模板</el-button>
        </template>
        <template slot="file">
          <span>文件</span>
        </template>
        <template slot="tips">
          <span
            >导入模版中【学员姓名】【电话】【地址】不能为空.否则会导入失败！！！</span
          >
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
        <p class="tip">
          *提示：在呼叫开始之后请不要关闭窗口，如需进行其他操作请最小化窗口
        </p>
        <div class="call-table">
          <div class="call-title">
            <span>已呼客户</span><span>待呼客户</span>
          </div>
          <div class="call-content"><span>0</span><span>1</span></div>
        </div>
        <div class="btn">
          <el-button type="primary" size="small">开始呼叫</el-button>
        </div>
      </div>
    </rd-dialog>
  </div>
</template>

<script>
let id = 0;
import rdDrawer from "@/components/RdDrawer";
import RdForm from "@/components/RdForm";
import Fetch from "@/utils/fetch";
import Common from "@/utils/common";
export default {
  name: "temp",
  data() {
    return {
      drawerId: "",
      drawerPhone: "",
      drawerTitle: "",
      searchForm: {},
      // 搜索栏
      formOptions: [
        {
          prop: "studentName",
          element: "el-input",
          placeholder: "学员姓名",
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "学员手机",
        },
        {
          prop: "labelInfoName",
          element: "el-input",
          placeholder: "活动名",
        },
        {
          prop: "eduBackground",
          element: "el-select",
          placeholder: "学历",
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "机会状态",
        },
        {
          prop: "saleSource",
          element: "el-select",
          placeholder: "机会来源",
        },
        {
          prop: "ordeParams",
          element: "el-select",
          placeholder: "查询排序方法",
        },
        {
          prop: "callStatus",
          element: "el-select",
          placeholder: "呼叫状态",
        },
        {
          prop: "product",
          element: "el-select",
          placeholder: "课程",

          props: {
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
      tableData: [],
      tableKey: [
        {
          name: "姓名",
          value: "studentName",
        },
        {
          name: "手机号",
          value: "phone",
          operate: true,
        },
        {
          name: "创建时间",
          value: "createAt",
        },
        {
          name: "分配时间",
          value: "allotTime",
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
          width: 135
        },
        {
          name: "下次回访",
          value: "nextDate",
          width: 135
        },
        {
          name: "跟进状态",
          value: "status",
        },
        {
          name: "呼叫状态",
          value: "callStatus",
        },
      ],
      pageConfig: {
        totalCount: 0,
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
        marketStaffId: [
          { required: true, message: "请输入", trigger: "blur" },
        ]
      },
      orderFormOptions: [
        {
          prop: "campusId",
          element: "el-select",
          placeholder: "校区",
          label: "校区",
          disabled: true
        },
        {
          prop: "studentName",
          element: "el-input",
          placeholder: "请输入姓名",
          label: "姓名",
          readonly: true,
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "请输入手机号",
          label: "手机号",
          readonly: true,
        },
        {
          prop: "saleSource",
          element: "el-input",
          placeholder: "销售来源",
          label: "销售来源",
          readonly: true
        },
        {
          prop: "marketStaffId",
          element: "el-select",
          placeholder: "跟进老师",
          label: "跟进老师",
          filterable: true
        },
        {
          prop: "address",
          element: "el-input",
          placeholder: "请输入地址",
          label: "地址",
        },
        {
          prop: "remark",
          element: "el-input",
          placeholder: "请输入备注",
          label: "备注",
          type: "textarea",
          rows: 2,
        },
      ],

      // 失效弹窗
      invalidVisible: false,
      invalidFormOptions: [
        {
          prop: "invalidReason",
          element: "el-select",
          placeholder: "请选择",
          label: "失效原因",
          options: [
            {
              label: "无法核实",
              value: "UnableToVerify",
            },
            {
              label: "无法联系",
              value: "UnableToReached",
            },
            {
              label: "否认咨询",
              value: "DenyConsulting",
            },
            {
              label: "已报名",
              value: "AlreadySign",
            },
            {
              label: "公司内部人员",
              value: "CompanyInsider",
            },
            {
              label: "已从支线成交",
              value: "SignBranch",
            },
          ],
        },
        {
          prop: "remark",
          element: "el-input",
          placeholder: "请输入",
          label: "备注",
          type: "textarea",
          rows: 3,
        },
      ],
      invalidRules: {
        invalidReason: [
          { required: true, message: "请选择失效原因", trigger: "blur" },
        ],
         remark: [
          { required: true, message: "请输入备注", trigger: "blur" },
        ],
      },

      // 添加弹窗
      addVisible: false,
      addFormOptions: [
        {
          prop: "campusId",
          element: "el-select",
          placeholder: "校区名字（所属组织）",
          label: "就近校区",
        },
        {
          prop: "studentName",
          element: "el-input",
          placeholder: "请输入姓名",
          label: "学员姓名",
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "请输入手机号",
          label: "手机号",
        },
        {
          prop: "eduBackground",
          element: "el-select",
          placeholder: "请选择学历",
          label: "学历",
        },
        {
          prop: "saleSource",
          element: "el-select",
          placeholder: "销售来源",
          label: "销售来源",
        },
        {
          prop: "product",
          element: "el-select",
          placeholder: "请选择咨询项目",
          label: "咨询项目",
          operate: true,
          initValue: 0,
        },
        {
          prop: "subject",
          element: "el-select",
          placeholder: "请选择咨询科目",
          label: "咨询科目",
          operate: true,
          initValue: 0,
        },
        {
          prop: "class",
          element: "el-select",
          placeholder: "请选择咨询班型",
          label: "咨询班型",
          operate: true,
          initValue: 0,
        },
      ],
      addRules: {
        campusId: [{ required: true, message: "请选择", trigger: "blur" }],
        studentName: [{ required: true, message: "请输入", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: Common._validatorPhone, trigger: "blur" },
        ],
        eduBackground: [{ required: true, message: "请选择", trigger: "blur" }],
        saleSource: [{ required: true, message: "请选择", trigger: "blur" }],
        product: [{ required: true, message: "请选择", trigger: "blur" }],
        subject: [{ required: true, message: "请选择", trigger: "blur" }],
        class: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      subjectArr: [],
      subjectId: "",
      productId: "",
      productArr: [],
      classId: "",
      classArr: [],

      // 导入弹窗
      importVisible: false,
      importFormOptions: [
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
          operate: true,
        },
        {
          prop: "file",
          element: "el-input",
          label: "文件",
          operate: true,
        },
        {
          prop: "tips",
          element: "el-input",
          label: "特别提醒",
          operate: true,
        },
      ],
      importRules: {},

      // ai呼叫弹窗
      callVisible: false,

      // 勾选的数据
      selectedData:[],

      // 校区
      campusArr:[],

      // 员工
      staffArr:[],

      orderFlag: false
    };
  },
  components: {
    rdDrawer,
    RdForm,
  },
  props: {
    newFormOptions: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.getCutdown();
    setInterval(() => {
      this.getCutdown();
    }, 1000);
    this.getTableData();
  },
  watch: {
    newFormOptions(newVal) {
      this.formOptions = newVal;
      console.log(newVal, "newVal--");
      this.handelAddOptions(newVal);
    },
  },
  methods: {
    productChange(val) {
      this.$fetch("chance_subject_list", {
        enquireProductIdOne: val,
      }).then((res) => {
        let nodes;
        if (res.msg == "没有相关数据") {
          nodes = [];
        } else {
          let data = res.data;
          nodes = data.map((item) => ({
            value: item.id,
            label: item.subjectName,
          }));
        }
        this.subjectArr = nodes;
        this.subjectId = "";
      });
    },
    subjectChange(val) {
      this.$fetch("chance_class_list", {
        subjectIdOne: val,
      }).then((res) => {
        let nodes;
        if (res.msg == "没有相关数据") {
          nodes = [];
        } else {
          let data = JSON.parse(res.msg);
          nodes = data.map((item) => ({
            value: item.id,
            label: item.className,
          }));
        }
        this.classArr = nodes;
        this.classId = [];
      });
    },
    handelAddOptions(newVal) {
      this.addFormOptions[3].options = newVal[3].options;
      this.addFormOptions[4].options = newVal[5].options;
      this.$fetch("chance_config_campusList").then((res) => {
        let campusOptions = res.data.data.map((item) => ({
          label: item.campusName,
          value: item.id,
          nature: item.campusNature
        }));
        this.addFormOptions[0].options = campusOptions;
        this.addFormOptions[0].filterable = true;
        this.campusArr = campusOptions;
      });
      
      this.$fetch("chance_product_list").then((res) => {
        let data = JSON.parse(res.msg);
        let productOptions = data.map((item) => ({
          value: item.id,
          label: item.productName,
        }));
        this.productArr = productOptions;
      });
    },
    openDrawer(data) {
      console.log(data, "operndrawer");
      this.drawerId = data.id;
      this.drawerPhone = data.phone;
      this.drawerTitle = data.studentName || "";
      this.drawerVisible = true;
    },
    onSearch(val) {
      if(val.product&&val.product.length>0){
        this.searchForm = {
          ...val,
          enquireProductIdOne: val.product[0],
          enquireSubjectIdOne: val.product[1],
          enquireCourseIdOne: val.product[2],
        };
      }else {
        this.searchForm = {
          ...val
        }
      }
      
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
    pageChange(val) {
      console.log(val, "pagechange");
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
      
      if(!this.selectedData.length){
        this.$message.warning("请勾选要成单的机会！")
        return;
      }else if(this.selectedData.length>1){
        this.$message.warning("只能选择一个！")
        return;
      }

      
      if(this.orderFlag){
        this.orderVisible = true;
      }else{
      // 赋值
      const { idStr,campusName,campusId,studentName,phone,saleSource,marketStaffId ,marketName} = this.selectedData[0];
      this.$fetch("chance_staff_list").then(res => {
        let staffOptions = JSON.parse(res.msg).map((item) => ({
            label: item.staffName,
            value: item.id,
          }));
          this.staffArr = staffOptions;
          this.orderFormOptions[0].options = this.campusArr;
          this.orderFormOptions[0].initValue = campusId;
          this.orderFormOptions[1].initValue = studentName;
          this.orderFormOptions[2].initValue = phone;
          this.orderFormOptions[3].initValue = saleSource;
          this.orderFormOptions[4].options = staffOptions;
          this.orderFormOptions[4].initValue = marketStaffId;
          this.orderVisible = true;
      })
      }

      this.orderFlag = true;
      
    },
    // 成单弹窗关闭
    handleClose(formName) {
      this.orderVisible = false;
      this.invalidVisible = false;
      this.addVisible = false;
      this.importVisible = false;
      this.callVisible = false;
      this.productId = "";
      this.subjectId = "";
      this.classId = "";
    },
    // 成单弹窗提交
    submitForm(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "提交--");
          let currentCampus = this.campusArr.find(item => (item.value == formData.campusId));
          let currentMarket = this.staffArr.find(item => (item.value == formData.marketStaffId));
          this.$fetch("chance_my_transform",{
            ...formData,
            opportunityId: this.selectedData[0].id,
            Normal:'Normal',
            campusName: currentCampus.label,
            campusNature: currentCampus.nature,
            marketName: currentMarket.label,
            marketPosition:""
          }).then(res => {
            if(res.code == 200){
              this.$message.success('保存成功')
              this.handleClose();
              this.getTableData();
            }
          })
        }
      });
    },

    // 锁定
    handleLock(){
      if(!this.selectedData.length){
        this.$message.warning("请勾选要锁定的机会！")
        return;
      }
      this.$confirm(
        `<strong> 确定要将所选的机会锁定吗？</strong><span style="color: #FF0000;">锁定之后机会将自动转移到【锁定客户】，</span>你确定继续吗？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          dangerouslyUseHTMLString: true,
        }
      )
        .then(async () => {
          this.$fetch("chance_my_lock",{
            opportunityId: this.selectedData.map(item => (item.idStr)).join(","),
            stayModule: "Public"
          }).then(res => {
              this.$message.success('操作成功')
              this.handleClose();
              this.getTableData();
          })
        })
        .catch(() => {});
    },

    // 释放
    handleRelease() {
      if(!this.selectedData.length){
        this.$message.warning("请勾选要释放的机会！")
        return;
      }
      this.$confirm(
        `<strong>确定要将所选的机会释放到机会公海吗?</strong> <span style="color:red">释放之后有一次机会可以再领取回来，</span><span>你还要继续吗？</span>`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          dangerouslyUseHTMLString: true,
        }
      )
        .then(async () => {
          this.$fetch("chance_my_release",{
            id: this.selectedData.map(item => (item.idStr)).join(","),
            stayModule: "Public"
          }).then(res => {
            if(res.code == 200){
              this.$message.success('释放成功')
              this.handleClose();
              this.getTableData();
            }
          })
        })
        .catch(() => {});
    },
    // 失效
    handleInvalid() {
       if(!this.selectedData.length){
        this.$message.warning("请勾选要失效的机会！")
        return;
      }else if(this.selectedData.length>1){
        this.$message.warning("只能选择一个！")
        return;
      }
      this.invalidVisible = true;
    },
    // 失效弹窗提交
    submitInvalidForm(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "提交");
          this.$fetch("chance_my_invalid",formData).then(res=>{
            if(res.code == 200){
              this.$message.success('操作成功')
              this.handleClose();
              this.getTableData();
            }
          })
        }
      });
    },
    // 添加
    handleAdd() {
      this.addVisible = true;
    },
    submitAddForm(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "提交");
          this.$fetch("chance_my_add", {
            ...formData,
            productId: this.productId,
            enquireProductIdOne: this.productId,
            enquireSubjectIdOne: this.subjectId,
            undefined: this.classId.join(","),
          }).then((res) => {
              this.$message.success("添加成功");
              this.handleClose();
              this.getTableData();
          });
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
    submitImportForm(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "提交");
        }
      });
    },

    getTableData(params = {}) {
      this.$fetch("chance_my_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        stayModule: "Public",
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.allotTime = this.$common._formatDates(item.allotTime);
          item.recentFeedbackTime = this.$common._formatDates(
            item.recentFeedbackTime
          );
          item.nextDate = this.$common._formatDates(item.nextDate);
          return item;
        });
        this.pageConfig.totalCount = res.data.count;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Public-customers {
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
      .call-title,
      .call-content {
        width: 100%;
        display: flex;
        line-height: 35px;
        span {
          flex: 1;
          border: 1px solid #f0f0f0;
          &:first-child {
            border-right: none;
          }
        }
      }
      .call-title {
        span {
          border-bottom: none;
          background: #fafafa;
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
    // .el-form-item:last-child{
    //   color: red;
    // }
    .el-cascader {
      width: 100%;
    }
  }
}
</style>

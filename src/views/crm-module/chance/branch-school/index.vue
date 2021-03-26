<template>
  <div class="branch-school">
    <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleReceive"
          >领取</el-button
        >
        <el-button type="warning" size="small" @click="handleDistribute"
          >分配</el-button
        >
        <el-button type="info" size="small" @click="handleAdd"
          >AI呼叫</el-button
        >
        <el-button type="success" size="small" @click="handleImport"
          >导入</el-button
        >
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
      >
        <!-- 跟进次数 -->
        <template slot="phone" slot-scope="scope">
          {{ $common.hidePhone(scope.row.phone) }}
        </template>
        <template slot="visit" slot-scope="scope">
          <span class="visit-container" @click.stop="openDrawer(scope.row)">{{
            scope.row.feedbackCount || 0
          }}</span>
        </template>
      </rd-table>
    </div>
    <!-- 回访抽屉 -->
    <!-- <template v-if="drawerVisible"> -->
      <rd-drawer
        :dialogVisible="drawerVisible"
        :id="drawerId"
        :phone="drawerPhone"
        :title="drawerTitle"
        @handleClose="drawerVisible = false"
      ></rd-drawer>
    <!-- </template> -->

    <!-- 分配弹窗 -->
    <rd-dialog
      :title="'分配机会'"
      :dialogVisible="distributeVisible"
      :showFooter="false"
      :width="'990px'"
      @handleClose="distributeVisible = false"
    >
      <distribution :opportunityIds="opportunityIds" @refresh="getTableData" @close="distributeVisible = false" v-if="distributeVisible"/>
    </rd-dialog>

    <!-- 导入机会 -->
    <rd-dialog
      :title="'导入机会'"
      :dialogVisible="importVisible"
      @handleClose="handleClose('dataForm4')"
      @submitForm="submitImportForm('dataForm4')"
    >
      <el-form :model="rules" :rules="rulesForm" ref="dataForm4" label-width="100px">
        <el-form-item label="导入模板">
          <el-button type="primary" size="small" @click="downLoad">点击下载模板</el-button>
        </el-form-item>

         <el-form-item label="文件" prop="file">
          <uploadFile :file.sync="rules.file"/>
        </el-form-item>

        <el-form-item label="分校/战队" prop="importCampusId">
          <el-select v-model="rules.importCampusId" placeholder="请选择" filterable>
            <el-option
              v-for="item in campusArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目" prop="enquireProductIdOne">
          <el-select v-model="rules.enquireProductIdOne" placeholder="请选择" filterable @change="productChange">
            <el-option
              v-for="item in productArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

         <el-form-item label="科目" prop="enquireSubjectIdOne">
          <el-select v-model="rules.enquireSubjectIdOne" placeholder="请选择" filterable @change="subjectChange">
            <el-option
              v-for="item in importSubjectArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

         <el-form-item label="课程" prop="enquireCourseIdOne">
          <el-select v-model="rules.enquireCourseIdOne" placeholder="请选择" filterable>
            <el-option
              v-for="item in importCourseArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="批次记录" prop="batchCode">
          <el-input type="textarea" v-model="rules.batchCode"></el-input>
        </el-form-item>

        <el-form-item label="特别提醒">
          <span style="color: red"
            >导入模版中【学员姓名】【电话】【地址】不能为空.否则会导入失败！！！</span
          >
        </el-form-item>
        
      </el-form>
    </rd-dialog>
  </div>
</template>

<script>
let id = 0;
import Fetch from "@/utils/fetch";
import rdDrawer from "@/components/RdDrawer";
import distribution from "./distribution";
import chanceSelect from '@/utils/chance-select';
import uploadFile from "@/components/Activity/uploadFile";
export default {
  name: "branch-school",
  data() {
    return {
      drawerTitle: "",
      drawerId: "",
      drawerPhone: "",
      formOptions: [
        {
          prop: "marketStaffId",
          element: "el-cascader",
          placeholder: "跟进老师",
          props: {
            lazy: true,
            lazyLoad(node, resolve) {
              const { level } = node;
              if (level == 0) {
                const nodes = [
                  {
                    label: "正常",
                    value: "Normal",
                    leaf: level >= 1,
                  },
                  {
                    label: "离职",
                    value: "Stop",
                    leaf: level >= 1,
                  },
                ];
                resolve(nodes);
              } else {
                Fetch("chance_staff_list", {
                  staffStatus: node.value,
                }).then((res) => {
                  let staffOptions = JSON.parse(res.msg).map((item) => ({
                    label: item.staffName,
                    value: item.id,
                    leaf: level >= 1,
                  }));
                  resolve(staffOptions);
                });
              }
            },
          },
          initWidth: true,
          showAllLevels: false,
          filterable: true,
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "机会状态",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "姓名",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "手机",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "省份",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "城市",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "地址",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "注册人",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "学历",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "来源",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "组织架构",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "呼叫状态",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "跟进次数",
        },
        // 课程
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
          initWidth: true,
        },
        // 时间
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "最近跟进时间(开始)",
          endPlaceholder: "最近跟进时间(结束)",
          initWidth: true,
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "创建时间(开始)",
          endPlaceholder: "创建时间(结束)",
          initWidth: true,
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "进入公海时间(开始)",
          endPlaceholder: "进入公海时间(结束)",
          initWidth: true,
        },
      ],
      tableData: [
      ],
      tableKey: [
        {
          name: "机会ID",
          value: "idStr",
        },
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
          name: "学历",
          value: "eduBackground",
        },
        {
          name: "咨询项目",
          value: "enquireProductNameOne",
        },
        {
          name: "咨询科目",
          value: "enquireSubjectNameOne",
        },
        {
          name: "咨询班型",
          value: "enquireClassOne",
        },
        {
          name: "跟进次数",
          value: "visit",
          operate: true,
          width: 60,
        },
        {
          name: "跟进状态",
          value: "status",
        },
        {
          name: "跟进老师",
          value: "marketName",
        },
        {
          name: "跟进时间",
          value: "recentFeedbackTime",
        },
        {
          name: "创建时间",
          value: "createAt",
        },
        {
          name: "进入公海时间",
          value: "campusPoolTime",
        },
        {
          name: "机会来源",
          value: "saleSource",
        },
        {
          name: "分校/战队",
          value: "campusName",
        },
        {
          name: "省份",
          value: "phoneProvince",
        },
        {
          name: "城市",
          value: "phoneCity",
        },
        {
          name: "地址",
          value: "address",
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
      selectedData: [],
      drawerVisible: false,
      // 分配机会
      distributeVisible: false,
      distributeFormOptions: [
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
          label: "姓名",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入手机号",
          label: "手机号",
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
          type: "textarea",
          rows: 2,
        },
      ],
      distributeRules: {
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ],
      },
      searchForm: {},
      opportunityIds:"",
      importVisible: false,
      ruleForm:{
        name:""
      },
      rules: {
        importCampusId:"",
        enquireProductIdOne:"",
        enquireSubjectIdOne:"",
        enquireCourseIdOne:"",
        batchCode:"",
        file:""
      },
      rulesForm: {
        file: [{ required: true, message: "请上传", trigger: "blur" }],
        importCampusId: [{ required: true, message: "请选择", trigger: "blur" }],
        enquireProductIdOne: [{ required: true, message: "请选择", trigger: "blur" }],
        enquireSubjectIdOne: [{ required: true, message: "请选择", trigger: "blur" }],
        enquireCourseIdOne: [{ required: true, message: "请选择", trigger: "blur" }],
        batchCode: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      campusArr: [],
      productArr: [],
      importSubjectArr:[],
      importCourseArr: []
    };
  },
  mounted() {
    this.getTableData();
    this.getSelectList();
  },
  components: {
    rdDrawer,
    distribution,
    uploadFile
  },
  methods: {
    handleReceive() {
      if (!this.selectedData.length) {
        this.$message.warning("请勾选要领取的机会！");
        return;
      }
      this.$fetch("chance_campus_receive", {
        ids: this.selectedData.map((item) => item.idStr).join(","),
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success("操作成功");
          this.getTableData();
        }
      });
    },
    openDrawer(data) {
      this.drawerId = data.idStr;
      this.drawerPhone = data.phone;
      this.drawerTitle = data.studentName || "";
      this.drawerVisible = true;
    },
    handleAdd() {},
    onSearch(val) {
      if (val.product && val.product.length > 0) {
        this.searchForm = {
          ...val,
          enquireProductIdOne: val.product[0],
          enquireSubjectIdOne: val.product[1],
          enquireCourseIdOne: val.product[2],
          createAt: val.createAt ? val.createAt.join("~") : "",
          updateAt: val.updateAt ? val.updateAt.join("~") : "",
          campusPoolTime: val.campusPoolTime
            ? val.campusPoolTime.join("~")
            : "",
          marketStaffId: val.marketStaffId && val.marketStaffId[1],
        };
      } else {
        this.searchForm = {
          ...val,
          createAt: val.createAt ? val.createAt.join("~") : "",
          updateAt: val.updateAt ? val.updateAt.join("~") : "",
          campusPoolTime: val.campusPoolTime
            ? val.campusPoolTime.join("~")
            : "",
          marketStaffId: val.marketStaffId && val.marketStaffId[1],
        };
      }

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
    submitDistributeForm(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "提交");
        }
      });
    },
    handleDistribute() {
      if (!this.selectedData.length) {
        this.$message.warning("请勾选要分配的机会！");
        return;
      }
      this.opportunityIds = this.selectedData.map(item=>(item.idStr)).join(",")
      this.distributeVisible = true;
    },
    // 导入
    handleImport(){
      this.importVisible = true;
    },
    submitImportForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { file, batchCode, importCampusId, enquireProductIdOne, enquireSubjectIdOne, enquireCourseIdOne } = this.rules;
          let obj = new FormData();
          obj.append("file", file);
          obj.append("campusNature", "OffLine");
          obj.append("batchCode", batchCode);
          obj.append("campusId", importCampusId);
          obj.append("campusName", this.campusArr.find(item => (item.value == importCampusId)).label);
          obj.append("enquireProductIdOne", enquireProductIdOne);
          obj.append("enquireProductNameOne", this.productArr.find(item => (item.value == enquireProductIdOne)).label);
          obj.append("enquireSubjectIdOne", enquireSubjectIdOne);
          obj.append("enquireSubjectNameOne", this.importSubjectArr.find(item => (item.value == enquireSubjectIdOne)).label);
          obj.append("enquireCourseIdOne", enquireCourseIdOne);
          obj.append("enquireCourseNameOne", this.importCourseArr.find(item => (item.value == enquireCourseIdOne)).label);
          this.$fetch("chance_campus_saveBranchImport", obj).then((res) => {
            if(res.code == 200){
              this.$message.success("操作成功")
              this.handleClose('dataForm4');
              this.getTableData();
            }
          });
        }
      });
    },
    handleClose(formName) {
      this.importVisible = false;
      this.$refs[formName]&&this.$refs[formName].resetFields();
      // this.rules = {
      //   importCampusId:"",
      //   enquireProductIdOne:"",
      //   enquireSubjectIdOne:"",
      //   enquireCourseIdOne:""
      // }
    },
    getTableData(params = {}) {
      this.$fetch("chance_campus_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        // token: "123",
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.campusPoolTime = this.$common._formatDates(item.campusPoolTime);
          item.recentFeedbackTime = this.$common._formatDates(item.recentFeedbackTime);
          // item.phone = this.$common.hidePhone(item.phone);
          item.enquireClassOne =
            item.enquireClassOne &&
            item.enquireClassOne.map((item) => item.name).join(",");
          return item;
        });
        this.pageConfig.totalCount = res.data.count;
      });
    },
    productChange(val){
      this.$fetch("chance_subject_list",{
        enquireProductIdOne: val
      }).then(res => {
        if(res.msg == "数据为空"){
          this.importSubjectArr = [];
        }else {
          let data = res.data.list;
          this.importSubjectArr = data.map(item =>({
            value: item.id,
            label: item.subjectName,
          }));
        }
        this.rules.enquireSubjectIdOne = "";
        this.rules.enquireCourseIdOne = "";
      })
    },
    subjectChange(val){
      this.$fetch("chance_course_list",{
        subjectIdOne: val
      }).then(res => {
        if(res.msg == "数据为空"){
          this.importCourseArr = [];
        }else {
          let data =JSON.parse(res.msg);
          this.importCourseArr = data.map(item =>({
            value: item.id,
            label: item.courseName,
          }));
        }
        this.rules.enquireCourseIdOne = "";
        
      })
    },
    downLoad(){
      window.location.href = "/temp/opportunity_import.xlsx"
    },
    getSelectList() {
      Promise.all(
        [
          this.$fetch("chance_source_list"),
          this.$fetch("chance_edu_list"),
          this.$fetch("chance_status_list"),
          this.$fetch("chance_config_campusList"),
          this.$fetch("chance_call_status"),
          this.$fetch("chance_product_list"),
        ].map((p) => {
          return p.catch((error) => error);
        })
      ).then((result) => {
        let sourceOptions = result[0].data.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        let eduOptions = result[1].data.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        let statusOptions = result[2].data.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        let campusOptions = result[3].data.data.map((item) => ({
          label: item.campusName,
          value: item.id,
        }));
        this.campusArr = result[3].data.data.map((item) => ({
          label: `${item.campusName}(${item.parentCampusName || ''})`,
          value: item.id,
        }));
        let callStatusOptions = result[4].data.map((item) => ({
          label: item.value,
          value: item.key,
        }));
         let productOptions = result[5].msg && JSON.parse(result[5].msg).map((item) => ({
          label: item.productName,
          value: item.id,
        }));
        this.productArr = productOptions;
        let numsOptions = [];
        for (let i = 0; i < 8; i++) {
          numsOptions.push({
            label: i,
            value: i,
          });
        }
        this.formOptions = [
          {
            prop: "marketStaffId",
            element: "el-cascader",
            placeholder: "跟进老师",
            props: {
              lazy: true,
              lazyLoad(node, resolve) {
                const { level } = node;
                if (level == 0) {
                  const nodes = [
                    {
                      label: "正常",
                      value: "Normal",
                      leaf: level >= 1,
                    },
                    {
                      label: "离职",
                      value: "Stop",
                      leaf: level >= 1,
                    },
                  ];
                  resolve(nodes);
                } else if (level == 1) {
                  Fetch("chance_getStaffListByStatus", {
                    staffStatus: node.value,
                  })
                    .then((res) => {
                      let staffOptions = res.data.map((item) => ({
                        label: item.staffName,
                        value: item.id,
                        leaf: level >= 1,
                      }));
                      resolve(staffOptions);
                    })
                    .catch((err) => {
                      console.log(err, "err--");
                      resolve([]);
                    });
                } else {
                  resolve([]);
                }
              },
            },
            initWidth: true,
            showAllLevels: false,
            filterable: true,
          },
          {
            prop: "status",
            element: "el-select",
            placeholder: "机会状态",
            options: statusOptions,
          },
          {
            prop: "studentName",
            element: "el-input",
            placeholder: "姓名",
          },
          {
            prop: "phone",
            element: "el-input",
            placeholder: "手机",
          },
          {
            prop: "phoneProvince",
            element: "el-input",
            placeholder: "省份",
          },
          {
            prop: "phoneCity",
            element: "el-input",
            placeholder: "城市",
          },
          {
            prop: "address",
            element: "el-input",
            placeholder: "地址",
          },
          {
            prop: "createStaffName",
            element: "el-input",
            placeholder: "注册人",
          },
          {
            prop: "eduBackground",
            element: "el-select",
            placeholder: "学历",
            options: eduOptions,
          },
          {
            prop: "saleSource",
            element: "el-select",
            placeholder: "来源",
            options: sourceOptions,
          },
          {
            prop: "campusId",
            element: "el-select",
            placeholder: "组织架构",
            options: campusOptions,
            filterable: true,
          },
          {
            prop: "callStatus",
            element: "el-select",
            placeholder: "呼叫状态",
            options: callStatusOptions,
          },
          {
            prop: "feedbackCount",
            element: "el-select",
            placeholder: "跟进次数",
            options: numsOptions,
          },
          // 课程
          chanceSelect.getProjectCascader({
            prop: "product",
            placeholder: "咨询项目/科目/课程"
          }),
          // 时间
          {
            prop: "updateAt",
            element: "el-date-picker",
            startPlaceholder: "最近跟进时间(开始)",
            endPlaceholder: "最近跟进时间(结束)",
            initWidth: true,
          },
          {
            prop: "createAt",
            element: "el-date-picker",
            startPlaceholder: "创建时间(开始)",
            endPlaceholder: "创建时间(结束)",
            initWidth: true,
          },
          {
            prop: "campusPoolTime",
            element: "el-date-picker",
            startPlaceholder: "进入公海时间(开始)",
            endPlaceholder: "进入公海时间(结束)",
            initWidth: true,
          },
        ];
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.branch-school {
}
</style>
